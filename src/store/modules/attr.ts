// 引入pinia仓库
import { defineStore } from 'pinia'
// 引入attr api
import {
  getAttrList,
  getAttr2List,
  getAttr3List,
  getAttrValueList,
  removeValueList,
} from '../../api/product/Attr/index'
import type { AttrResponseData } from '../../api/product/Attr/type'
import type { useAttrData, AttrList } from './types/routestype'
let useAttrStore = defineStore('AttrStore', {
  state: (): useAttrData => {
    return {
      Attr1: [], // 一级分类数据
      Attr1Id: '', // 一级分类属性id
      Attr2: [], // 一级分类数据
      Attr2Id: '', // 二级分类属性id
      Attr3: [], // 三级分类数据
      Attr3Id: '',
      AttrValueList: [],
    }
  },
  actions: {
    // 获取一级分类数据
    async getAttr1() {
      let result: any = await getAttrList()
      if (result.code == 200) {
        this.Attr1 = result.data
      } else {
        return result.msg
      }
    },
    async getAttr2() {
      let result: any = await getAttr2List(this.Attr1Id)
      if (result.code == 200) {
        this.Attr2 = result.data
      } else {
        return result.msg
      }
    },
    async getAttr3() {
      let result: any = await getAttr3List(this.Attr2Id)
      if (result.code == 200) {
        this.Attr3 = result.data
      } else {
        return result.msg
      }
    },
    async getVauleList() {
      let result: any = await getAttrValueList(
        this.Attr1Id,
        this.Attr2Id,
        this.Attr3Id,
      )
      if (result.code == 200) {
        this.AttrValueList = result.data
      } else {
        return result.msg
      }
    },
  },
  getters: {},
})

export default useAttrStore
