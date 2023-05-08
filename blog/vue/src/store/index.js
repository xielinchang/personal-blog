import Vue from 'vue'
import Vuex from 'vuex'
import { click } from './modules/click'
import { dictionary } from './modules/dictionary'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    namespaced: true,
    click,
    dictionary
  }
})
