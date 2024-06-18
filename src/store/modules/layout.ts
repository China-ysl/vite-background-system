// 引入pinia仓库
import { defineStore } from 'pinia'

let useLayoutSettingStore = defineStore('LayoutStore', {
  state: () => {
    return {
      fold: false, //用户控制菜单折叠还是打开变量
      refsh: false, //控制刷新变量
    }
  },
})

export default useLayoutSettingStore
