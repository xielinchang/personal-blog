<template>
  <div class="body">
    <img
      class="e-bg-img"
      :src="bgimg"
    >
    <div
      class="back-home"
      :title="'返回主页'"
    >
      <img
        src="@/assets/icon/左箭头.png"
        alt=""

        @click="backHome()"
      >
    </div>
    <div class="e-main-body">
      <div class="e-main-container">
        <div class="e-banner">
          <div class="baner-mark">
            <div
              class="mark"
              :style="{'backgroundImage':`url(${essayForm.coverUrl})`}"
            ></div>
            <div class="shadow-mark"></div>
            <div
              class="e-banner-img"
              :style="{'backgroundImage':`url(${essayForm.coverUrl})`}"
            ></div>
          </div>
          <MyBuble class="buble"></MyBuble>
          <div class="e-banner-tit-box">
            <div class="e-banner-title">{{ essayForm.title }}</div>
            <div class="e-banner-line"></div>
            <div class="e-banner-subtitle">{{ essayForm.subtitle }}</div>
          </div>
        </div>
        <div class="e-main-page">
          <div
            v-if="essayForm.digest!==''"
            class="digest-tit"
          >
            <span>摘要</span>
          </div>
          <div
            v-if="essayForm.digest!==''"
            class="digest"
          >
            <div class="digest-content">{{ essayForm.digest }}</div>
          </div>
          <div
            v-if="essayForm.digest!==''"
            class="essay-tit"
          >
            <span>内容</span>
          </div>
          <div class="essay">
            <div
              class="essay-content"
              v-html="essayForm.html"
            ></div>
          </div>
        </div>
        <RightTab
          width="25"
          height="500"
          class="essay-right-tab"
        ></RightTab>
      </div>

    </div>

  </div>
</template>

