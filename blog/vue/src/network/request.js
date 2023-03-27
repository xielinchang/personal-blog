import axios from 'axios'
import Cookie from 'js-cookie'
export default function (config) {
  const inst1 = axios.create({
    baseURL: process.env.VUE_APP_BASE_API
  })
  // 添加请求拦截器
  inst1.interceptors.request.use(
    function(config) {
      const token = Cookie.get('token')
      if (token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    },
    function(error) {
      return Promise.reject(error)
    }
  )
  return inst1(config)
}

