import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'animate.css'
import VEmojiPicker from 'v-emoji-picker'
import './assets/scss/index.scss'
import msg from './components/default-component/message/index'
import msgBox from './components/default-component/messageBox/index'
import VueLazyload from 'vue-lazyload'

Vue.use(VEmojiPicker) // 表情包插件
Vue.prototype.$msg = msg // 注册消息事件
Vue.use(msgBox) // 注册消息框事件
Vue.use(VueLazyload, { // 图片懒加载
  preLoad: 1.3,
  error: require('./assets/images/loading.gif'),
  loading: require('./assets/images/loading.gif'),
  attempt: 1
})
// 按目录全局注册组件
const requirePageComponent = require.context(
  './components/page-component',
  true,
  /\.vue$/
)
requirePageComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requirePageComponent(fileName)
  Vue.component(
    componentConfig.default.name,
    componentConfig.default
  )
})
const requireDefaultComponent = require.context(
  './components/default-component',
  true,
  /\.vue$/
)
requireDefaultComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireDefaultComponent(fileName)
  Vue.component(
    componentConfig.default.name,
    componentConfig.default
  )
})

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')

