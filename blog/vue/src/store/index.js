import Vue from 'vue'
import Vuex from 'vuex'
import { click } from './modules/click'
import { dictionary } from './modules/dictionary'
import { getUserInfo } from '@/api/default/user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}, // visitor,user,admin,superAdmin
    loginInvalidBox: false, // 登录失效盒子，只要显示一次
    loading: true, // 响应
    hasPermi: false, // 基础权限:除用户不能管理外，其他都能管理
    hasSuperPermi: false// 超级管理员权限：所有权限
  },
  getters: {
  },
  mutations: {
    setLoginInvalidBox(state, flag) {
      state.loginInvalidBox = flag
    },
    setLoading(state) {
      state.loading = true
    },
    setPermi(state) {
      if (state.user.role.code === 'superAdmin' || state.user.role.code === 'admin') {
        state.hasPermi = true
        if (state.user.role.code === 'superAdmin') {
          state.hasSuperPermi = true
        }
      } else {
        state.hasPermi = false
      }
    },
    setUserInfo(state, user) {
      state.user = user
      state.loading = false
    },
    reSetUserInfo(state) {
      state.user = {}
    }
  },
  actions: {
    getUserInfo({ commit }) {
      commit('setLoading')

      return new Promise((resolve, reject) => {
        getUserInfo().then(async response => {
          commit('setUserInfo', response.data.data)
          commit('setPermi')
          resolve(response.data.data)
        }).catch(error => { reject(error) })
      })
    }
  },
  modules: {
    namespaced: true,
    click,
    dictionary
  }
})
