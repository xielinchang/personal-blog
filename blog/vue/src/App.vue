<template>
  <div
    id="app"
  > <back-top icon-name="rocket"></back-top>
    <head-tab></head-tab>
    <left-menu></left-menu>
    <keep-alive include="">
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
import { getUserIp } from '@/api/api'
export default {
  name: 'App',
  data() {
    return {
      loadingshow: 'block'
    }
  },
  created() {
    // 存取用户ip
    getUserIp().then((res) => {
      sessionStorage.setItem('ip', res.data.ip)
    })
  },
  mounted() {
    var that = this
    // loading组件
    setTimeout(function () {
      that.loadingshow = 'none'
    }, 0)
  },
  methods: {
  }
}
</script>
<style>
*{
  padding: 0;
  margin: 0;
}
</style>
<style lang="scss" scoped>
body {
  padding: 0;
  margin: 0;
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #72d0eb;
  }
  &::-webkit-scrollbar-track {
    border-radius: 6px;
    background: rgba(253, 129, 245, 1);
  }
  .live2d-widget-container {
  margin-left: 30px;
  transform: scale(1);
  opacity: 1;
  z-index: 9999;
}
}

</style>
