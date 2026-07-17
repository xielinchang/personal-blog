import axios from 'axios'
import { getToken, removeToken } from './author'
export default function request(config) {
  const ins = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API
  })
  // 添加请求拦截器
  ins.interceptors.request.use(
    function (config) {
      if (getToken('token')) {
        config.headers.Authorization = 'Bearer ' + getToken('token')
      }
      return config
    }, function (error) {
      return Promise.reject(error)
    })
  ins.interceptors.response.use(function (response) {
    return response
  }, function (error) {
    const status = error?.response?.status || null
    if (status === 401 || status === '401') {
      removeToken('token')
    }
    // return Promise.reject(error)
  })
  return ins(config)
}

