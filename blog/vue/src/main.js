import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import live2d4vue from 'live2d4vue'
import VueParticles from 'vue-particles'
import Wow from 'wowjs'
import 'animate.css'
import 'wowjs/css/libs/animate.css'
import VEmojiPicker from 'v-emoji-picker'
import './assets/scss/main.scss'
import './icons/index'
Vue.use(VueParticles)
Vue.use(VEmojiPicker)
Vue.use(elementui)
Vue.use(live2d4vue)
Vue.prototype.$wow = Wow
new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
/* 重写localStorage方法 */
var orignalSetItem = localStorage.setItem
localStorage.setItem = function(key, newValue) {
  // 要监听的key
  if (key === 'name') {
    var setName = new Event('setName')
    setName.newValue = newValue
    window.dispatchEvent(setName)
    orignalSetItem.apply(this, arguments)
  }
  if (key === 'token') {
    var setToken = new Event('setToken')
    setToken.newValue = newValue
    window.dispatchEvent(setToken)
    orignalSetItem.apply(this, arguments)
  }
  if (key === 'identity') {
    var setIdentity = new Event('setIdentity')
    setIdentity.newValue = newValue
    window.dispatchEvent(setIdentity)
    orignalSetItem.apply(this, arguments)
  }
  if (key === 'portrait_url') {
    var portrait_url = new Event('portrait_url')
    portrait_url.newValue = newValue
    window.dispatchEvent(portrait_url)
    orignalSetItem.apply(this, arguments)
  }
}
