// 属性管理模块接口
import request from '../../../utils/sysrequest'
import type {
  AttrResponseData,
  AttrData,
  AttrValueForm,
  valueidList,
} from './type'
import { ResponseData } from '../../type'

enum API {
  GET_ATTR = '/Attr',
  GET_ATTR2 = '/Attr2',
  GET_ATTRVALUE = '/AttrList',
  GET_ATTRVALUE_LIST = '/AttrList/AttrListAdd',
  GET_ATTRVALUE_DELETE = '/AttrValue',
}
// 分页查询分类一属性接口
export const getAttrList = () =>
  request.get<AttrData, AttrResponseData>(API.GET_ATTR)
// 添加分类属性接口
export const addAttrList = (data: AttrData) =>
  request.post<AttrData, ResponseData>(API.GET_ATTR, data)
// 修改分类属性接口
export const putAttrList = (data: AttrData) =>
  request.put<AttrData, ResponseData>(API.GET_ATTR, data)
// 删除分类属性接口
export const DeleteAttrList = (id: number | undefined) =>
  request.delete<any, ResponseData>(API.GET_ATTR + id)
// 根据一级分类id查询二级分类
export const getAttr2List = (id: number | string) =>
  request.get<AttrData, AttrResponseData>(API.GET_ATTR2 + '?category1id=' + id)
// 根据二级分类id查询二级分类
export const getAttr3List = (id: number | string) =>
  request.get<AttrData, AttrResponseData>(API.GET_ATTR2 + '?category1id=' + id)
// 根据各级分类id查询AttrVauleList的值
export const getAttrValueList = (
  Attr1Id: number | string,
  Attr2Id: number | string,
  Attr3Id: number | string,
) =>
  request.get<AttrData, AttrResponseData>(
    API.GET_ATTRVALUE + '/' + Attr1Id + '/' + Attr2Id + '/' + Attr3Id,
  )
// 属性值名称、属性值 删除接口
export const removeValueList = (listId: any) =>
  request.delete<any, ResponseData>(
    API.GET_ATTRVALUE + '?listId=' + `${listId}`,
  )
// 新增AttrVauleList的值
export const putAttrValueList = (data: AttrValueForm) =>
  request.post<AttrValueForm, ResponseData>(API.GET_ATTRVALUE_LIST, data)
// 属性值删除接口
export const deleteValueList = (idList: any) =>
  request.delete<any, ResponseData>(
    API.GET_ATTRVALUE_DELETE + '?idList=' + `${idList}`,
  )
