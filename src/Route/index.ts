import { createRouter, createWebHashHistory } from 'vue-router'
import { contstantRoutes } from './routes.ts'

let router = createRouter({
  //路由模式
  history: createWebHashHistory(),
  //根据路由配置生成路由
  routes: contstantRoutes,

  //滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
