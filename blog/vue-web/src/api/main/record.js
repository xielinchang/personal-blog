import request from '../../network/request'

export function recordQuery(data) {
  return request({
    url: '/record/query',
    method: 'post',
    data
  })
}
export function recordDelete(data) {
  return request({
    url: '/record/delete',
    method: 'post',
    data
  })
}
export function recordCreate(data) {
  return request({
    url: '/record/create',
    method: 'post',
    data
  })
}
export function recordDefaultQuery(data) {
  return request({
    url: '/record/default/query',
    method: 'post',
    data
  })
}
export function recordDefaultUpdate(data) {
  return request({
    url: '/record/default/update',
    method: 'post',
    data
  })
}
