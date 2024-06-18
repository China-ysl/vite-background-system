import axios from 'axios'
import { ElMessage } from 'element-plus/lib/components/index.js'
// 引入用户相关的仓库useUserStore
import useUserStore from '../store/modules/user'

//利用axios对象的create方法，去创建axios实例(其他的配置：基础路径、超时时间)
let sysrequest = axios.create({
  // 基础url
  baseURL: import.meta.env.VITE_APP_SYSBASE_API,
  // 超时时间
  timeout: 5000,
})
//request实例添加请求与响应拦截器
//请求拦截器
sysrequest.interceptors.request.use((config) => {
  // 获取用户的小仓库
  let userStore = useUserStore()
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  return config
})
//响应拦截器
sysrequest.interceptors.response.use(
  (Response) => {
    // 成功回调

    return Response.data
  },
  (error) => {
    // 失败回调
    let message = ''
    let status = error.response.status
    switch (status) {
      case 401:
        message = 'token过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '无网络'
    }
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)

export default sysrequest
