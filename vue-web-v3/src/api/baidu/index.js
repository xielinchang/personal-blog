import axios from 'axios'
export default function request(config) {
  const ins = axios.create({
    baseURL: '/baidu-api'
  })
  return ins(config)
}
