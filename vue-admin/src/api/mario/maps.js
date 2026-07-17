import { request } from '@/utils/request'

export function fetchMaps(data) {
    return request({
        url: '/piggy/gaming/supermarry/map/query',
        method: 'post',
        data
    })
}

export function createMap(data) {
    return request({
        url: '/piggy/gaming/supermarry/map/create',
        method: 'post',
        data
    })
}
export function updateMap(data) {
    return request({
        url: '/piggy/gaming/supermarry/map/update',
        method: 'post',
        data
    })
}
export function deleteMap(data) {
    return request({
        url: '/piggy/gaming/supermarry/map/delete',
        method: 'post',
        data
    })
}