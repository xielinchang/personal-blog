import { request } from '@/utils/request'

export function photoQuery(data) {
    return request({
        url: '/blog/photo/query',
        method: 'post',
        data
    })
}
export function photoDelete(data) {
    return request({
        url: '/blog/photo/delete',
        method: 'post',
        data
    })
}
export function photoCreate(data) {
    return request({
        url: '/blog/photo/create',
        method: 'post',
        data
    })
}
export function photoUpdate(data) {
    return request({
        url: '/blog/photo/update',
        method: 'post',
        data
    })
}
