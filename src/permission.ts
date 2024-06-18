// 路由鉴权 设置路由访问条件
// 引入路由
import router from './Route'
// 引入nprogress
import NProgress from 'nprogress'
// 取消进度条小圈
// NProgress.configure({ showSpinner: false })
// 引入NProgress.css
import 'nprogress/nprogress.css'
// 引入pinia仓库
import pinia from './store'
// 引入user小仓库获取用户数据
import useUserStore from './store/modules/user'
import useRouteStore from './store/modules/route'
import setconfig from './setconfig'
import { GET_TOKEN } from './utils/token'
// 引入消息提示
import { ElMessage } from 'element-plus'
// 获取用户信息
let userStore = useUserStore(pinia)
// 根据用户信息获取菜单列表
let routeStore = useRouteStore(pinia)
// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = setconfig.title + '  ' + to.meta.title
  // 进度条开启
  NProgress.start()
  let token = GET_TOKEN()
  let nickName = userStore.nickName
  if (token) {
    // 用户登录
    console.log('用户登录')
    console.log(token)
    console.log('用户名：' + nickName)
    if (nickName) {
      if (to.path == '/Login') {
        console.log('登陆了' + to.path + '页面')
        next({ path: '/home' })
      } else {
        next()
      }
    } else {
      // 没有用户信息
      console.log('没有用户信息')
      // 获取用户信息
      console.log('获取用户信息')
      let result = await userStore.userInfo()
      console.log(result)
      if (result == 'ok') {
        console.log('获取到的用户信息:' + userStore.nickName)
        next()
      } else {
        // 获取用户信息失败
        ElMessage({
          type: 'error',
          message: '登陆时间超时，请重新登陆',
        })
        console.log('获取用户信息失败,token过期或非法')
        console.log('调用REMOVE_TOKEN_USER()方法,清除token和登陆的用户信息')
        userStore.REMOVE_TOKEN_USER()
        next({ path: '/Login', query: { redirect: to.path } })
      }
    }
  } else {
    if (to.path == '/Login') {
      // 用户未登陆 路径是login
      console.log('用户未登陆 路径是' + to.path)
      next()
    } else {
      // 用户未登陆 路径不是login 重定向到login
      console.log('用户未登陆 路径是' + to.path + ' 重定向到login')
      next({ path: '/Login', query: { redirect: to.path } })
    }
  }
})
// 全局后置守卫 afterEach后置钩子
router.afterEach((to: any, from: any) => {
  // 进度条结束
  NProgress.done()
})

//任意路由切换实现进度条业务 ---nprogress
//路由鉴权（路由组件访问权限的设置）
//全部路由组件:登录14041任意路由1首页1数据大屏1权限管理(三个子路由)1商品管理(四个子路由)
//用户未登录：可以访问login，其余六个路由不能访问(指向login)
//用户登录成功：不可以访问login[指向首页]，其余的路由可以访问
