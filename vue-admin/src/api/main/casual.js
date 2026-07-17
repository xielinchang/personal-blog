import { request } from '@/utils/request'

export function casualQuery(data) {
    return request({
        url: '/blog/casual/query',
        method: 'post',
        data
    })
}
export function casualDelete(data) {
    return request({
        url: '/blog/casual/delete',
        method: 'post',
        data
    })
}
export function casualCreate(data) {
    return request({
        url: '/blog/casual/create',
        method: 'post',
        data
    })
}
export function casualUpdate(data) {
    return request({
        url: '/blog/casual/update',
        method: 'post',
        data
    })
}