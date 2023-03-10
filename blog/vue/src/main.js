import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'animate.css'
import VEmojiPicker from 'v-emoji-picker'
import './assets/scss/index.scss'
import msg from './views/component/default-component/message/index'
Vue.prototype.$msg = msg
import msgBox from './views/component/default-component/messageBox/index'
Vue.use(msgBox)

const requirePageComponent = require.context(
  './views/component/page-component',
  true,
  /\.vue$/
)
requirePageComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requirePageComponent(fileName)
  // 全局注册组件
  Vue.component(
    componentConfig.default.name,
    componentConfig.default
  )
})
const requireDefaultComponent = require.context(
  './views/component/default-component',
  true,
  /\.vue$/
)
requireDefaultComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireDefaultComponent(fileName)
  // // 全局注册组件
  Vue.component(
    componentConfig.default.name,
    componentConfig.default
  )
})
Vue.use(VEmojiPicker)
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
