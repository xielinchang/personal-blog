import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入全局CSS
import '@/assets/css/public.css'
import '@/assets/scss/index.scss'
import './components/default-component'

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})

