<!--
  功能：功能描述 分类组件
  作者：ysl
  邮箱：2750827735@.com
  时间：2024年05月26日 23:32:20
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：2024年05月26日 23:32:20
-->

<template>
  <el-card class="el-card_form" shadow="always">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select
          :disabled="scene == 0 ? false : true"
          v-model="attrStore.Attr1Id"
          placeholder="请选择"
          clearable
          @change="change"
        >
          <el-option
            v-for="(Attr1, index) in attrStore.Attr1"
            :key="Attr1.id"
            :label="Attr1.name"
            :value="Attr1.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          :disabled="scene == 0 ? false : true"
          v-model="attrStore.Attr2Id"
          placeholder="请选择"
          clearable
          @change="change2"
        >
          <el-option
            v-for="(Attr2, index) in attrStore.Attr2"
            :key="Attr2.id"
            :label="Attr2.name"
            :value="Attr2.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          :disabled="scene == 0 ? false : true"
          v-model="attrStore.Attr3Id"
          placeholder="请选择"
          clearable
          @change="change3"
        >
          <el-option
            v-for="(Attr3, index) in attrStore.Attr3"
            :key="Attr3.id"
            :label="Attr3.name"
            :value="Attr3.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, defineProps } from 'vue'
import { getAttrList } from '../../../api/product/Attr/index'
// 引入attr piain仓库
import useAttrStore from '../../../store/modules/attr'
let attrStore = useAttrStore()
// 接受父组件传值
defineProps(['scene'])

// 生命周期函数onMounted 组件挂载前
onMounted(() => {
  attrStore.getAttr1()
})
const change = () => {
  console.log('change选中时触发')
  attrStore.AttrValueList = []
  attrStore.Attr2Id = ''
  attrStore.Attr3 = []
  attrStore.Attr3Id = ''
  attrStore.getAttr2()
}
const change2 = () => {
  console.log('change2选中时触发')
  attrStore.AttrValueList = []
  attrStore.Attr3Id = ''
  attrStore.getAttr3()
}

const change3 = () => {
  console.log('change3选中时触发')
  attrStore.getVauleList()
}
</script>

<style class="scss" scoped>
.el-card_form {
  margin: 10px 0px;
  width: 100%;
  height: 100px;
  display: flex;
  align-content: space-between;
  justify-content: space-around;
  align-items: center;
}
</style>
