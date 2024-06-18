<template>
  <template v-for="(item, index) in MenuList" :key="item.path">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item
        class="use-menu size-color"
        :index="item.path"
        v-if="!item.meta.hidden"
        @click="goRoute"
      >
        <span>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          &nbsp;
        </span>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有且等于1 -->
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item
        class="use-menu size-color"
        :index="item.children[0].path"
        v-if="!item.children[0].meta.hidden"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        &nbsp;
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有且大于1 -->
    <template v-if="item.children && item.children.length > 1">
      <el-sub-menu
        class="use-menu size-color"
        :index="item.children[0].path"
        v-if="!item.children[0].meta.hidden"
      >
        <template #title>
          <el-icon class="size-color">
            <component :is="item.meta.icon"></component>
          </el-icon>
          &nbsp;
          <span class="size-color">{{ item.meta.title }}</span>
        </template>
        <Menu :MenuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </template>
</template>
<script setup lang="ts" name="Menu">
import { useRouter } from 'vue-router'
// 获取父组件传递的数据
defineProps(['MenuList'])
let $route = useRouter()
const goRoute = (vc: any) => {
  $route.push(vc.index)
}
</script>
<style lang="scss" scoped>
.use-menu {
  background-color: $base-background-color;
}
.size-color {
  color: $base-size-color;
}
</style>
