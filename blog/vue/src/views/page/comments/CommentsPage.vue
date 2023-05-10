<template>
  <div>
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
                :src="item.portrait"
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
              v-show="item.comment_reply"
              class="reply-container"
            >
              <div class="author-portrait">
                <img
                  :src="item.comment_reply.portrait"
                  alt=""
                >
              </div>
              <div class="author-name">
                <span class="author-border">  {{ item.comment_reply.name }} </span>&nbsp;
                <span> {{ item.comment_reply.address }} </span>
              </div>
              <div class="author-update-time">{{ item.comment_reply.updated_at }}</div>
              <div class="author-message">{{ item.comment_reply.reply }}</div>
            </div>
          </li>
          <div class="query-page-box">
            <QueryPage
              class="comment-page"
              :current-page="currentPage"
              :total="total"
              :page-size="pageSize"
              :page-count="pageCount"
              :size-options="sizeOptions"
              @change-page-size="changeSize"
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
      </div>
    </div>

  </div>
</template>

<script>
import { commentsQuery, commentsCreate } from '../../../api/comments'
import { queryUser } from '@/api/user'
export default {
  name: 'EssayComments',
  data () {
    return {
      newessayComment: {
        user_id: '',
        content: '',
        address: ''
      },
      comments_list: [],
      showDialog: false,
      text: '',
      authorPortrait: '',
      publishAgain: true,
      /* 当前页 */
      currentPage: 1,
      /* 评论总数 */
      total: 0,
      /* 需要显示多少个按钮，即在第几个按钮上加‘...’ */
      pageCount: 5,
      /* 每页的条目数 */
      pageSize: 5,
      ip: '',
      address: '中国',
      sizeOptions: [
        { label: '5条/页', value: 5 },
        { label: '10条/页', value: 10 },
        { label: '15条/页', value: 15 }
      ]
    }
  },

  mounted () {
    document.documentElement.scrollTop = 0
    this.initComments()
    this.initUSer()
  },
  methods: {
    initUSer() {
      if (localStorage.getItem('userId')) {
        this.newessayComment.user_id = localStorage.getItem('userId')
      } else {
        this.$msg({
          content: '请先登录',
          type: 'warning'
        })
      }
    },
    initComments() {
      var _this = this
      commentsQuery({
        limit: this.pageSize,
        offset: this.currentPage
      }).then(res => {
        _this.total = res.data.count
        _this.comments_list = []
        res.data.rows.forEach((item, i) => {
          queryUser({ id: item.user_id }).then(res => {
            // 由于只有data里的数据是响应式的，可以通过$set来添加属性
            this.$set(item, 'name', res.data.user.rows[0].name)
            this.$set(item, 'portrait', process.env.VUE_APP_BASE_API + res.data.user.rows[0].portrait)
            if (item.comment_reply !== null) {
              queryUser({ id: item.comment_reply.user_id }).then(res => {
                this.$set(item.comment_reply, 'name', res.data.user.rows[0].name)
                this.$set(item.comment_reply, 'portrait', process.env.VUE_APP_BASE_API + res.data.user.rows[0].portrait)
              })
            } else {
              item.comment_reply = false
            }
            _this.comments_list.push(item)
          })
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
    reset() {
      var _this = this
      this.newessayComment.content = ''
      this.publishAgain = false
      this.changePage(1)
      this.showDialog = false
      setTimeout(function() {
        _this.publishAgain = true
      }, 5000)
    },
    publishComment() {
      var _this = this
      this.newessayComment.address = localStorage.getItem('address')
      if (localStorage.getItem('userId')) {
        if (this.newessayComment.content !== '' && this.publishAgain === true) {
          commentsCreate(this.newessayComment).then(res => {
            // this.initComments()
            this.reset()
          })
        } else if (this.newessayComment.content === '') {
          this.$msg({
            content: '不能发送空的消息',
            type: 'info'
          })
        } else {
          this.$msg({
            content: '讲话太快了',
            type: 'info'
          })
        }
        document.documentElement.scrollTop = 0
      } else {
        this.$router.push('/login')
        this.$msg({
          type: 'warning',
          content: '请先登录!'
        })
      }
    },
    changePage(val) {
      this.currentPage = val
      this.initComments()
    },
    changeSize(val) {
      this.pageSize = val
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
