// SPU模块接口
import request from '../../../utils/sysrequest'
import type { SpuResponseData } from './type'
import { ResponseData } from '../../type'

enum API {
  SPU = '/SPU',
}

// 分页查询SPU接口
export const getSPUList = (
  pageNum: number,
  pageSize: number,
  category3id: number | string,
  spuname: string,
) => {
  if (spuname == '') {
    request.get<any, SpuResponseData>(
      API.SPU +
        `?pageNum=${pageNum}&pageSize=${pageSize}&category3id=${category3id}`,
    )
  } else {
    request.get<any, SpuResponseData>(
      API.SPU +
        `?pageNum=${pageNum}&pageSize=${pageSize}&category3id=${category3id}&spuname=${spuname}`,
    )
  }
}
// 添加修改品牌接口
export const addPutSPU = (data: any) =>
  request.put<any, ResponseData>(API.SPU, data)
// 删除品牌接口
export const DeleteSPU = (id: number | undefined) =>
  request.delete<any, ResponseData>(API.SPU + id)
