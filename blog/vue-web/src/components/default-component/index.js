import Vue from 'vue'
import msg from './message'
import msgBox from './messageBox'
Vue.prototype.$msg = msg // 注册消息事件
Vue.use(msgBox) // 注册消息框事件
// 通用组件
const requireDefaultComponent = require.context(
  './',
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

