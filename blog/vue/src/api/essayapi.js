import request from '../network/request'

export function essayQuery(data) {
  return request({
    url: '/essay/query',
    method: 'post',
    data
  })
}
export function essayCreate(data) {
  return request({
    url: '/essay/create',
    method: 'post',
    data
  })
}
export function essayUpdate(data) {
  return request({
    url: '/essay/update',
    method: 'post',
    data
  })
}
export function essayDetailUpdate(data) {
  return request({
    url: '/essay/detail/update',
    method: 'post',
    data
  })
}
export function essayDelete(data) {
  return request({
    url: '/essay/delete',
    method: 'post',
    data
  })
}
export function essayQuerySave(data) {
  return request({
    url: '/essay/querysave',
    method: 'post',
    data
  })
}
export function essaySave(data) {
  return request({
    url: '/essay/save',
    method: 'post',
    data
  })
}

