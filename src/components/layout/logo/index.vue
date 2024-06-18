<template>
  <div class="logo_container" v-if="setconfig.logoHidden">
    <img class="gg logo" :src="setconfig.logo" alt="" />
    <div class="gg logo_title">{{ setconfig.title }}</div>
  </div>
</template>

<script setup lang="ts" name="logo">
import setconfig from '../../../setconfig'
import useLayoutSettingStore from '../../../store/modules/layout'
// 获取layout小仓库
let LayoutSettingStore = useLayoutSettingStore()
</script>
<style scoped lang="scss">
.logo_container {
  display: flex;
  width: 100%;
  height: $base-menu-logo-height;
}
.gg {
  margin-top: 10px;
  margin-left: 10px;
}

.logo {
  width: $base-logo-width-height;
  height: $base-logo-width-height;
}

.logo_title {
  position: relative;
  font-size: $base-title-font-size;
  width: 100%;
  height: calc($base-menu-logo-height - 10px);
  line-height: calc($base-menu-logo-height - 10px);
  color: $title-size-color;
}
</style>
