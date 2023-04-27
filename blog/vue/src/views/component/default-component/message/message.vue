<template>
  <transition
    name="msg-fade"
    @after-leave="handleAfterLeave"
  >
    <div
      v-show="visible"
      class="message"
      :class="'message-'+type"
      :style="positionStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="icon-box">
        <svg-icon
          size="18px"
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
  danger: 'circle-close-filled',
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
          return ['info', 'success', 'warning', 'danger'].indexOf(value) !== -1
        },
        default: 'info'
      },
      content: '',
      duration: 4000,
      closed: false,
      onClose: null,
      timer: null,
      verticalOffset: 30
    }
  },
  mounted () {
    this.icon = classMap[this.type]
    this.startTimer()
    document.addEventListener('keydown', this.keydown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown)
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false
      }
    }
  },
  computed: {
    positionStyle() {
      return {
        'top': `${this.verticalOffset}px`
      }
    }
  },
  methods: {
    close() {
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
    },
    handleAfterLeave() {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },
    clearTimer() {
      clearTimeout(this.timer)
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close()
          }
        }, this.duration)
      }
    },
    keydown(e) {
      if (e.keyCode === 27) { // esc关闭消息
        if (!this.closed) {
          this.close()
        }
      }
    }
  }

}

export default Msg
</script>

<style scoped lang='scss'>
@import './message.scss';
</style>
