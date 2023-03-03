<template>
  <div>
    <LocationWelcome
      :welcome-show="welcomeShow"
      :default-msg="defaultMsg"
      :message="message"
      :address="address"
    ></LocationWelcome>
    <TemplatePage></TemplatePage>

    <div class="comments-container animated animate__fadeInUp">
      <div class="all-comments">
        <ul
          class="comments-list"
        >
          <li
            v-for="(item,index) in comments_list"
            :key="index"
          >
            <div class="c-portrait">
              <img
                :src="item.portrait_url"
                alt=""
              >
            </div>
            <div class="c-name">
              <span> {{ item.name }}</span>&nbsp;
              <span>{{ item.address }}</span>
            </div>
            <div class="c-create-time">{{ item.created_at }}</div>
            <div class="c-message">{{ item.content }}</div>
            <div
              v-if="item.isreply==='true'"
              class="reply-container"
            >
              <div class="author-portrait">
                <img
                  src="../../../assets/images/动漫1.webp"
                  alt=""
                >
              </div>
              <div class="author-name">
                <span class="author-border">  博主 </span>&nbsp;
                <span> 福建省福州市 </span>
              </div>
              <div class="author-update-time">{{ item.updated_at }}</div>
              <div class="author-message">{{ item.reply }}</div>
            </div>
          </li>
          <div class="query-page-box">
            <QueryPage
              class="comment-page"
              :current-page="currentPage"
              :total="total"
              :page-size="pageSize"
              :page-count="pageCount"
              @change-page="changePage"
            ></QueryPage>
          </div>
        </ul>
        <!-- 方法名不能加括号 -->

      </div>
      <div class="essaycomment-body">
        <div class="essaycomment-main">
          <textarea
            id="input"
            v-model="newessayComment.content"
            placeholder="说点什么~😃"
            class="essaycomment-msg"
            rows="5"
            maxlength="200"
            @click="emojiPickerOff()"
          ></textarea>
          <div
            class="emoji-btn"
            @click="emojiShow"
          >
            Emoji😃
          </div>
          <div
            class="comments-publish-btn"
            @click="publishComment"
          >
            <img
              src="../../../assets/icon/发布.png"
              alt=""
            >
            <span>发布</span>
          </div>
          <VEmojiPicker
            v-show="showDialog"
            class="emoji-picker"
            @select="selectEmoji"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getUserIp } from '@/api/api'
import QueryPage from '../../component/MyComponents/QueryPage.vue'
import TemplatePage from '../../component/MyComponents/TemplatePage.vue'
import { baiduLocation } from '../../../api/baiduapi'
import { commentsQuery, commentsCreate } from '../../../api/comments'
import LocationWelcome from '../../component/element/Location-Welcome.vue'
export default {
  name: 'EssayComments',
  components: {
    TemplatePage,
    LocationWelcome,
    QueryPage
  },
  data () {
    return {
      newessayComment: {
        name: '',
        content: '',
        address: '',
        portrait_url: ''
      },
      comments_list: [],
      showDialog: false,
      text: '',
      portraitArr: [
        '/public/uploads/2022/08/03/1659524422501607.jpg',
        '/public/uploads/2022/08/03/1659525306960790.jpg',
        '/public/uploads/2022/08/04/1659575550058157.jpg',
        '/public/uploads/2022/08/04/1659575588104356.jpg'
      ],
      publishAgain: true,
      welcomeShow: true,
      /* 当前页 */
      currentPage: 1,
      /* 评论总数 */
      total: 0,
      /* 需要显示多少个按钮，即在第几个按钮上加‘...’ */
      pageCount: 5,
      /* 每页的条目数 */
      pageSize: 5,
      defaultMsg: true,
      message: '',
      ip: '',
      address: '中国'
    }
  },
  created () {
    var _this = this
    getUserIp().then(res => {
      _this.ip = res.data.ip
      _this.initAddress()
    })
  },

  mounted () {
    document.documentElement.scrollTop = 0
    this.initComments()
    this.initWelcome()
    this.newessayComment.name = localStorage.getItem('name')
    this.newessayComment.portrait_url = localStorage.getItem('portrait_url')
    window.addEventListener('setName', (e) => {
      this.newessayComment.name = e.newValue
    })
    window.addEventListener('portrait_url', (e) => {
      this.newessayComment.portrait_url = e.newValue
    })
  },
  methods: {
    initAddress() {
      var _this = this
      if (this.ip === '127.0.0.1') {
        this.ip = ''
      }
      baiduLocation(String(this.ip)).then(res => {
        this.$nextTick(() => {
          this.address = res.data.content.address
        })
        _this.newessayComment.address = res.data.content.address
      })
    },
    initWelcome() {
      var _this = this
      this.welcomeShow = true
      setTimeout(() => {
        _this.welcomeShow = false
      }, 3000)
    },
    initComments() {
      var _this = this
      commentsQuery({
        limit: this.pageSize,
        offset: this.currentPage
      }).then(res => {
        this.comments_list.splice(0, this.comments_list.length)
        _this.total = res.data.count
        res.data.rows.forEach((item, i) => {
          item.portrait_url = process.env.VUE_APP_BASE_API + item.portrait_url
          /* 通过赋值给接口数组，再进行二次赋值可以将新值传入 */
          this.comments_list.push(item)
        })
      })
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
      this.newessayComment.content = resultText
    },
    emojiShow() {
      this.showDialog = !this.showDialog
      const input = document.getElementById('input')
      input.value = input.value.substring(0, input.length)
    },
    publishComment() {
      var _this = this
      if (localStorage.getItem('name')) {
        if (this.newessayComment.content !== '' && this.publishAgain === true) {
          commentsCreate(this.newessayComment).then(res => {
            this.initComments()
            _this.newessayComment.content = ''
            _this.publishAgain = false
            _this.changePage(1)
            _this.showDialog = false
            setTimeout(function() {
              _this.publishAgain = true
            }, 5000)
          })
        } else if (this.newessayComment.content === '') {
          this.$message.error('不能发送空的信息哦~')
        } else {
          this.$message.error('你讲话太快啦！！')
        }
        document.documentElement.scrollTop = 0
      } else {
        this.$router.push('/login')
        this.$message({
          type: 'warning',
          message: '请先登录!'
        })
      }
    },
    changePage(val) {
      this.currentPage = val
      this.initComments()
    },
    emojiPickerOff() {
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import './scss/CommentsPage.scss';
</style>
