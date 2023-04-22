<template>
  <div
    id="app"
  > <back-top
      icon-name="rocket"
      left-title="返回顶部"
    ></back-top>
    <head-tab></head-tab>
    <left-menu></left-menu>
    <click v-if="$store.state.clickShow"></click>
    <my-loading load-time="0ms"></my-loading>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
import { getUserIp } from '@/api/api'
import { baiduLocation } from '@/api/baiduapi'
export default {
  name: 'App',
  data() {
    return {
      loadingshow: 'block',
      clickShow: true
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
    this.clickShow = this.$store.state.clickShow
    this.getIp()
  },
  methods: {
    getIp() {
      var _this = this
      getUserIp().then(res => {
        _this.ip = res.data.ip
        _this.initAddress()
      })
    },
    initAddress() {
      var _this = this
      if (this.ip === '127.0.0.1') {
        this.ip = ''
      }
      baiduLocation(String(this.ip)).then(res => {
        localStorage.setItem('address', res.data.content.address)
      })
    }
  }
}
</script>
<style>
*{
  padding: 0;
  margin: 0px;
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
}

</style>
