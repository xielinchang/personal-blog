import Vue from 'vue'
import Vuex from 'vuex'
import { click } from './modules/click'
import { dictionary } from './modules/dictionary'
import { getUserInfo } from '@/api/default/user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}, // visitor,user,admin,superAdmin
    loginInvalidBox: false // 登录失效盒子，只要显示一次
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
    click,
    dictionary
  }
})
