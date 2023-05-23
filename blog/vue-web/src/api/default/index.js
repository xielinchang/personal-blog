import request from '../../network/request'
export function getUserIp(data) {
  return request({
    url: '/user/ip',
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

export function uploadimg(data) {
  return request({
    url: '/api/file',
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
