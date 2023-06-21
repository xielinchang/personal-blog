import { request } from '@/utils/request'

export function dayImg(data) {
    return request({
      url: '/blog/dayimg',
      method: 'post',
      data
    })
  }
  export function homeBgList(data) {
    return request({
      url: '/blog/home/bg',
      method: 'post',
      data
    })
  }
  export function homeBgNow(data) {
    return request({
      url: '/blog/home/bg/now',
      method: 'post',
      data
    })
  }
  export function updateHomeBg(data) {
    return request({
      url: '/blog/home/bg/now/update',
      method: 'post',
      data
    })
  }