<template>
  <div class="template">
    <img
      class="bg-img"
      :src="bgimg"
    >
    <div class="template-body">
    </div>
  </div>
</template>

<script>
import { bg } from '@/api/api'
export default {
  name: 'TemplatePage',
  data() {
    return {
      bgimg: '',
      date: '',
      isday: '',
      bgArr: []
    }
  },
  mounted() {
    const _this = this
    this.date = this.getTime()
    setInterval(() => {
      _this.date = this.getTime()
    }, 1000)
    this.initBg()
  },
  methods: {
    initBg() {
      bg().then(res => {
        this.isday = this.getdayTime() * 1
        if (this.isday >= 5 && this.isday < 17) {
          this.bgimg = process.env.VUE_APP_BASE_API + res.data[0].url
        } else if (this.isday >= 17 && this.isday <= 18) {
          this.bgimg = process.env.VUE_APP_BASE_API + res.data[1].url
        } else {
          this.bgimg = process.env.VUE_APP_BASE_API + res.data[2].url
        }
      })
    },
    addzero(item) {
      return item < 10 ? '0' + item : item
    },
    getTime() {
      var date1 = new Date()
      var year = date1.getFullYear()
      var month = date1.getMonth() + 1
      var day = date1.getDate()
      var hours = date1.getHours()
      var minutes = date1.getMinutes()
      var seconds = date1.getSeconds()
      return year + '年' + this.addzero(month) + '月' + this.addzero(day) + '日' + this.addzero(hours) + ':' + this.addzero(minutes) + ':' + this.addzero(seconds)
    },
    getdayTime() {
      var date1 = new Date()
      var hours = date1.getHours()
      return hours
    }
  }
}
</script>
<style>
.template{
  width: 100%;
  height: auto;
  position: fixed;
    top: 0;
    left: 0;
}
.bg-img{
    width: 100%;
    height: calc(105vh);
    position: fixed;
    top: 0;
    left: 0;
}
.head-tab{
  width: 100%;
}
.template-body {
  width: 100%;
  margin: auto;
  height: 1500px;
  overflow: hidden;
  box-shadow: 0 0 0 1px rgb(255 255 255 / 40%) inset,
0 13px 15px rgb(31 45 61 / 15%);
}
.bubbles{
  position: fixed;
  bottom: 0;
}
</style>
