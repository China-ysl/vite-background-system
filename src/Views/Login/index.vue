<template>
  <div class="login_container">
    <div class="login_container-img">
      <div class="card">
        <div class="login_card">
          <h1 class="login_card_dl">登录</h1>
          <p class="login_card_zc">
            新用户|
            <el-link type="primary" style="color: red; margin-top: -5px">
              注册
            </el-link>
          </p>
        </div>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          class="demo-ruleForm"
          status-icon
        >
          <!-- 用户名 -->
          <el-form-item prop="userName">
            <el-input
              v-model="ruleForm.userName"
              :prefix-icon="LogoGithub"
              placeholder="用户名"
              class="input_s"
            />
          </el-form-item>
          <!-- 用户密码 -->
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              :prefix-icon="ShieldLock"
              placeholder="password"
              class="input_s"
              type="password"
              show-password
            />
          </el-form-item>
          <!-- 提交||重置 -->
          <div class="button_login">
            <el-button
              type="primary"
              @click="submitForm(ruleFormRef)"
              size="default"
              class="button_login2"
              :loading="loading"
            >
              登录
            </el-button>
            <el-button @click="resetForm(ruleFormRef)" class="button_login2">
              重置
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

import { LogoGithub } from '@vicons/ionicons4'
import { ShieldLock } from '@vicons/tabler'
// 引用用户相关的pinia仓库
import useUserStore from '../../store/modules/user'
//引入router
import { useRouter, useRoute } from 'vue-router'
import { FormInstance } from 'element-plus/lib/components/index.js'
import { FormRules } from 'element-plus/lib/components/index.js'
import { ElNotification } from 'element-plus'
import { getTime, getTime_msg } from '../../utils/time'
// 路由
let $router = useRouter()
let $route = useRoute()
// pinia user仓库
let useStore = useUserStore()
// 表单数据
interface RuleForm {
  userName: string
  password: string
}
// 按钮加载属性，登录按钮(true-加载)效果
let loading = ref(false)
// 获取le-form组件,表单v-c实例
const ruleFormRef = ref()
// 登录表单对象
const ruleForm = reactive<RuleForm>({
  userName: 'admin',
  password: '1234',
})
// 表单校验username方法
// rule: any, value: any, callback: any
// rule:表单校验规则
// value：表单元素内文本内容
// callback：规则放行函数，符合条件callback放行通过，不符合条件callback方法，注入错误信息。
const UserError = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('用户名不能为空'))
  } else if (value.length < 5) {
    return callback(new Error('长度至少 5 位数'))
  } else {
    // 校验通过放行
    callback()
  }
}
// 表单校验username方法
const passwordError = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('密码不能为空'))
  } else if (value.length < 4) {
    return callback(new Error('长度至少 4 位数'))
  } else {
    callback()
  }
}
// 校验规则
// 规则对象属性：
// required 是否为必填项，如不设置，则会根据校验规则确认 boolean
// message 错提示消息
// man min 长度校验规则
// trigger 触发校验规则 change=>文本发生变化触发  blur=> 失去焦点触发
const rules = reactive<FormRules>({
  userName: [{ trigger: 'change', validator: UserError }],
  password: [{ trigger: 'change', validator: passwordError }],
})
// 提交表单方法
const submitForm = async (formEl: FormInstance | undefined) => {
  // console.log(ruleFormRef.value);
  // 保证校验通过在发送登录请求
  // 登录按钮加载效果
  loading.value = true
  if (!formEl) {
    return
  }
  await formEl.validate(async (_valid: any, fields: any) => {
    try {
      // 校验表单是否通过
      if (_valid == false) {
        loading.value = false
        return
      }
      //useStore.userLogin方法发送登录请求
      await useStore.userLogin(ruleForm)
      //  登录成功跳转首页
      let redirect: any = $route.query.redirect
      $router.push({ path: redirect || '/' })
      ElNotification.success({
        message: `欢迎回来,当前时间：${getTime()}`,
        title: `HI!  ${ruleForm.userName},${getTime_msg()}好`,
        type: 'Success',
        position: 'top-right',
      })
    } catch (error) {
      // 登录失败加载效果
      loading.value = false
      if ((error as Error).message == '用户不存在') {
        ElNotification.error({
          message: '用户名或密码错误',
          type: 'error',
          position: 'top-right',
        })
      } else {
        ElNotification.error({
          message: (error as Error).message,
          type: 'error',
          position: 'top-right',
        })
      }
    }
  })
}
// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))
</script>

<!--                        样式                    -->

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

.login_card {
  position: relative;
  display: flex;
  margin: auto;
  width: 250px;
  justify-content: space-between;
}

.login_card_dl {
  background-color: rgba(214, 52, 52, 0);
}

.login_card_zc {
  margin-top: 20px;
}

.login_container {
  margin: 0;
  background-image: url(../../assets/img/22e21662b3d7e092cc1761edcb1f9c672670fd7c.png@942w_849h_progressive.webp),
    url();
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  background-color: rgb(96, 188, 231);
}

.login_container-img {
  width: 100%;
  height: 100vh;
  background-position: right;
  background-repeat: no-repeat;
  background-image: url(../../assets/img/30e41f7f7b0c946d8b092e97f28f0e91c811548b.png@942w_825h_progressive.webp);
}

.card {
  position: absolute;
  left: calc(50% - 150px);
  top: calc(30vh);
  width: 300px;
}

.demo-ruleForm {
  margin: auto;
  height: 150px;
  width: 250px;
  display: grid;
}

.input_s {
  width: 100%;
  height: 40px;
}

.button_login {
  display: flex;
  margin: auto;
}

.button_login2 {
  width: 12.9vh;
}
</style>
