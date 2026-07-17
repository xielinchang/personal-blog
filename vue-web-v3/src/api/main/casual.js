import request from '../../utils/request'

export function casualQuery(data) {
  return request({
    url: '/blog/casual/query',
    method: 'post',
    data
  })
}

