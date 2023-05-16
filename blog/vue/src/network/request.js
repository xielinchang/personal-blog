import axios from 'axios'
import Vue from 'vue'
import router from '../router'
import store from '../store'
import msgBox from '@/views/component/default-component/messageBox/index'
Vue.use(msgBox)
import { getToken, removeToken } from '@/utils/author'
export default function request(config) {
  const ins = axios.create({
    baseURL: process.env.VUE_APP_BASE_API
  })
  // 添加请求拦截器
  ins.interceptors.request.use(
    function(config) {
      if (getToken('token')) {
        config.headers.Authorization = 'Bearer ' + getToken('token')
      }
      return config
    }, function(error) {
      return Promise.reject(error)
    })

  // ins.interceptors.response.use(function(response) {
  //   return response
  // }, function(error) {
  //   const status = error.response.status
  //   if (status === 401 && !store.state.loginInvalidBox) {
  //     store.commit('setLoginInvalidBox', true)
  //     msgBox.confirm({
  //       title: '注销',
  //       content: '登录已过时',
  //       type: 'warning',
  //       onOK: () => {
  //         removeToken('token')
  //         store.commit('setLoginInvalidBox', false)
  //         router.push('/login')
  //       },
  //       onCancel: () => {

  //       }
  //     })
  //   }
  //   return Promise.reject(error)
  // })
  return ins(config)
}

