<template>
  <div class="tabber_rigth">
    <span>
      <el-row>
        <el-button type="danger" icon="Refresh" circle @click="updateRefsh" />
        <el-button type="danger" icon="FullScreen" circle @click="fullScreen" />
        <el-button type="danger" icon="Setting" circle />
      </el-row>
    </span>
    <el-avatar size="size" :src="userStore.avatar" />
    <!-- tabber右侧下拉菜单 -->
    <el-dropdown :hide-on-click="false">
      <span class="el-dropdown-link">
        {{ userStore.nickName }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登陆</el-dropdown-item>
          <el-dropdown-item>编辑资料</el-dropdown-item>
          <el-dropdown-item>Action</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts" name="setting">
import { reactive, toRefs } from 'vue'
import useLayoutSettingStore from '../../../../store/modules/layout'
import useUserStore from '../../../../store/modules/user'
import { GET_TOKEN } from '../../../../utils/token'
import { useRouter, useRoute } from 'vue-router'
// 获取路由对象
let $route = useRoute()
// 获取路由对象
let $router = useRouter()
// 导入pinia user仓库
let userStore = useUserStore()
// 从仓库中导入 refsh变两
let useLayoutSettingRefsh = useLayoutSettingStore()
// 点击刷新按钮变量
const updateRefsh = () => {
  console.log(useLayoutSettingRefsh.refsh)
  useLayoutSettingRefsh.refsh = !useLayoutSettingRefsh.refsh
}
// 全屏按钮
const fullScreen = () => {
  // 调用document.documentElement.requestFullscreen()方法设置全屏
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    //调用document.exitFullscreen()关闭全屏
    document.exitFullscreen()
  }
}
// 退出登陆
const logout = async () => {
  // 向服务器发送退出登陆请求
  await userStore.loginout()
  // 跳转登陆页
  $router.push({ path: '/Login', query: { redirect: $route.path } })
}
</script>

<style scoped lang="scss">
.tabber_rigth span {
  color: $base-size-color;
  margin-left: 10px;
}

.el-dropdown-link {
  cursor: pointer;
}

.el-dropdown-link:hover {
  color: red;
  /* 鼠标悬停时的颜色 */
}
</style>
