<template>
  <div class="layout_container">
    <div>
      <!-- 项目标题加title -->
      <logo></logo>
      <!-- 菜单左侧 -->
      <div
        class="layout_slider"
        :class="{ fold: LayoutSettingStore.fold ? true : false }"
      >
        <el-scrollbar class="scrollbar">
          <!-- 菜单组件 -->
          <el-menu
            class="menu_content"
            :default-active="$route.path"
            unique-opened="true"
            :collapse="LayoutSettingStore.fold ? true : false"
          >
            <Menu :MenuList="UserStore.MenuRoutesList"></Menu>
          </el-menu>
        </el-scrollbar>
      </div>
      <!-- 顶部导航 -->
      <div
        class="layout_tabber"
        :class="{ foldmax: LayoutSettingStore.fold ? true : false }"
      >
        <tabber :MenuList="UserStore.MenuRoutesList"></tabber>
      </div>
      <!-- 内容展示区 -->
      <div
        class="right_content"
        :class="{ foldmax: LayoutSettingStore.fold ? true : false }"
      >
        <div class="Main">
          <Main></Main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="layout">
import { useRoute } from 'vue-router'
//引入user小仓库
import { ref } from 'vue'
import useUserStore from '../../store/modules/user'
//引入layout小仓库
import useLayoutSettingStore from '../../store/modules/layout'
//获取user小仓库
let UserStore = useUserStore()
// 获取layout小仓库
let LayoutSettingStore = useLayoutSettingStore()
//获取路由当前路径
let $route = useRoute()
let ollapse = ref('true')
</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  background-color: $base-background-color;
}

.layout_slider {
  width: calc($base-menu-width);
  &.fold {
    width: $base-menu-width-min;
    transition: all 0.5s;
  }

  .scrollbar {
    width: 100%;
    height: calc(100vh - $base-menu-logo-height);

    .menu_content {
      border-right: 0px;
      width: 100%;
      background-color: $base-background-color;
    }
  }
}

.layout_tabber {
  top: 0;
  left: $base-menu-width;
  z-index: 1;
  position: fixed;
  background-color: $base-background-color;
  height: $base-tabbar-height;
  width: calc(100% - $base-menu-width);
  color: $base-size-color;
  transition: all 0.5s;
  &.foldmax {
    width: calc(100% - $base-menu-width-min);
    left: calc($base-menu-width-min);
    transition: all 0.5s;
  }
}

.right_content {
  position: absolute;
  left: $base-menu-width;
  top: $base-tabbar-height;
  width: calc(100% - $base-menu-width);
  height: calc(100vh - $base-tabbar-height);
  background-color: $base-background-color;
  overflow: auto;
  transition: all 0.5s;
  &.foldmax {
    width: calc(100% - $base-menu-width-min);
    left: calc($base-menu-width-min);
    transition: all 0.5s;
  }
}
</style>
