import { request } from '@/utils/request'

export function essayQuery(data) {
  return request({
    url: '/essay/query',
    method: 'post',
    data
  })
}
export function essayQueryState(data) {
  return request({
    url: '/essay/query/state',
    method: 'post',
    data
  })
}
export function changeState(data) {
  return request({
    url: '/essay/change/state',
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
export function bannerQuery(data) {
  return request({
    url: '/essay/banner/query',
    method: 'post',
    data
  })
}

export function bannerDelete(data) {
  return request({
    url: '/essay/banner/delete',
    method: 'post',
    data
  })
}

export function bannerCreate(data) {
  return request({
    url: '/essay/banner/create',
    method: 'post',
    data
  })
}

