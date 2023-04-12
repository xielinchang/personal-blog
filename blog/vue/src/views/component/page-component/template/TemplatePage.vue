<template>
  <div
    class="template"
  >
    <img
      v-lazy="bgimg"
      class="bg-img"
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
      isday: '',
      bgArr: []
    }
  },
  mounted() {
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
    getdayTime() {
      var date1 = new Date()
      var hours = date1.getHours()
      return hours
    }
  }
}
</script>
<style lang="scss" scoped>
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
