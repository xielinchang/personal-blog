import request from '../network/request'

export function commentsQuery(data) {
  return request({
    url: '/comments/query',
    method: 'post',
    data
  })
}
export function commentsCreate(data) {
  return request({
    url: '/comments/create',
    method: 'post',
    data
  })
}
export function commentsDelete(data) {
  return request({
    url: '/comments/delete',
    method: 'post',
    data
  })
}
export function commentsUpdate(data) {
  return request({
    url: '/comments/update',
    method: 'post',
    data
  })
}
