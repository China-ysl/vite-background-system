import { ResponseData } from '../../type'
// 定义服务器返回Brand相关信息的数据类型
export interface BrandData {
  shoppingList: BrandList
  total: number
}
// Brand相关信息的数据类型
export interface BrandList {
  id?: number
  brandName: string
  logoUrl: string
  createBy?: number
  createTime?: string
  delFlag?: number
  status?: string
  updateBy?: number
  updateTime?: string
}

// 定义服务器返回的数据类型
export interface BrandResponseData extends ResponseData {
  data: BrandData
}

export interface BranForm {
  id?: number
  brandName: string
  logoUrl: string
}
