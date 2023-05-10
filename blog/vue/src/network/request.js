import axios from 'axios'
import Vue from 'vue'
import { getToken, removeToken } from '@/utils/author'
export default function (config) {
  const inst1 = axios.create({
    baseURL: process.env.VUE_APP_BASE_API
  })
  // 添加请求拦截器
  inst1.interceptors.request.use(
    function(config) {
      if (getToken()) {
        config.headers.Authorization = 'Bearer ' + getToken()
      } else {
        removeToken()
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        console.log('登录过期')
      }
      return config
    },
    function(error) {
      return Promise.reject(error)
    }
  )
  return inst1(config)
}

