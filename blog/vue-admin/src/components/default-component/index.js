import Vue from 'vue'
// 引入svg图标组件
import SvgIcon from '@/components/SvgIcon.vue'
Vue.component('svg-icon', SvgIcon)

const requireDefaultComponent = require.context(
    './',
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