import { request } from '@/utils/request'

export function messageQuery(data) {
  return request({
    url: '/message/query',
    method: 'post',
    data
  })
}
export function messageCreate(data) {
  return request({
    url: '/message/create',
    method: 'post',
    data
  })
}
export function messageDelete(data) {
  return request({
    url: '/message/delete',
    method: 'post',
    data
  })
}
export function messageReplyCreate(data) {
  return request({
    url: '/message/reply/create',
    method: 'post',
    data
  })
}
export function messageReplyDelete(data) {
  return request({
    url: '/message/reply/delete',
    method: 'post',
    data
  })
}
