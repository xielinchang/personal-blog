import { request } from '@/utils/request'

export function bg(data) {
  return request({
    url: '/blog/bg',
    method: 'post',
    data
  })
}
export function bgGif(data) {
  return request({
    url: '/blog/bg/gif',
    method: 'post',
    data
  })
}

export function defaultPortrait(data) {
  return request({
    url: '/default/portrait',
    method: 'post',
    data
  })
}
