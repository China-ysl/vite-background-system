// 品牌模块接口
import request from '../../../utils/sysrequest'
import type { BrandResponseData, BrandList } from './type'
import { ResponseData } from '../../type'

enum API {
  GET_ALL = '/Shopping/getBrand',
  GET_BRAND = '/Shopping/getBrandPage',
  PUT_BRAND = '/Shopping',
  DELETE_BRAND = '/Shopping/',
}

// 查询所有品牌接口
export const getAllBrand = () => request.get<any, ResponseData>(API.GET_ALL)
// 分页查询品牌接口
export const getBrandList = (pageNum: number, pageSize: number, brandName: string | null,) =>
  request.get<any, BrandResponseData>(API.GET_BRAND + '?pageNum=' + pageNum + '&pageSize=' + pageSize + '&brandName=' + brandName)
// 添加修改品牌接口
export const addPutBrand = (data: BrandList) =>
  request.put<any, ResponseData>(API.PUT_BRAND, data)
// 删除品牌接口
export const DeleteBrand = (id: number | undefined) =>
  request.delete<any, ResponseData>(API.DELETE_BRAND + id)
