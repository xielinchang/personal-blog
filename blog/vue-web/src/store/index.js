import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { dictionary } from './modules/dictionary'
import { getUserInfo } from '@/api/default/user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    loginInvalidBox: false, // 登录失效盒子，只要显示一次
    isHead: true, // 是显示头部栏还是侧边栏
    clickShow: false // 点击特效
  },
  getters: {
  },
  mutations: {
    setLoginInvalidBox(state, flag) {
      state.loginInvalidBox = flag
    },
    setUserInfo(state, user) {
      state.user = user
    },
    reSetUserInfo(state) {
      state.user = {}
    },
    changeTab(state) {
      state.isHead = !state.isHead
    }
  },
  actions: {
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(async response => {
          commit('setUserInfo', response.data.data)
          resolve(response.data.data)
        }).catch(error => { reject(error) })
      })
    }
  },
  modules: {
    namespaced: true,
    dictionary
  },
  // 数据持久化
  /* 或者在main.js 利用
  store.replaceState(persistedState) 进行持久化 */
  plugins: [
    createPersistedState({
      key: 'isHead',
      paths: ['isHead']
    })
  ]
})

