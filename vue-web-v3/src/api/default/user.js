import request from '../../utils/request'
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}
export function changePsw(data) {
  return request({
    url: '/user/change/psw',
    method: 'post',
    data
  })
}
export function queryUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}
export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}
export function deleteUser(data) {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  })
}
export function userDetailUpdate(data) {
  return request({
    url: '/user/detail/update',
    method: 'post',
    data
  })
}

// 查询现在用户
export function getUserInfo() {
  return request({
    url: '/user/info'
  })
}
