import request from '../../network/request'

export function projectQuery(data) {
  return request({
    url: '/project/query',
    method: 'post',
    data
  })
}
export function projectCreate(data) {
  return request({
    url: '/project/create',
    method: 'post',
    data
  })
}
export function projectUpdate(data) {
  return request({
    url: '/project/update',
    method: 'post',
    data
  })
}
export function projectDelete(data) {
  return request({
    url: '/project/delete',
    method: 'post',
    data
  })
}

