// 封装本地存储与读取数据的方法
// 本地存储token方法
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('token', token)
}
// 读取本地存储token方法
export const GET_TOKEN = () => {
  return localStorage.getItem('token')
}

export const REMOVE_TOKEN = () => {
  return localStorage.removeItem('token')
}
