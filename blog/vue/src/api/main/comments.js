import request from '../../network/request'

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
export function commentsReplyCreate(data) {
  return request({
    url: '/comments/reply/create',
    method: 'post',
    data
  })
}
export function commentsReplyDelete(data) {
  return request({
    url: '/comments/reply/delete',
    method: 'post',
    data
  })
}
