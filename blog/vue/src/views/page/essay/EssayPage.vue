<template>
  <div class="body">
    <TemplatePage></TemplatePage>
    <div
      class="back-home"
    >
      <svg-icon
        color="#F39800"
        icon-name="back"
        size="35px"
        right-title="返回上个页面"
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
            class="digest shadow-demo"
          >
            <div class="digest-content">
              <div class="digest-head">
                <svg-icon
                  class="digest-icon"
                  color="#1DA9E0"
                  size="20px"
                  icon-name="digest"
                  right-title="摘要"
                ></svg-icon>
                <p>简要的摘要能帮助读者更好的理解文章</p>
              </div>
              {{ essayForm.digest }}
            </div>
          </div>
          <div class="essay shadow-demo">
            <div
              class="essay-content"
              v-html="essayForm.html"
            ></div>
            <div class="operation shadow-demo">
              <div
                class="good-icon"
                @click="addGood"
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
                @click="addCollect"
              >
                <svg-icon
                  v-if="isCollect===true"
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
                {{ commentNum }}
              </div>
            </div>
          </div>
          <div class="comment shadow-demo">
            <div
              :class="publishShow?'':'c-publish-close'"
              class="c-publish"
            >
              <textarea
                id="input"
                v-model="commentForm.message"
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
                @click="publishComment"
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
            <ul
              v-if="commentList.length>0"
              class="comment-list shadow-demo"
            >
              <li
                v-for="(item,index) in commentList"
                :key="index"
              >
                <div class="c-portrait">
                  <img
                    :src="item.portrait"
                    alt=""
                  >
                </div>
                <div class="c-right">
                  <div class="c-top">
                    <div class="c-name">{{ item.name }}</div>
                    <div class="c-address">{{ item.address }}</div>
                  </div>

                  <div class="c-publish-time">{{ item.created_at }}</div>
                  <div class="c-msg">
                    {{ item.message }}
                  </div>
                  <div
                    v-if="identity==='管理员'"
                    class="more"
                  >
                    <svg-icon
                      style="position: absolute"
                      icon-name="delete"
                      size="24px"
                      right-title="删除该条评论"
                      @click="deleteComment(item.id)"
                    ></svg-icon>
                  </div>
                </div>

              </li>
            </ul>
            <div
              v-else
              class="no-comments"
            >
              暂 无 评 论
            </div>
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
// import user from './user.vue'
import { userDetailUpdate, queryUser } from '@/api/user'
import { essayQuery, essayDetailUpdate } from '@/api/essayapi'
import { essayCommentsQuery, essayCommentsCreate, essayCommentsDelete } from '@/api/essayComments'
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
      commentForm: {
        essay_id: '',
        message: '',
        portrait: '',
        name: '',
        address: ''
      },
      isGood: false,
      isCollect: false,
      essayData: {
        id: null,
        essay_id: null,
        good: 0,
        collect: 0
      },
      commentNum: 0,
      publishShow: false,
      showDialog: false,
      commentList: [],
      // 是否为游客
      identity: '',
      // 获取用户的收藏，点赞
      userDetail: {
        id: null,
        collect: '',
        good: '',
        user_id: ''
      },
      // 收藏的文章id列表
      collectIds: [],
      goodIds: [],
      // 用户id
      userId: ''
    }
  },
  watch: {
    '$route.path': function(to, from) {
      this.init()
    }
  },
  created() {
    // 页面高度初始化
    document.documentElement.scrollTop = 0
    this.init()
  },
  methods: {
    init() {
      this.initPage()
      this.initUser()
      this.initEssay()
      this.initComments()
    },
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
      this.message = resultText
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
      // 获取文章id
      this.commentForm.essay_id = this.$route.query.id * 1
      this.essayData.essay_id = this.$route.query.id * 1
    },
    initEssay() {
      var that = this
      essayQuery({
        limit: 1,
        offset: 1,
        query: {
          id: this.commentForm.essay_id * 1,
          title: undefined,
          subtitle: undefined,
          domain: undefined
        }
      }).then(res => {
        if (res.data.rows[0].essay_detail) {
          that.essayData = res.data.rows[0].essay_detail
        } else {
          that.essayData = {
            id: null,
            essay_id: null,
            good: 0,
            collect: 0
          }
        }
        res.data.rows[0].coverUrl = process.env.VUE_APP_BASE_API + res.data.rows[0].coverUrl
        that.essayForm = res.data.rows[0]
        // 修改代码块的背景色
        setTimeout(() => {
          const codePart = document.querySelectorAll('pre')
          for (let i = 0; i < codePart.length; i++) {
            codePart[i].style.background = '#F5F2F0'
            codePart[i].style.borderRadius = '4px'
            codePart[i].style.fontSize = '14px'
            codePart[i].style.padding = '15px'
            codePart[i].style.margin = '10px 0'
            codePart[i].style.color = '#333'
          }
        })
      })
    },
    initComments() {
      essayCommentsQuery({
        limit: 999,
        offset: 1,
        query: {
          essay_id: this.commentForm.essay_id
        }
      }).then(res => {
        this.commentNum = res.data.count
        res.data.rows.forEach(element => {
          element.portrait = process.env.VUE_APP_BASE_API + element.portrait
        })
        this.commentList = res.data.rows
      })
    },
    initUser() {
      this.initPage()
      console.log(localStorage.getItem('userId'))
      this.userId = localStorage.getItem('userId')
      if (this.userId) {
        queryUser({ id: this.userId * 1 }).then(res => {
          this.commentForm.portrait = res.data.user.rows[0].portrait
          this.commentForm.name = res.data.user.rows[0].name
          this.commentForm.address = localStorage.getItem('address')
          this.identity = res.data.user.rows[0].identity
          if (res.data.user.rows[0].user_detail) {
            this.userDetail = res.data.user.rows[0].user_detail
            this.collectIds = this.userDetail.collect.split(',')
            if (this.collectIds.length > 0) {
              this.isCollect = false
              this.collectIds.find((item, index) => {
                if (item * 1 === this.essayData.essay_id * 1) {
                  this.isCollect = true
                }
              })
            }
            this.goodIds = this.userDetail.good.split(',')
            if (this.goodIds.length > 0) {
              this.isGood = false
              this.goodIds.find((item, index) => {
                if (item * 1 === this.essayData.essay_id) {
                  this.isGood = true
                }
              })
            }
          } else {
            this.userDetail.user_id = this.userId * 1
          }
        })
      } else {
        this.$msg({
          content: '用户尚未登录',
          type: 'warning'
        })
      }
    },
    publishComment() {
      if (this.userId) {
        essayCommentsCreate(this.commentForm).then(res => {
          this.initComments()
          this.commentForm.message = ''
        })
      } else {
        this.$msg({
          content: '用户尚未登录',
          type: 'warning'
        })
      }
    },
    backHome() {
      this.$router.go(-1)
    },
    deleteComment(id) {
      essayCommentsDelete({ id: id }).then(res => {
        this.$msg({
          content: '删除成功',
          type: 'success'
        })
        this.initComments()
      })
    },
    addCollect() {
      this.initPage()
      if (this.userId) {
        this.isCollect = !this.isCollect
        if (this.isCollect) {
          this.essayData.collect++
          this.collectIds.push(this.essayData.essay_id)
        } else {
          this.essayData.collect--
          this.collectIds.splice(this.collectIds.indexOf(String(this.essayData.essay_id)), 1)
        }
        if (this.collectIds.length > 1) {
          this.userDetail.collect = this.collectIds.join(',')
        } else {
          this.userDetail.collect = this.collectIds.join('')
        }

        essayDetailUpdate(this.essayData).then(res => {
          userDetailUpdate(this.userDetail).then(res => {
            if (this.isCollect === true) {
              this.$msg({
                content: '收藏成功，前往个人管理查看',
                type: 'success'
              })
              this.initEssay()
            } else {
              this.$msg({
                content: '已取消收藏，前往个人管理查看',
                type: 'info'
              })
              this.initEssay()
            }
          })
        })
      } else {
        this.$msg({
          content: '用户尚未登录',
          type: 'warning'
        })
      }
    },
    addGood() {
      this.initPage()
      if (this.userId) {
        this.isGood = !this.isGood
        if (this.isGood) {
          this.essayData.good++
          this.goodIds.push(this.essayData.essay_id)
        } else {
          this.essayData.good--
          this.goodIds.splice(this.goodIds.indexOf(String(this.essayData.essay_id)), 1)
        }
        if (this.goodIds.length > 1) {
          this.userDetail.good = this.goodIds.join(',')
        } else {
          this.userDetail.good = this.goodIds.join('')
        }

        essayDetailUpdate(this.essayData).then(res => {
          userDetailUpdate(this.userDetail).then(res => {
            if (this.isGood === true) {
              this.$msg({
                content: '点赞成功',
                type: 'success'
              })
              this.initEssay()
            } else {
              this.$msg({
                content: '已取消点赞',
                type: 'info'
              })
              this.initEssay()
            }
          })
        })
      } else {
        this.$msg({
          content: '用户尚未登录',
          type: 'warning'
        })
      }
    }
  }
}
</script>
<!-- 头部,框架和banner -->
<style scoped lang="scss">
@import './scss/EssayPage.scss';
</style>
