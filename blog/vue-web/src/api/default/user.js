import request from '../../network/request'
// 查询用户
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
