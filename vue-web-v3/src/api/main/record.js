import request from '../../utils/request'

export function recordQuery(data) {
  return request({
    url: '/record/query',
    method: 'post',
    data
  })
}

export function recordDefaultQuery(data) {
  return request({
    url: '/record/default/query',
    method: 'post',
    data
  })
}
