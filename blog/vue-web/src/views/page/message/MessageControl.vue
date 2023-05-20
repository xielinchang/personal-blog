<template>
  <div>
    <TemplatePage></TemplatePage>
    <div class="message-container animated animate__fadeInUp">
      <div class="all-message">
        <ul class="message-list">
          <li
            v-for="(item, index) in message_list"
            :key="index"
          >
            <div
              class="message-delete-btn"
              @click="deletemessage(item.id)"
            >
              <svg-icon
                size="20px"
                color="#1DA9E0"
                icon-name="delete"
                alt=""
              />
            </div>
            <div class="message-portrait">
              <img
              v-lazy="item.portrait"
                alt=""
              />
            </div>
            <div class="message-name">
              <span> {{ item.name }}</span>&nbsp;
              <span>{{ item.address }}</span>
            </div>
            <div class="message-time">{{ item.created_at }}</div>
            <div class="message-message">{{ item.content }}</div>
            <div
              v-if="item.isReply === false"
              class="c-reply"
              right-title="回复"
            >
              <svg-icon
                icon-name="reply"
                size="24px"
                color="#00B753"
                @click="reply(item, index)"
              />
            </div>
            <div
              v-else
              class="reply-container"
            >
              <div class="message-delete-btn">
                <svg-icon
                  size="20px"
                  color="#1DA9E0"
                  icon-name="delete"
                  @click="deleteReply(item.message_reply.id)"
                />
              </div>
              <div class="author-portrait">
                <img
                v-lazy="item.message_reply.portrait"
                  alt=""
                />
              </div>
              <div class="author-name">
                <span class="author-border"> {{ item.message_reply.name }} </span>&nbsp;
                <span> {{ item.message_reply.address }} </span>
              </div>
              <div class="author-update-time">{{ item.message_reply.updated_at }}</div>
              <div class="author-message">{{ item.message_reply.reply }}</div>
            </div>
            <div
              v-show="item.replyShow"
              class="writingmessage-body"
            >
              <div class="writingmessage-main">
                <textarea
                  id="input"
                  v-model="newReply.reply"
                  placeholder="回复写在这里~😃"
                  class="writingmessage-msg"
                  rows="5"
                  maxlength="200"
                  @click="emojiPickerOff()"
                ></textarea>
                <div
                  class="emoji-btn-show"
                  @click="emojiShow"
                >Emoji😃</div>
                <div
                  class="message-reply-btn"
                  @click="replymessage()"
                >
                  <svg-icon
                    size="20px"
                    color="#1DA9E0"
                    icon-name="publish"
                  />
                  <span>回复</span>
                </div>
              </div>
              <VEmojiPicker
                v-show="showDialog"
                class="emoji-picker-show"
                @select="selectEmoji"
              />
            </div>
          </li>
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
        </ul>
        <!-- 方法名不能加括号 -->
      </div>
    </div>
  </div>
</template>

<script>
import { queryUser } from '@/api/default/user'
import {
  messageQuery,
  messageDelete,
  messageReplyCreate,
  messageReplyDelete
} from '@/api/main/message'
export default {
  name: 'Witingmessage',
  data() {
    return {
      message_list: [],
      showDialog: false,
      text: '',
      publishAgain: true,
      pageSize: 5,
      /* 当前页 */
      currentPage: 1,
      /* 评论总数 */
      total: 0,
      /* 需要显示多少个按钮，即在第几个按钮上加‘...’ */
      pageCount: 5,
      /* 每页的条目数 */
      newReply: {
        user_id: '',
        message_id: '',
        reply: ''
      },
      sizeOptions: [
        { label: '5条/页', value: 5 },
        { label: '10条/页', value: 10 },
        { label: '15条/页', value: 15 }
      ]
    }
  },
  mounted() {
    document.documentElement.scrollTop = 0
    this.initmessage()
  },
  methods: {
    emojiPickerOff() {
      this.showDialog = false
    },
    initmessage() {
      var _this = this
      this.newReply = {
        user_id: '',
        message_id: '',
        reply: ''
      }
      this.newReply.user_id = localStorage.getItem('userid')
      messageQuery({
        limit: this.pageSize,
        offset: this.currentPage
      }).then((res) => {
        this.message_list.splice(0, this.message_list.length)
        _this.total = res.data.count
        res.data.rows.forEach((item, i) => {
          queryUser({ id: item.user_id }).then(res => {
            // 由于只有data里的数据是响应式的，可以通过$set来添加属性
            this.$set(item, 'name', res.data.user.rows[0].name)
            this.$set(item, 'replyShow', false)
            this.$set(item, 'portrait', process.env.VUE_APP_BASE_API + res.data.user.rows[0].portrait)
            if (item.message_reply !== null) {
              queryUser({ id: item.message_reply.user_id }).then(res => {
                this.$set(item, 'isReply', true)
                this.$set(item.message_reply, 'name', res.data.user.rows[0].name)
                this.$set(item.message_reply, 'portrait', process.env.VUE_APP_BASE_API + res.data.user.rows[0].portrait)
              })
            } else {
              this.$set(item, 'isReply', false)
            }
            this.message_list.push(item)
          })
        })
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
      this.newReply.reply = resultText
    },
    emojiShow() {
      this.showDialog = !this.showDialog
      const input = document.getElementById('input')
      input.value = input.value.substring(0, input.length)
    },
    changePage(val) {
      this.currentPage = val
      this.initmessage()
    },
    changeSize(val) {
      this.pageSize = val
    },
    reply(item, index) {
      this.newReply.message_id = item.id
      this.$nextTick(() => {
        this.message_list[index].replyShow =
          !this.message_list[index].replyShow
      })
    },
    replymessage() {
      messageReplyCreate(this.newReply).then(res => {
        this.$msg({
          type: 'success',
          content: '回复成功!'
        })
        this.initmessage()
      })
    },
    deleteReply(id) {
      this.$msgBox.confirm(
        {
          title: '提醒',
          content: '要删除吗？一旦删除将不可恢复',
          type: 'warning',
          onOK: () => {
            messageReplyDelete({ id: id }).then(() => {
              this.initmessage()
            })
            this.$msg({
              type: 'success',
              content: '删除成功!'
            })
          },
          onCancel: () => {
            this.$msg({
              type: 'info',
              content: '已取消删除'
            })
          }
        }
      )
    },
    deletemessage(id) {
      this.$msgBox.confirm({
        title: '提醒',
        content: '要删除吗？一旦删除将不可恢复',
        type: 'warning',
        onOK: () => {
          messageDelete({
            id: id
          }).then(() => {
            this.initmessage()
          })
          this.$msg({
            type: 'success',
            content: '删除成功!'
          })
        },
        onCancel: () => {
          this.$msg({
            type: 'info',
            content: '已取消删除'
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "./scss/MessageControl.scss";
</style>
