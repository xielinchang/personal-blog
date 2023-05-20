import axios from 'axios'
import { getToken, removeToken } from '../utils/cookie'
import router from '../router'
import { MessageBox } from 'element-ui'
import store from '../store'
export function request(config) {
    const ins = axios.create({
        baseURL: process.env.VUE_APP_BASE_API
    })
    ins.interceptors.request.use(function(config) {
        if (config.headers.isToken !== false) {
            if (getToken('token')) {
                config.headers.Authorization = 'Bearer ' + getToken('token')
            }
        }
        return config
    }, function(error) {
        return Promise.reject(error)
    })

    ins.interceptors.response.use(function(response) {
        return response.data
    }, function(error) {
        const status = error.response.status
        if (status === 401 && !store.state.loginInvalidBox) {
            store.commit('setLoginInvalidBox', true)
            MessageBox.confirm('登录已过时！', '注销', {
                confirmButtonText: '返回登录',
                showCancelButton: false,
                type: 'warning'
            }).then(() => {
                removeToken('token')
                store.commit('setLoginInvalidBox', false)
                router.push('/login')
            })
        }
        return Promise.reject(error)
    })

    return ins(config)
}
