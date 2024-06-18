import { ResponseData } from '../../type'
// 定义服务器返回的数据类型
export interface AttrResponseData extends ResponseData {
  data: AttrData
}
export interface AttrData {
  id: number
  name: string
  category1id?: string
  category2id?: string
  createBy?: number
  createTime?: string
  updateBy?: number
  updateTime?: string
  delFlag?: number
}
export interface AttrValueForm {
  id?: string | number
  attrname: string
  categoryId: string | number
  categoryLevel: string | number
  attrValueList: AttrValueList
}
export type AttrValueList = AttrValueListtype[]

interface AttrValueListtype {
  id?: string | number
  valuename: string
  attrid?: string | number
  pattern?: boolean
}
export interface valueidList {
  idList: idList
}
export type idList = idListtype[]
interface idListtype {
  id: string | number
}
