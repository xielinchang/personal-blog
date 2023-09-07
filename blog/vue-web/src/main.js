import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'animate.css'
import VEmojiPicker from 'v-emoji-picker'
import './assets/scss/index.scss'
import VueLazyload from 'vue-lazyload'
import './components'
Vue.use(VEmojiPicker) // 表情包插件

Vue.use(VueLazyload, { // 图片懒加载
  preLoad: 1.3,
  error: require('./assets/images/loading.gif'),
  loading: require('./assets/images/loading.gif'),
  attempt: 1
})

// 挂载
new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')

