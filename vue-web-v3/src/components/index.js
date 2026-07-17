// 按目录全局注册组件
// 页面组件
export default {
  install: (app) => {
    const modules = import.meta.glob('./**/*.vue', { eager: true })
    Object.keys(modules).forEach(fileName => {
      // 获取组件配置
      const componentConfig = modules[fileName]
      if (componentConfig.default) {
        // 为没有name属性的组件生成一个默认的name属性
        let componentName = componentConfig.default.name
        if (!componentName) {
          // 从文件名中提取组件名
          const match = fileName.match(/([^/]+)\.vue$/)
          if (match) {
            // 将kebab-case转换为PascalCase
            componentName = match[1].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')
          }
        }
        if (componentName) {
          app.component(
            componentName,
            componentConfig.default
          )
        }
      }
    })
  }
}
