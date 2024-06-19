// SPU模块接口
import request from '../../../utils/sysrequest'
import type { SpuResponseData } from './type'
import { ResponseData } from '../../type'

enum API {
  SPU = '/SPU',
  SPU_IMG = '/SpuImage',
  SPU_IMGS = '/SpuImage/List',

}


// 分页查询SPU接口
export const getSPUList = (pageNum: number, pageSize: number, category3id: number | string, spuname: string) =>
  request.get<any, any>(API.SPU + `?pageNum=${pageNum}&pageSize=${pageSize}&category3id=${category3id}&spuname=${spuname}`)
// 添加修改SPU接口
export const addPutSPU = (data: any) => request.put<any, ResponseData>(API.SPU, data)
// 删除SPU接口
export const DeleteSPU = (id: number | undefined) => request.delete<any, ResponseData>(API.SPU + id)

// 查询SPUImage接口
export const getSPUImage = () => request.get<any, ResponseData>(API.SPU_IMGS)

// 分页查询SPUImage接口
export const getAllSPUImage = (pageNum: number, pageSize: number) => request.get<any, ResponseData>(API.SPU_IMG + `?pageNum=${pageNum}&pageSize=${pageSize}`)
