/*
 * @Descripttion:
 * @version:
 * @Author: Liu ZiJie
 * @Date: 2022-03-25 15:08:33
 * @LastEditors: Liu ZiJie
 * @LastEditTime: 2022-07-15 14:37:49
 */
import { request } from '@/utils/request'

export function page(params) {
    return request({
        url: '/api/dict/page',
        method: 'GET',
        params
    })
}

export function create(data) {
    return request({
        url: '/api/dict/create',
        method: 'POST',
        data
    })
}

export function update(data) {
    return request({
        url: '/api/dict/update',
        method: 'POST',
        data
    })
}

export function deleteDict(data) {
    return request({
        url: '/api/dict/delete',
        method: 'POST',
        data
    })
}

export function pageByType(params) {
    return request({
        url: '/api/dict/type/page',
        method: 'GET',
        params
    })
}

export function createByType(data) {
    return request({
        url: '/api/dict/type/create',
        method: 'POST',
        data
    })
}

export function updateByType(data) {
    return request({
        url: '/api/dict/type/update',
        method: 'POST',
        data
    })
}

export function deleteDictByType(data) {
    return request({
        url: '/api/dict/type/delete',
        method: 'POST',
        data
    })
}
