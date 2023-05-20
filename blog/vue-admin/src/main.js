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
// 引入svg图标组件
import SvgIcon from '@/components/SvgIcon.vue'
Vue.component('svg-icon', SvgIcon)
const requireDefaultComponent = require.context(
    './components/default-component',
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
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})

