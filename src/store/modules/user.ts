// 用户相关的仓库
import { defineStore } from 'pinia'
//引入登录api接口
import { reqLogin, reqUserInfo, reqloginout } from '../../api/user/index'
// 引入登录loginform表单，UserState 数据类型
import type { loginForm, UserState } from '../../api/user/type'
// 引入token工具
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '../../utils/token'
// 引入路由配置信息
import { contstantRoutes } from '../../Route/routes'
// pinia user仓库
let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      MenuRoutesList: contstantRoutes,
      // 用户昵称
      nickName: '',
      // 用户id
      id: '',
      // 用户头像
      avatar:
        'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      // 用户头像
      email: '',
      // 用户性别
      sex: '',
    }
  },
  // 异步|逻辑的地方
  actions: {
    async REMOVE_TOKEN_USER() {
      // 调用清除用户数据和过期或非法token方法
      // 删除本地持久化token
      REMOVE_TOKEN()
      this.token = ''
      this.nickName = ''
      this.id = ''
      this.avatar = ''
      this.email = ''
      this.sex = ''
    },
    // 用户登录的方法
    async userLogin(data: loginForm) {
      // 登录请求
      let result = await reqLogin(data)
      // 登录成功200->tonken
      if (result.code == 200) {
        // 登录成功将tonken存入pinia user数据仓库
        this.token = result.data.token as string
        // 使用utils持久化方法 本地持久化存储token
        SET_TOKEN(result.data.token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    // 请求用户数据方法
    async userInfo() {
      let result = await reqUserInfo()
      // 请求用户数据储存到仓库
      if (result.code == 200) {
        let list = result.data
        this.nickName = list.nickName
        this.id = list.id
        this.avatar = list.avatar
        this.email = list.email
        this.sex = list.sex
        return 'ok'
      } else {
        return result.msg
      }
    },
    // 退出登陆方法
    async loginout() {
      let result = await reqloginout()
      // 删除用户信息
      if (result.code == 200) {
        // 删除本地持久化token
        REMOVE_TOKEN()
        this.token = ''
        this.nickName = ''
        this.id = ''
        this.avatar = ''
        this.email = ''
        this.sex = ''
        return 'ok'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
  },
  getters: {},
})
export default useUserStore
