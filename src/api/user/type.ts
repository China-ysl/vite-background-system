import { ResponseData } from '../type'
import { RouteRecordRaw } from 'vue-router'
// 登陆接口数据类型
export interface loginForm {
  userName: string
  password: string
}
// 用户仓库信息类型
export interface UserState {
  token?: string | null
  // 菜单配置list
  MenuRoutesList: RouteRecordRaw[]
  // 用户昵称
  nickName: string
  // 用户id
  id: string
  // 用户头像
  avatar: string
  // 用户头像
  email: string
  // 用户性别
  sex: string
}
//登录接口返回类型ts
export interface loginResponseData {
  msg: string
  code: number
  data: userdata
}
interface userdata {
  token: string
  userInfo: userInfo
}

// 退出登陆接口类型ts
export interface loginout {
  code: number
  msg: string
}
// 定义服务器返回用户相关信息的数据类型
export interface UserResponseData extends ResponseData {
  data: user
}
// 定义用户数据类型
export interface user {
  sex: string
  email: string
  avatar: string
  id: string
  nickName: string
  checkUser: userInfo
}
// 用户返回信息ts类型
export interface userInfo {
  avatar: string
  email: string
  id: string
  nickName: string
  sex: string
}
// 定义服务器返回的数据类型
export interface UserResponseData extends ResponseData {
  data: user
  code: number
  msg: string
}
