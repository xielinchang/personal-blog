import request from '../../network/request'
export function getUserIp(data) {
  return request({
    url: '/user/ip',
    method: 'post',
    data
  })
}

export function dayImg(data) {
  return request({
    url: '/blog/dayimg',
    method: 'post',
    data
  })
}
export function homeBg(data) {
  return request({
    url: '/blog/home/bg/now',
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
