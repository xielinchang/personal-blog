import request from '../../utils/request'

export function photoQuery(data) {
  return request({
    url: '/blog/photo/query',
    method: 'post',
    data
  })
}
