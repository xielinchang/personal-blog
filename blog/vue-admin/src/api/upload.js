import { request } from '@/utils/request'

export function upload(data) {
  return request({
    url: '/api/file',
    method: 'post',
    data,
  })
}
