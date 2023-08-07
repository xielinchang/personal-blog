<template>
  <div
    id="app"
  >
    <my-loading :load-show="$store.state.loadShow"></my-loading>
    <right-button></right-button>
    <head-tab></head-tab>
    <left-menu></left-menu>
    <click v-if="$store.state.clickShow"></click>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
import { getUserIp } from '@/api/default/index'
import { baiduLocation } from '@/api/baidu/baiduapi'
export default {
  name: 'App',
  data() {
    return {
    }
  },
  watch: {
    $route() {
      this.initTitle()
    }
  },
  created() {
    // 存取用户ip
    getUserIp().then((res) => {
      sessionStorage.setItem('ip', res.data.ip)
    })
  },
  mounted() {
    var _this = this
    this.setSkin()
    this.getIp()
    this.initTitle()
  },
  methods: {
    getIp() {
      var _this = this
      getUserIp().then(res => {
        _this.ip = res.data.ip
        _this.initAddress()
      })
    },
    initTitle() {
      // 判断是否有用户信息，有则显示用户信息的标题
      this.$store.dispatch('getUserInfo').then(user => {
        document.title = user.name + ' の blog'
      }).catch(_ => {
        document.title = this.$route.meta.name || 'Blog'
      })
    },
    setSkin() {
      // 全局色系
      const data = this.$store.state.skinStore.state.skin
      // 将数据转换为CSS变量
      const dataArray = data.split(';').filter(item => item.trim() !== '')

      dataArray.forEach(item => {
        const [key, value] = item.split(':')
        document.documentElement.style.setProperty(key, value)
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
