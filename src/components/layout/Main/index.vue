<template>
  <div class="index">
    <router-view v-slot="{ Component }" v-if="flag">
      <Transition name="fade">
        <component :is="Component" />
      </Transition>
    </router-view>
  </div>
</template>

<script setup lang="ts" name="Main">
import { RouterView } from 'vue-router'
import { watch, ref, nextTick } from 'vue'
import useLayoutSettingStore from '../../../store/modules/layout'

let flag = ref(true)

let LayoutSettingRefsh = useLayoutSettingStore()
watch(
  () => LayoutSettingRefsh.refsh,
  () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 1s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
