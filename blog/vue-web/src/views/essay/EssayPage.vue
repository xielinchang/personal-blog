<template>
  <div class="body">
    <my-loading :load-show="loading" icon-top="400">
    <TemplatePage></TemplatePage>
    <div class="main-body">
      <div class="main-container">
        <div class="banner">
          <div class="baner-mark">
            <img
              v-lazy="prefix+essayForm.coverUrl"
              class="mark"
            />
            <div class="shadow-mark"></div>
            <img
              v-lazy="prefix+essayForm.coverUrl"
              class="banner-img"
            />
          </div>
          <MyBuble class="buble"></MyBuble>
          <div class="banner-tit-box">
            <div class="banner-title">{{ essayForm.title }}</div>
            <div class="banner-line"></div>
            <div class="banner-subtitle">{{ essayForm.subtitle }}</div>
            <div class="updated-time">最近更新：{{ essayForm.updated_at }}</div>
          </div>
        </div>
        <div
          v-show="catalog.length>0&&catalogShow"
          class="catalog-box block"
          :style="justStyle"
        >
          <p>目录:</p>
          <ul
            class="catalog"
          >
            <li
              v-for="(item,index) in catalog"
              :key="index"
              @click="jumpToCatalog(item)"
            >{{ item.key }}</li>
          </ul>
        </div>
        <div
          class="main-page"
          :style="{width: (catalog.length>0&&catalogShow)?'78%':'100%'}"
        >
          <div
            v-if="essayForm.digest!==''"
            class="digest block"
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
          <div class="essay">
            <div
              class="essay-content"
              v-html="essayForm.html"
            ></div>
            <div class="operation block">
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
          <div class="comment">
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
              class="comment-list block"
            >
              <li
                v-for="(item,index) in commentList"
                :key="index"
              >
                <div class="c-portrait">
                  <img
                    v-lazy="prefix+item.users[0].portrait"
                    alt=""
                  >
                </div>
                <div class="c-right">
                  <div class="c-top">
                    <div class="c-name">{{ item.users[0].name }}</div>
                    <div class="c-address">{{ item.address }}</div>
                  </div>

                  <div class="c-publish-time">{{ item.created_at }}</div>
                  <div class="c-msg">
                    {{ item.message }}
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
      </div>
    </div>
    <div class="icon-buttons">
      <icon-button
        class="icon-button"
        icon="comment-filled"
        left-title="评论"
        @click.native="jumpToComment()"
      ></icon-button>
      <icon-button
        v-show="catalog.length>0"
        class="icon-button"
        icon="hide-filled"
        :left-title="catalogShow?'隐藏目录':'打开目录'"
        @click.native="catalogShow=!catalogShow"
      ></icon-button>
      <icon-button
        class="icon-button"
        icon="left"
        left-title="上一篇"
        @click.native="preEssay()"
      ></icon-button>
      <icon-button
        class="icon-button"
        icon="right"
        left-title="下一篇"
        @click.native="nextEssay()"
      ></icon-button>
    </div>
  </my-loading>
  </div>
</template>