<script>
import { bg } from '@/api/api'
import { essayQuery } from '@/api/essayapi'
export default {
  name: 'EssayPage',
  data () {
    return {
      essayForm: {
        coverUrl: '',
        title: '',
        subtitle: '',
        digest: '',
        html: ''
      },
      bgimg: ''
    }
  },

  mounted() {
    const _this = this
    this.date = this.getTime()
    setInterval(() => {
      _this.date = this.getTime()
    }, 1000)
    document.documentElement.scrollTop = 0
    this.initEssay()
    this.initBg()
  },
  methods: {
    initEssay() {
      var that = this
      var id = this.$route.query.id
      essayQuery({
        limit: 1,
        offset: 1,
        query: {
          id: id * 1,
          title: undefined,
          subtitle: undefined,
          domain: undefined
        }
      }).then(res => {
        res.data.rows[0].coverUrl = process.env.VUE_APP_BASE_API + res.data.rows[0].coverUrl
        that.essayForm = res.data.rows[0]
      })
    },
    initBg() {
      bg().then(res => {
        console.log(res)
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
    backHome() {
      this.$router.push('/')
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
<!-- 头部,框架和e-banner -->
<style scoped>
.body{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height:auto;
}
.back-home{
  width: 35px;
  height: 35px;
  overflow: hidden;
  position: fixed;
  top: 133px;
  left: 140px;
  border-radius: 12px;
  z-index: 9999;
}
.back-home img{
  width: 100%;
  height: 100%;
}
.back-home img:hover{
  transform: scale(1.1);
  transition: 300ms;
}
.e-main-body{
  width: 85%;
  min-width: 1200px;
  margin:auto;
  margin-top: 90px;
  min-height: 1500px;
  height: auto;
  overflow: hidden;
  position: relative;
  border-radius: 12px;
  box-shadow: 0 0 0 2px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
}
.e-banner{
  min-width: 100%;
  width: 100%;
  margin: auto;
  height: 330px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  top: 30px;
}
.e-banner-mark{
  min-width: 100%;
  width: 100%;
  height: 330px;
  position: absolute;
  top: 0;
  left: 0;
}
.mark{
  position: absolute;
  min-width: 100%;
  width: 100%;
  height: 330px;
  background-size: cover;
  background-position-y: center;
  background-position-x: center;
  filter: blur(8px);
  opacity: 0.8;
  z-index: 1;
}
.shadow-mark{
  width: 100%;
  height: 330px;
  position: absolute;
  background: rgb(153, 153, 153);
  opacity: 0.8;
}
.e-banner-img{
  width: 250px;
  height: 250px;
  position: absolute;
  right: 50px;
  top: 40px;
  background-size: cover;
  background-position-y: center;
  background-position-x: center;
  background-repeat: no-repeat;
  z-index: 3;
  border-radius: 12px;
  box-shadow:0 0 0 2px rgb(255 255 255 / 40%) inset, 0 13px 15px rgb(31 45 61 / 15%);
}

.e-banner-tit-box{
  width: 880px;
  height: 200px;
  z-index: 99;
  position: absolute;
  top: 100px;
  padding-left: 50px;
}
.e-banner-subtitle{
  width: 300px;
  height: 25px;
  position: absolute;
  top: 20px;
  color: white;
  text-shadow: 0 2px 2px rgb(0 0 0 / 30%);
  opacity: .75;
}
.e-banner-line{
  width: 30px;
  height: 1px;
  background: rgb(255, 255, 255,0.6);
  position: absolute;
  top: 50px;
  box-shadow: 0 2px 2px rgb(0 0 0 / 30%);
  opacity: .75;
}
.e-banner-title{
  width: 90%;
  height: 100px;
  position: absolute;
  top: 60px;
  font-weight: 400;
  font-size: 32px;
  font-family: YouYuan;
  text-shadow: 0 3px 5px rgb(0 0 0 / 30%);
  color: white;
  line-height: 60px;
}
.buble{
  position: absolute;
  bottom: 0;
  z-index: 100;
}
.e-main-container{
  width: 85%;
  min-height: 1500px;
  height: auto;
  position: relative;
  margin: auto;
}
.e-main-page{
  top: 400px;
  width: 73%;
  height: auto;
  /* background: rgb(255, 255, 255,0.3); */
  border-radius: 12px;
  box-sizing: border-box;
  margin-top: 50px;
  overflow-x: hidden;
  overflow-y: hidden;
}
.e-main-page img{
  max-width: 85%;
  margin-left: 8%;
  margin-top: 30px;
  border-radius: 12px;
}
.e-main-page span{
  font-family: 'STkaiti';
}
.essay-right-tab{
  position: absolute;
  right: 0;
  top: 400px;
}
.left-menu{
  position: absolute;
  z-index: 9999;
}
.digest-tit,.essay-tit{
  width: 80px;
  height: 40px;
  line-height: 40px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.7);
  font-size: 22px;
  font-weight: 600;
  color: rgb(0, 0, 0);
  position: relative;
  text-align: center;
  color: rgb(0, 128, 128);
}
.essay-tit{
  color: rgb(191, 105, 0);
}
.digest{
  width: 100%;
  height: auto;
  min-height: 50px;
  border-radius: 12px;
  background: rgb(255, 255, 255,0.95);
  z-index: 2;
  position: relative;
  box-shadow: 0 0 0 2px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
  margin-left: 0px;
  padding-bottom: 15px;
  padding-right: 0px;
  margin-top: 15px;
  margin-bottom: 14px;
}
.essay{
  width: 100%;
  min-height: 500px;
  height: auto;
  background: rgba(255, 255, 255, 0.95);
  z-index: 2;
   border-radius: 12px;
  position: relative;
  margin-top: 30px;
  box-shadow: 0 0 0 2px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
   margin-left: 0px;
  padding-bottom: 15px;
  padding-right: 0px;
  margin-top: 15px;
  margin-bottom: 30px;
}
.digest-shadow {
  position: absolute;
  width: 98%;
  margin-left: 1%;
  height: 20px;
  background: -webkit-linear-gradient(top, white, #e0e6ed);
  border-radius: 10px;
  z-index: 100;
  content: "";
}
.digest-shadow-two {
  position: absolute;
  bottom: 0;
  width: 98%;
  margin-left: 1%;
  height: 10px;
  filter: blur(1px);
  background: -webkit-linear-gradient(bottom, #f2f5f7, #e0e6ed);
  border-radius: 10px;
  z-index: 100;
  content: "";
}
.digest-content ,.essay-content{
  width: 95%;
  height: auto;
  min-height: 50px;
  text-align: left;
  text-shadow: 0 1px rgb(255 255 255 / 50%);
  color: #5d6b7d;
  padding: 1px 15px;
}
.digest-content{
  text-align: left;
  line-height: 40px;
  font-size: 22px;
  font-family: 'STkaiti';
  color: rgb(0, 0, 0);
}
.e-bg-img{
    width: 100%;
    height: calc(105vh);
    position: fixed;
    top: 0;
    left: 0;
}
</style>
<style>

</style>

