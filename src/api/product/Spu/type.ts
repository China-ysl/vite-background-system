import { ResponseData } from '../../type'
// 定义服务器返回Brand相关信息的数据类型
export interface SpuData {
  current: string
  optimizeCountSql: boolean
  orders: []
  pages: string
  records: SpuList
  searchCount: boolean
  size: string
  total: string
}
// Brand相关信息的数据类型
export interface SpuList {
  id: number | string
  spuname: string
  createBy: string
  createTime: string
  description: string
  category3id: string
  updateBy: string
  updateTime: string
  delFlag: number
}

// 定义服务器返回的数据类型
export interface SpuResponseData extends ResponseData {
  data: SpuData
}
