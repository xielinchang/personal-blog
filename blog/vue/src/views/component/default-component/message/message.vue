<template>
  <transition name="msg-fade">
    <div
      v-show="visible"
      class="message"
      :class="'message-'+type"
    >
      <div class="icon-box">
        <svg-icon
          size="24px"
          :icon-name="icon"
          class="icon"
          :class="'icon-'+type"
          color=""
        ></svg-icon>
      </div>
      <div
        class="content"
      >
        <slot>
          {{ content }}
        </slot>
      </div>
    </div>
  </transition>
</template>
<script>
const classMap = {
  info: 'info-filled',
  success: 'circle-check-filled',
  warning: 'warning-filled',
  error: 'circle-close-filled',
  loading: 'loading'
}
export const types = Object.keys(classMap)
const Msg = {
  name: 'message',
  data() {
    return {
      icon: '',
      visible: false,
      type: {
        validator: function (value) {
          return ['info', 'success', 'warning', 'error', 'loading'].indexOf(value) !== -1
        },
        default: 'info'
      },
      content: ''
    }
  },
  mounted () {
    this.icon = classMap[this.type]
  },
  install(Vue) {
    Vue.prototype.$msg = (config) => { // 通过原型注册一个方法
      const MessageConstructor = Vue.extend(Msg) // 生成一个Vue子类，子类就是这个组件
      const instance = new MessageConstructor({ data: config }) // 生成该子类的实例
      instance.vm = instance.$mount() // 将该实例手动挂载
      document.body.appendChild(instance.vm.$el) // 将实例挂载到body上
      instance.vm.visible = true
    }
  },
  watch: {
    visible(v) {
      var that = this
      if (v) {
        setTimeout(() => {
          that.onClose()
        }, 1000)
      }
    }
  },
  methods: {
    onClose() {
      this.visible = false
      this.$el.parentNode.removeChild(this.$el)
    },
    show() {
      this.visible = true
    },
    onCancle() {
      if (this.cancelBtn) {
        this.cancelBtn.apply(this.content)
      }
      this.onClose()
    }
  }

}

export default Msg
</script>

<style scoped lang='scss'>
@import './message.scss';
</style>
