import request from '../../utils/request'

export function queryAboutme(data) {
  return request({
    url: '/aboutme/detail/query',
    method: 'post',
    data
  })
}
export function updateAboutme(data) {
  return request({
    url: '/aboutme/detail/update',
    method: 'post',
    data
  })
}

