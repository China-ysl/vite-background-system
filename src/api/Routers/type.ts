// 引入公共类型
import type { user } from '../type'

export interface menus {
  children: []
  component: string
  icon: string
  id: string
  isFrame: number
  menuName: string
  menuType: string
  orderNum: number
  parentId: number
  path: string
  perms: string
  article: string
  status: string
  visible: string
}

// 定义服务器返回用户相关信息的数据类型
export interface ResponseData {
  code: number
  data: user
  msg: string
}
