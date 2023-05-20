import axios from 'axios'
import Cookie from 'js-cookie'
export default function request(config) {
  const ins = axios.create({
    baseURL: process.env.VUE_APP_BASE_API_BAIDU
  })
  // 添加请求拦截器
  ins.interceptors.request.use(
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
  return ins(config)
}

