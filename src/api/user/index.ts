// 用户相关的接口
import request from '../../utils/request'
import type {
  loginForm,
  loginResponseData,
  loginout,
  UserResponseData,
} from './type'
import type { ResponseData } from '../type'
enum API {
  LOGIN_URL = '/login',
  USERINFO_URl = '/user/userInfo',
  LOGINOUT_URL = '/logout',
}
// 暴露请求函数
// 登录接口方法

// 登陆请求方法
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
// 请求用户的数据方法
export const reqUserInfo = () =>
  request.get<any, UserResponseData>(API.USERINFO_URl)
//退出登陆
export const reqloginout = () => request.post<any, loginout>(API.LOGINOUT_URL)
