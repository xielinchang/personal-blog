import request from '../network/request'
import md5 from 'blueimp-md5'
export function login(data) {
  data.password = md5(data.password)
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
export function register(data) {
  data.password = md5(data.password)
  return request({
    url: '/register',
    method: 'post',
    data
  })
}

export function validate() {
  return request({
    url: '/validate',
    method: 'post'
  })
}
