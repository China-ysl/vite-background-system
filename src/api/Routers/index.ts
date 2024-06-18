// 菜单获取接口
import request from '../../utils/sysrequest'
import type { ResponseData } from './type'
enum API {
  REUTERS_URL = '/getRouters',
}

export const getRouters = () => request.get<any, ResponseData>(API.REUTERS_URL)
