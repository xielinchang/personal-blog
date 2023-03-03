import request from '../network/request'

export function shareQuery(data) {
  return request({
    url: '/share/query',
    method: 'post',
    data
  })
}
export function shareCreate(data) {
  return request({
    url: '/share/create',
    method: 'post',
    data
  })
}
export function shareUpdate(data) {
  return request({
    url: '/share/update',
    method: 'post',
    data
  })
}
export function shareDelete(data) {
  return request({
    url: '/share/delete',
    method: 'post',
    data
  })
}
export function shareQuerySave(data) {
  return request({
    url: '/share/querysave',
    method: 'post',
    data
  })
}
export function shareSave(data) {
  return request({
    url: '/share/save',
    method: 'post',
    data
  })
}

