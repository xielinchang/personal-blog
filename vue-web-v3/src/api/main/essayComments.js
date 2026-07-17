import request from '../../utils/request'
export function essayCommentsQuery(data) {
  return request({
    url: '/essay/comments/query',
    method: 'post',
    data
  })
}
export function essayCommentsCreate(data) {
  return request({
    url: '/essay/comments/create',
    method: 'post',
    data
  })
}
export function essayCommentsDelete(data) {
  return request({
    url: '/essay/comments/delete',
    method: 'post',
    data
  })
}
