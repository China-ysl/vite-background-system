<template>
  <img class="ba_img" :src="setconfig.background_img" alt="" />
  <RouterView></RouterView>
</template>
<script setup lang="ts">
import setconfig from './setconfig'
</script>

<style scoped lang="scss">
.ba_img {
  width: 100%;
  height: 100vh;
  display: flex;
  position: absolute;
  z-index: -1;
}
</style>
