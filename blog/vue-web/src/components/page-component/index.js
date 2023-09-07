import Vue from 'vue'
// 按目录全局注册组件
// 页面组件
const requirePageComponent = require.context(
  './',
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
