<template>
  <div>
    <TemplatePage></TemplatePage>
    <my-loading
      :load-show="loading"
      fixed-top="400"
    >
      <div class="message-container animated animate__fadeInUp">
        <div class="all-message">
          <ul
            v-if="message_list.length > 0"
            class="message-list"
          >
            <li
              v-for="(item, index) in message_list"
              :key="index"
            >
              <div class="c-portrait">
                <img
                  v-lazy="prefix + item.users[0].portrait"
                  alt=""
                />
              </div>
              <div class="c-name">
                <span> {{ item.users[0].name }}</span>&nbsp;
                <span>{{ item.address }}</span>
              </div>
              <div class="c-create-time">{{ item.created_at }}</div>
              <div class="c-message">{{ item.content }}</div>
              <!-- 用v-show时不管符不符合都会将其渲染，
              而有的为null时因不能渲染时会报错，
              用v-if时不会将其渲染 -->
              <div
                v-if="item.message_reply !== null"
                class="reply-container"
              >
                <div class="author-name">
                  <div class="author-border">博主</div>
                </div>
                <div class="author-update-time">
                  {{ item.message_reply.updated_at }}
                </div>
                <div class="author-message">{{ item.message_reply.reply }}</div>
              </div>
            </li>
            <div class="query-page-box">
              <QueryPage
                class="message-page"
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
          <div
            v-else
            class="nothing"
          >暂无留言</div>
        <!-- 方法名不能加括号 -->
        </div>
        <div class="message-body">
          <div class="message-main">
            <textarea
              id="input"
              v-model="newmessage.content"
              placeholder="说点什么~😃"
              class="message-msg"
              rows="5"
              maxlength="200"
              @click="emojiPickerOff()"
            ></textarea>
            <div
              class="emoji-btn"
              @click="emojiShow"
            >Emoji😃</div>
            <div
              class="message-publish-btn"
              @click="publishmessage"
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
    </my-loading>
  </div>
</template>

<script>
import store from '@/store'
import { getToken, removeToken } from '@/utils/author'
import { messageQuery, messageCreate } from '@/api/main/message'
export default {
  name: 'MyMessage',
  data() {
    return {
      newmessage: {
        user_id: '',
        content: '',
        address: ''
      },
      message_list: [],
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
      ],
      prefix: process.env.VUE_APP_BASE_API,
      loading: false
    }
  },

  mounted() {
    document.documentElement.scrollTop = 0
    this.initmessage()
    this.initUser()
  },
  methods: {
    initUser() {
      if (getToken('token')) {
        store.dispatch('getUserInfo').then(user => {
          this.newmessage.user_id = user.id
        })
      } else {
        removeToken('token')
        // this.$msg({
        //   content: '登录失效，请先登录',
        //   type: 'warning'
        // })
        store.commit('reSetUserInfo')
      }
    },
    initmessage() {
      this.message_list = []
      this.loading = true
      messageQuery({
        limit: this.pageSize,
        offset: this.currentPage
      }).then((res) => {
        this.loading = false
        this.total = res.data.count
        this.message_list = res.data.rows
      })
    },
    selectEmoji(emoji) {
      // 选择emoji后调用的函数
      const input = document.getElementById('input')
      const startPos = input.selectionStart
      const endPos = input.selectionEnd
      const resultText =
        input.value.substring(0, startPos) +
        emoji.data +
        input.value.substring(endPos)
      input.value = resultText
      setTimeout(function () {
        input.focus()
      }, 200)
      input.selectionStart = startPos + emoji.data.length
      input.selectionEnd = endPos + emoji.data.length
      this.newmessage.content = resultText
    },
    emojiShow() {
      this.showDialog = !this.showDialog
      const input = document.getElementById('input')
      input.value = input.value.substring(0, input.length)
    },
    reset() {
      var _this = this
      this.newmessage.content = ''
      this.publishAgain = false
      this.changePage(1)
      this.showDialog = false
      setTimeout(function () {
        _this.publishAgain = true
      }, 5000)
    },
    publishmessage() {
      var _this = this
      console.log(this.newmessage)
      this.newmessage.address = localStorage.getItem('address')
      if (getToken('token')) {
        if (this.newmessage.content !== '' && this.publishAgain === true) {
          messageCreate(this.newmessage).then((res) => {
            this.initmessage()
            this.reset()
          })
        } else if (this.newmessage.content === '') {
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
      this.initmessage()
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
@import "./scss/index.scss";
</style>
