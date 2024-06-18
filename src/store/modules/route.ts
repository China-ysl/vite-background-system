// 路由相关的仓库
import { defineStore } from 'pinia'
//引入api接口
import { getRouters } from '../../api/Routers/index'
// 引入 数据类型
import type { menus } from './types/routestype'
// 引入token工具
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '../../utils/token'
// 引入路由配置信息
import { contstantRoutes } from '../../Route/routes'
// pinia Routes 仓库
let useRouteStore = defineStore('Routes', {
  state: (): menus => {
    return {
      children: [],
      component: '',
      icon: '',
      id: '',
      isFrame: 0,
      menuName: 'string',
      menuType: 'string',
      orderNum: 0,
      parentId: 0,
      path: 'string',
      perms: 'string',
      article: 'string',
      status: 'string',
      visible: 'string',
    }
  },
  // 异步|逻辑的地方
  actions: {
    // 用户登录的方法
    async getrouters() {
      // 发送请求
      let result = await getRouters()
      // 请求成功200
      if (result.code == 200) {
        console.log(result)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
  },
  getters: {},
})
export default useRouteStore
