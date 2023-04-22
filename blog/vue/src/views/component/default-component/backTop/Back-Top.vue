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
      if (scrollTop > 100) {
        this.btnShow = true
      } else {
        this.btnShow = false
      }
    },
    backTop() {
      const timer = setInterval(function () {
        const backTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        const speedTop = backTop / 10
        document.documentElement.scrollTop = backTop - speedTop
        if (backTop <= 10) {
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
