<template>
  <IconButton
    v-show="btnShow"
    class="back-top"
    :class="direction"
    icon="rocket"
    @click.native="backTop()"
  >
  </IconButton>
</template>

<script>
import iconButton from '../iconButton/iconButton.vue'
export default {
  name: 'BackTop',
  components: {
    iconButton
  },
  props: {
    color: {
      type: String,
      default: '#409EFF'
    },
    // 当滚到多少距离时，按钮出现
    scrollHeight: {
      type: [Number, String],
      default: 300
    },
    iconName: {
      type: String,
      default: 'caret-top'
    },
    direction: {
      validator: function (value) {
        return ['left', 'right'].indexOf(value) !== -1
      },
      default: 'right'
    }
  },
  data () {
    return {
      btnShow: false
    }
  },

  created() {
    // 添加滚动监听事件
    // 在窗口滚动时调用监听窗口滚动方法
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > this.scrollHeight) {
        this.btnShow = true
      } else {
        this.btnShow = false
      }
    },
    // 阻止滚动事件
    disableScroll() {
      document.addEventListener('wheel', this.preventDefault, { passive: false })
    },
    // 开启滚动事件
    enableScroll() {
      document.removeEventListener('wheel', this.preventDefault, { passive: false })
    },
    preventDefault(e) {
      e.preventDefault()
    },
    backTop() {
      var _this = this
      const timer = setInterval(function () {
        _this.disableScroll()
        const backTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        const speedTop = backTop / 10
        document.documentElement.scrollTop = backTop - speedTop
        if (backTop <= 10) {
          _this.enableScroll()
          clearInterval(timer)
        }
      }, 10)
    },
    destroyed () {
      window.removeEventListener('scroll', this.onScroll)
    }
  }
}
</script>

<style scoped lang="scss">
@import './Back-Top.scss';
</style>
