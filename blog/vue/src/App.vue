<template>
  <div
    id="app"
  >
    <right-button></right-button>
    <head-tab></head-tab>
    <left-menu></left-menu>
    <click v-if="$store.state.click.clickShow"></click>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
import { getUserIp } from '@/api/api'
import { baiduLocation } from '@/api/baiduapi'
import { getToken } from './utils/author'
export default {
  name: 'App',
  data() {
    return {
    }
  },
  created() {
    // 存取用户ip
    getUserIp().then((res) => {
      sessionStorage.setItem('ip', res.data.ip)
    })
  },
  mounted() {
    // if (!getToken()) {
    //   setTimeout(() => {
    //     this.$msg({
    //       content: '登录已过期',
    //       type: 'info'
    //     })
    //   }, 2000)
    // }
    var that = this
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
}

</style>
