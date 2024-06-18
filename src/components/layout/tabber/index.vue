<template>
  <div class="tabber">
    <div class="tabber_left">
      <breadcrumbView></breadcrumbView>
    </div>
    <div class="tabber_rigth">
      <settingView></settingView>
    </div>
  </div>
</template>

<script setup lang="ts" name="tabber">
import breadcrumbView from './breadcrumb/index.vue'
import settingView from './setting/index.vue'
import { reactive, toRefs } from 'vue'
const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  squareUrl:
    'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  sizeList: ['small', '', 'large'] as const,
})
</script>

<style scoped lang="scss">
.tabber {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  background-image: linear-gradient(
    to top,
    rgb(255, 244, 244),
    rgb(234, 187, 255)
  );
  background-color: $base-background-color;
}

.tabber_left {
  display: flex;
  align-items: center;
  font-size: 25px;
}

.tabber_rigth {
  width: 300px;
  display: flex;
  align-items: center;
}
</style>
