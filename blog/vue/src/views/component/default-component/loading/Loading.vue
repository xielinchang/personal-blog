<template>
  <div>
    <div
      class="loading-shadow"
      :style="{ display: isshow }"
      @touchmove.prevent
      @mousewheel.prevent
    ></div>
    <div
      class="loading"
      :style="{ display: isshow }"
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
  props: ['isshow'],
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
      ]
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
    }, 300)
  }
}
</script>

<style scpoed lang="scss">
.loading-shadow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh);
  background: rgb(0, 0, 0);
  opacity: 0.6;
  z-index: 9999;
}
.loading {
  width: 30%;
  height: 150px;
  border-radius: 15px;
  line-height: 150px;
  position: fixed;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);
  justify-content: center;
  text-align: center;
  z-index: 99999;
  & .dot {
  background-color: rgb(255, 166, 0);
  display: inline-block;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin: 0 10px;
  z-index: 99999;
  transition: 600ms;
  text-align: center;
  line-height: 48px;
  color: white;
  font-size: 24px;
  font-weight: 600;
}
}

</style>
