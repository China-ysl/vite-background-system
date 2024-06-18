// 公共类型

// 定义服务器返回的数据类型
export interface ResponseData {
  code: number
  msg: string
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
