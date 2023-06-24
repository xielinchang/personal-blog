import axios from 'axios'
export default function request(config) {
  const ins = axios.create({
    baseURL: process.env.VUE_APP_BASE_API_BAIDU
  })
  return ins(config)
}
