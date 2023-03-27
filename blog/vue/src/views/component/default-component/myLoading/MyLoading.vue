<template>
  <div v-show="isshow">
    <div
      class="loading-shadow"
      @touchmove.prevent
      @mousewheel.prevent
    ></div>
    <div
      class="loading"
      @touchmove.prevent
      @mousewheel.prevent
    >
      <div
        v-for="(item, index) in dotlist"
        :key="index"
        class="dot"
        :style="{ opacity: item.opacity }"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyLoading',
  props: {
    loadTime: {
      type: [String, Number],
      default: 2500
    },
  },
  data() {
    return {
      dotlist: [
        {
          opacity: 0,
          name: '拼'
        },
        {
          opacity: 0,
          name: '命'
        },
        {
          opacity: 0,
          name: '加'
        },
        {
          opacity: 0,
          name: '载'
        },
        {
          opacity: 0,
          name: '中'
        },
        {
          opacity: 0,
          name: '!'
        }
      ],
      isshow: true
    }
  },
  mounted() {
    var that = this
    var k = 0
    setInterval(function () {
      that.dotlist[k].opacity = -1
      k++
      setTimeout(function () {
        that.dotlist[k].opacity = 1
      })

      if (k === 6) {
        k = 0
      }
    }, 200)
    setTimeout(() => {
      that.isshow = false
    }, this.loadTime)
  }
}
</script>

<style scpoed lang="scss">
@import './MyLoading.scss';
</style>