<script>
// import user from './user.vue'
import store from '@/store'
import { userDetailUpdate, queryUser } from '@/api/default/user'
import { essayQuery, essayDetailUpdate } from '@/api/main/essay'
import { essayCommentsQuery, essayCommentsCreate } from '@/api/main/essayComments'
import { getToken } from '@/utils/author'
export default {
  name: 'EssayPage',
  data () {
    return {
      essayForm: {
        essay_id: '',
        coverUrl: '',
        title: '',
        subtitle: '',
        digest: '',
        html: ''
      },
      commentForm: {
        user_id: '',
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
      query: this.$route.query,
      commentNum: 0,
      publishShow: false,
      showDialog: false,
      commentList: [],
      // 获取用户的收藏，点赞
      userDetail: {},
      // 收藏的文章id列表
      collectIds: [],
      goodIds: [],
      loading: false,
      // 目录
      catalog: [],
      // 滚动高度，(和目录相关)
      scrollHeight: '',
      // 目录显示
      catalogShow: true,
      prefix: process.env.VUE_APP_BASE_API
    }
  },
  computed: {
    justStyle() {
      if (this.scrollHeight > 470) {
        return {
          position: 'fixed',
          top: 60 + 'px',
          right: '10%',
          width: '16.4%'
        }
      } else {
        return {
          position: 'absolute',
          top: 450 + 'px',
          right: 0
        }
      }
    }
  },
  watch: {
    '$route.query': {
      // 监听参数变化重新初始化，比直接location.href刷新页面更加顺滑
      handler(value, oldValue) {
        var _this = this
        this.query.id=value.id
        this.init()
      },
      deep: true
    }

  },
  created() {
    // 页面高度初始化
    document.documentElement.scrollTop = 0
    window.addEventListener('scroll', this.onScroll)
    this.init()
  },
  methods: {
    init() {
      this.initUser()
      this.initEssay()
      this.initComments()
      this.initCatalog()
    },
    onScroll() {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.scrollHeight = scrollTop
    },
    changeEssay(type) {
      essayQuery({
        limit: 999,
        offset: 1,
        query: {
          id: undefined,
          title: undefined,
          subtitle: undefined,
          domain: undefined
        }
      }).then(res => {
        const arr = res.data.rows
        const idIndex = arr.findIndex(item =>item.id * 1 === this.query.id * 1)
        if (idIndex * 1 === arr.length - 1 && type === 'next') {
          this.$msg({
            content: '已经是最后一篇了',
            type: 'info'
          })
        } else if (idIndex * 1 === 0 && type === 'pre') {
          this.$msg({
            content: '已经是第一篇了',
            type: 'info'
          })
        } else {
          if (type === 'next') {
            // 直接跳转路由再初始化并不会生效，因为只改变了参数的值
            // 可以直接使用location.href刷新页面来重新初始化
            // 通过监听参数变化来重新初始化可以避免刷新
            this.$router.push('/note/essay?id=' + arr[idIndex + 1].id)
          } else if (type === 'pre') {
            this.$router.push('/note/essay?id=' + arr[idIndex - 1].id)
          }
        }
      })
    },
    preEssay() {
      this.changeEssay('pre')
    },
    nextEssay() {
      this.changeEssay('next')
    },
    selectEmoji(emoji) {
      // 选择emoji后调用的函数
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
      this.commentForm.message = resultText
    },
    emojiShow() {
      this.showDialog = !this.showDialog
      const input = document.getElementById('input')
      input.value = input.value.substring(0, input.length)
    },
    emojiPickerOff() {
      this.showDialog = false
    },
    initCatalog() {
      this.catalog = []
      var titleList = document.querySelectorAll('h1, h2, h3, h4, h5, h6, h7')
      for (let i = 0; i < titleList.length; i++) {
        const element = titleList[i]
        this.catalog.push({
          key: element.innerText,
          offset: element.offsetTop
        })
      }
    },
    // 阻止滚动事件
    disableScroll() {
      document.addEventListener('wheel', this.preventDefault, { passive: false })
    },
    // 开启滚动事件
    enableScroll() {
      document.removeEventListener('wheel', this.preventDefault, { passive: false })
    },
    preventDefault(e) {
      e.preventDefault()
    },
    jumpToCatalog(item) {
      var _this = this
      const timer = setInterval(function() {
        const offset = document.documentElement.scrollTop
        const speed = 80
        _this.disableScroll()
        if (offset <= item.offset + 400) {
          document.documentElement.scrollTop = offset + speed
          // 设置一些偏差，以免与判断矛盾卡住页面
          if (offset * 1 >= item.offset + 500) {
            _this.enableScroll()
            clearInterval(timer)
          }
        } else {
          document.documentElement.scrollTop = offset - speed
          if (offset * 1 <= item.offset + 500) {
            _this.enableScroll()
            clearInterval(timer)
          }
        }
      }, 1)
    },
    initEssay() {
      var _this = this
      this.loading = true
      essayQuery({
        limit: 1,
        offset: 1,
        query: {
          id: this.query.id * 1,
          title: undefined,
          subtitle: undefined,
          domain: undefined
        }
      }).then(res => {
        if (res.data.rows[0].essay_detail) {
          _this.essayData = res.data.rows[0].essay_detail
        } else {
          _this.essayData = {
            id: null,
            essay_id: null,
            good: 0,
            collect: 0
          }
        }
        _this.essayForm = res.data.rows[0]
        // 修改代码块的背景色
        setTimeout(() => {
          // 初始化目录
          _this.initCatalog()
        })
        this.loading = false
      })
    },
    initComments() {
      essayCommentsQuery({
        limit: 999,
        offset: 1,
        query: {
          essay_id: this.query.id
        }
      }).then(res => {
        this.commentNum = res.data.count
        this.commentList = res.data.rows
      })
    },
    initUser() {
      if (getToken('token')) {
        store.dispatch('getUserInfo').then(user => {
          if (user.user_detail !== null) {
            this.userDetail = { ...user.user_detail }
            // 判断文章的id是否符合此篇文章
            if (this.userDetail.collect) {
              this.collectIds = this.userDetail.collect.split(',')
            } else {
              this.collectIds = []
            }
            if (this.collectIds.length > 0) {
              this.isCollect = false
              this.collectIds.find((item, index) => {
                if (item * 1 === this.query.id * 1) {
                  this.isCollect = true
                }
              })
            }
            if (this.userDetail.good) {
              this.goodIds = this.userDetail.good.split(',')
            } else {
              this.goodIds = []
            }
            if (this.goodIds.length > 0) {
              this.isGood = false
              this.goodIds.find((item, index) => {
                if (item * 1 === this.query.id) {
                  this.isGood = true
                }
              })
            }
          } else {
            this.userDetail = {
              id: null,
              user_id: user.id,
              collect: '',
              good: ''
            }
          }
          this.commentForm = {
            ...user,
            address: localStorage.getItem('address'),
            user_id: user.id,
            essay_id: this.$route.query.id * 1
          }
          delete this.commentForm.id
        })
      }
    },
    publishComment() {
      if (getToken('token')) {
        essayCommentsCreate(this.commentForm).then(res => {
          this.initComments()
          this.commentForm.message = ''
        })
      } else {
        this.$msg({
          content: '请先登录',
          type: 'warning'
        })
      }
    },
    jumpToComment() {
      const comment = document.getElementsByClassName('comment')
      const height = comment[0].offsetTop
      var _this = this
      if (!getToken('token')) {
        this.$msg({
          content: '请先登录',
          type: 'warning'
        })
      }
      const timer = setInterval(function() {
        const offset = document.documentElement.scrollTop
        const speed = height / 35
        if (offset <= height + 50) {
          document.documentElement.scrollTop = offset + speed
          // 设置一些偏差大于速度，以免与判断矛盾卡住页面
          if (offset * 1 >= height + speed * 1.5) {
            _this.publishShow = true
            clearInterval(timer)
          }
        } else {
          document.documentElement.scrollTop = offset - speed
          if (offset * 1 <= height + speed * 1.5) {
            _this.publishShow = true
            clearInterval(timer)
          }
        }
      }, 1)
    },
    addCollect() {
      if (getToken('token')) {
        this.isCollect = !this.isCollect
        if (this.isCollect) {
          this.essayData.collect++
          this.collectIds.push(this.query.id)
        } else {
          this.essayData.collect--
          this.collectIds.splice(this.collectIds.indexOf(String(this.query.id)), 1)
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
      if (getToken('token')) {
        this.isGood = !this.isGood
        if (this.isGood) {
          this.essayData.good++
          this.goodIds.push(this.query.id)
        } else {
          this.essayData.good--
          this.goodIds.splice(this.goodIds.indexOf(String(this.query.id)), 1)
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
