import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/scss/index.scss'
import VueLazyload from 'vue-lazyload'
import components from './components'
import JoydDemo from 'joyd-demo';
import '../node_modules/joyd-demo/style.css'
import 'animate.css'

let Wow:any = null

const loadWowjs = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/wowjs@1.1.3/dist/wow.min.js'
    script.onload = () => {
      Wow = window.WOW
      resolve()
    }
    script.onerror = reject
    document.head.appendChild(script)
  })
}

import { search } from './utils/svgTxt'

const Icon = 'data:image/svg+xml;base64,' + btoa(search)

const app = createApp(App)
const pinia = createPinia()
app.use(JoydDemo?.default);
app.use(router)
app.use(pinia)
app.use(components)
app.use(VueLazyload, {
  preLoad: 1.3,
  error: Icon,
  loading: Icon,
  attempt: 3
})
app.config.globalProperties.$axios = axios

loadWowjs().then(() => {
  if (Wow) {
    app.config.globalProperties.$wow = Wow
    window.$wow = Wow
    new Wow({ live: false }).init()
  }
}).catch((error) => {
  console.error('Failed to load wowjs:', error)
})

app.mount('#app')
