import Vue from 'vue'

// 注册全局自定义指令 v-draggable
Vue.directive('draggable', {
  bind(el, binding) {
    let topoX = 0
    let topoY = 0
    el.style.cursor = 'move'
    el.onmousedown = (e) => {
      const startX = e.clientX
      const startY = e.clientY
      const transformMatrix = new DOMMatrix(window.getComputedStyle(el).getPropertyValue('transform'))
      const currentTranslateX = transformMatrix.m41 // 获取当前的移动坐标
      const currentTranslateY = transformMatrix.m42
      const currentScale = transformMatrix.a // 获取当前的缩放比例
      function throttle(func, delay) {
        let timeout
        return function (...args) {
          if (!timeout) {
            timeout = setTimeout(() => {
              func.apply(this, args)
              timeout = null
            }, delay)
          }
        }
      }
      const onMouseMove = (e) => {
        const offsetX = e.clientX - startX
        const offsetY = e.clientY - startY
        topoX = currentTranslateX + offsetX
        topoY = currentTranslateY + offsetY
        el.style.transform = `translate(${topoX}px, ${topoY}px) scale(${currentScale})`
      }
      throttle(onMouseMove, 16)

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }
  }
})
// 注册全局自定义指令 v-scalable
Vue.directive('scalable', {
  bind(el, binding) {
    el.style.cursor = 'move'
    el.onwheel = (e) => {
      const transformMatrix = new DOMMatrix(window.getComputedStyle(el).getPropertyValue('transform'))
      const currentTranslateX = transformMatrix.m41
      const currentTranslateY = transformMatrix.m42
      const currentScale = transformMatrix.a
      let scale = currentScale * 100
      scale += e.wheelDelta / 10
      if (scale < 20) {
        scale = 20
      }
      if (scale > 300) {
        scale = 300
      }
      if (scale > 0) {
        scale = scale / 100
        el.style.transform = `translate(${currentTranslateX}px, ${currentTranslateY}px) scale(${scale})`
      }
      return false
    }
  }
})
