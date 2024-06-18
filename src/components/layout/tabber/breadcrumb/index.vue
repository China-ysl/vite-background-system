<template>
  <div class="tabber_left">
    <span>
      <el-icon class="changeicon" @click="changeicon">
        <component
          :is="LayoutSettingStore.fold ? 'Fold' : 'Expand'"
        ></component>
      </el-icon>
    </span>
    <el-breadcrumb :separator-icon="ArrowRight" class="breadcrumb_a">
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        :to="item.path"
        v-show="item.meta.title"
        class="breadcrumb_b"
      >
        <el-icon class="icon-color">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <samp class="title_color">
          {{ item.meta.title }}
        </samp>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts" name="breadcrumb">
import { ArrowRight } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useLayoutSettingStore from '../../../../store/modules/layout'
import { useRoute } from 'vue-router'
// 获取路由
let $route = useRoute()

const logtitle = () => {
  console.log($route.matched[0].meta.title)
  console.log($route.matched)
}
// 折叠菜单图标
const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  squareUrl:
    'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  sizeList: ['small', '', 'large'] as const,
})
// 获取仓库菜单是否折叠变量相关配置
let LayoutSettingStore = useLayoutSettingStore()
// 折叠菜单方法
const changeicon = () => {
  LayoutSettingStore.fold = !LayoutSettingStore.fold
}
</script>

<style scoped lang="scss">
.tabber_left {
  display: flex;
  align-items: center;
  font-size: 25px;
}

.changeicon {
  margin-left: 10px;
  cursor: pointer;
}
.title_color {
  color: $base-size-color;
}
.icon-color {
  top: 2px;
  text-align: center;
  margin-right: 5px;
  color: $base-size-color;
}

.breadcrumb_a {
  display: flex;
  white-space: nowrap;
  margin-left: 20px;
  margin: 0, auto;
}

.breadcrumb_b {
  display: flex;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  margin: 0, auto;
}

.changeicon:hover {
  color: red;
  /* 鼠标悬停时的颜色 */
}
</style>
