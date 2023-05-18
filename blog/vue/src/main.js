import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'animate.css'
import VEmojiPicker from 'v-emoji-picker'
import './assets/scss/index.scss'
// import './utils/localStorage'
import msg from './views/component/default-component/message/index'
Vue.prototype.$msg = msg
import msgBox from './views/component/default-component/messageBox/index'
Vue.use(msgBox)
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/images/loading.gif'),
  loading: require('./assets/images/loading.gif'),
  attempt: 1
})
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

