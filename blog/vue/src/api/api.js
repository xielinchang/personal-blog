import request from '../network/request'
export function getUserIp(data) {
  return request({
    url: '/user/ip',
    method: 'post',
    data
  })
}

/* method加s后是有区别的 */
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
