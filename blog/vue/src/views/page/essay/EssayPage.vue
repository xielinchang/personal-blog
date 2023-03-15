<template>
  <div class="body">
    <img
      class="bg-img"
      :src="bgimg"
    >
    <div
      class="back-home"
      :title="'返回主页'"
    >
      <svg-icon
        color="#F39800"
        icon-name="back"
        size="35px"
        @click="backHome()"
      />
    </div>
    <div class="main-body">
      <div class="main-container">
        <div class="banner">
          <div class="baner-mark">
            <div
              class="mark"
              :style="{'backgroundImage':`url(${essayForm.coverUrl})`}"
            ></div>
            <div class="shadow-mark"></div>
            <div
              class="banner-img"
              :style="{'backgroundImage':`url(${essayForm.coverUrl})`}"
            >
            </div>
          </div>
          <MyBuble class="buble"></MyBuble>
          <div class="banner-tit-box">
            <div class="banner-title">{{ essayForm.title }}</div>
            <div class="banner-line"></div>
            <div class="banner-subtitle">{{ essayForm.subtitle }}</div>
          </div>

        </div>
        <div class="main-page">
          <div
            v-if="essayForm.digest!==''"
            class="digest-tit"
          >
            <span>摘要</span>
          </div>
          <div
            v-if="essayForm.digest!==''"
            class="digest shadow-demo"
          >
            <div class="digest-content">{{ essayForm.digest }}</div>
          </div>
          <div
            class="essay-tit"
          >
            <span>内容</span>
          </div>
          <div class="essay shadow-demo">
            <div
              class="essay-content"
              v-html="essayForm.html"
            ></div>
            <div class="operation shadow-demo">
              <div
                class="good-icon"
                @click="isGood=!isGood"
              >
                <svg-icon
                  v-if="isGood"
                  icon-name="good-filled"
                  size="20px"
                  color="#ffa109"
                ></svg-icon>
                <svg-icon
                  v-else
                  icon-name="good"
                  size="20px"
                  color="#666"
                ></svg-icon>
                {{ essayData.good }}
              </div>
              <div
                class="collect-icon"
                @click="isCollect=!isCollect"
              >
                <svg-icon
                  v-if="isCollect"
                  icon-name="collect-filled"
                  size="20px"
                  color="#ffa109"
                ></svg-icon>
                <svg-icon
                  v-else
                  color="#666"
                  icon-name="collect"
                  size="20px"
                ></svg-icon>
                {{ essayData.collect }}
              </div>
              <div
                class="comment-icon"
                @click="publishShow=!publishShow"
              >
                <svg-icon
                  color="#666"
                  icon-name="comment"
                  size="20px"
                ></svg-icon>
                {{ essayData.comment }}
              </div>
            </div>
          </div>
          <div
            class="comment-tit"
          >
            <span>评论</span>
          </div>
          <div class="comment shadow-demo">
            <div
              :class="publishShow?'':'c-publish-close'"
              class="c-publish"
            >
              <textarea
                id="input"
                v-model="publishContent"
                placeholder="请输入评论，最多不超过200字"
                rows="5"
                maxlength="200"
                @click="showDialog = false"
              ></textarea>
              <div
                class="emoji-btn"
                @click="emojiShow"
              >
                Emoji😃
              </div>
              <div
                class="c-publish-btn"
              >
                <svg-icon
                  class="publish-icon"
                  icon-name="publish"
                  size="24px"
                  color="#00B753"
                />
                <span>发布</span>
              </div>
              <VEmojiPicker
                v-show="showDialog"
                class="emoji-picker"
                @select="selectEmoji"
              />

            </div>
            <ul class="comment-list">
              <li class="shadow-demo">
                <div class="c-portrait"></div>
                <div class="c-top">
                  <div class="c-name"></div>
                  <div class="c-publish-time"></div>
                </div>

                <div class="c-address"></div>
                <div class="c-msg"></div>
              </li>
            </ul>
          </div>
        </div>
        <RightTab
          width="25"
          height="500"
          class="right-tab"
        ></RightTab>
      </div>

    </div>
  </div></template>

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
      bgimg: '',
      isGood: false,
      isCollect: false,
      essayData: {
        good: 0,
        collect: 0,
        comment: 0
      },
      publishShow: false,
      showDialog: false,
      publishContent: ''
    }
  },
  watch: {
    '$route.path': function(to, from) {
      this.initPage()
    }
  },
  mounted() {
    this.initPage()
  },
  methods: {
    selectEmoji(emoji) {// 选择emoji后调用的函数
      const input = document.getElementById('input')
      const startPos = input.selectionStart
      const endPos = input.selectionEnd
      const resultText = input.value.substring(0, startPos) + emoji.data + input.value.substring(endPos)
      input.value = resultText
      setTimeout(function() {
        input.focus()
      }, 200)
      input.selectionStart = startPos + emoji.data.length
      input.selectionEnd = endPos + emoji.data.length
      this.publishContent = resultText
    },
    emojiShow() {
      this.showDialog = !this.showDialog
      const input = document.getElementById('input')
      input.value = input.value.substring(0, input.length)
    },
    emojiPickerOff() {
      this.showDialog = false
    },
    initPage() {
      const _this = this
      this.date = this.getTime()
      setInterval(() => {
        _this.date = this.getTime()
      }, 1000)
      document.documentElement.scrollTop = 0
      this.initEssay()
      this.initBg()
    },
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
        console.log(res)
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
<!-- 头部,框架和banner -->
<style scoped lang="scss">
@import './scss/EssayPage.scss';
</style>
