import type { AttrData } from '../../../api/product/Attr/type'
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

export interface useAttrData {
  Attr1Id: string | number
  Attr2Id: string | number
  Attr3Id: string | number
  Attr1: AttrData[]
  Attr2: AttrData[]
  Attr3: AttrData[]
  AttrValueList: []
}

export interface AttrList {
  attrValueList: AttrValueList[]
  attrname: string
  categoryId: string | number
  categoryLevel: string | number
  id: string | number
}
interface AttrValueList {
  id: string | number
  valuename: string
  attrId: string | number
}
