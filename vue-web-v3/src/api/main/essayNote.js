import request from '../../utils/request'
export function essayNoteQuery(data) {
  return request({
    url: '/essay/note/query',
    method: 'post',
    data
  })
}
export function getUserNotes(data) {
  return request({
    url: '/essay/note/query/userNote',
    method: 'post',
    data
  })
}
export function essayNoteUpdate(data) {
  return request({
    url: '/essay/note/update',
    method: 'post',
    data
  })
}
export function essayNoteDelete(data) {
  return request({
    url: '/essay/note/delete',
    method: 'post',
    data
  })
}
