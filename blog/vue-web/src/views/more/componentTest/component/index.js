import Vue from 'vue'
const requireComponent = require.context(
  './', // 组件所在目录
  false, // 是否查询子目录
  /\.vue$/ // 匹配组件文件名的正则表达式
)

function registerComponent() {
  requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)
    const componentName = fileName.replace(/^\.\//, '').replace(/\.vue$/, '')
    Vue.component(componentName, componentConfig.default || componentConfig)
  })
}

registerComponent()
