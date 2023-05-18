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
// 获取用户对应角色
export function queryeUserRole(data) {
  return request({
    url: '/user/role',
    method: 'post',
    data
  })
}
export function updateUserRole(data) {
  return request({
    url: '/user/role/update',
    method: 'post',
    data
  })
}
// 角色列表
export function queryeRoleList(data) {
  return request({
    url: '/role/list',
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
