<template>
  <div>
    <TemplatePage></TemplatePage>
    <div class="comments-container animated animate__fadeInUp">
      <div class="all-comments">
        <ul class="comments-list">
          <li
            v-for="(item, index) in comments_list"
            :key="index"
          >
            <div
              class="comment-delete-btn"
              @click="deleteComment(item.id)"
            >
              <svg-icon
                size="20px"
                color="#1DA9E0"
                icon-name="delete"
                alt=""
              />
            </div>
            <div class="comment-portrait">
              <img
                :src="item.portrait"
                alt=""
              />
            </div>
            <div class="comment-name">
              <span> {{ item.name }}</span>&nbsp;
              <span>{{ item.address }}</span>
            </div>
            <div class="comment-time">{{ item.created_at }}</div>
            <div class="comment-message">{{ item.content }}</div>
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
              <div class="comment-delete-btn">
                <svg-icon
                  size="20px"
                  color="#1DA9E0"
                  icon-name="delete"
                  @click="deleteReply(item.comment_reply.id)"
                />
              </div>
              <div class="author-portrait">
                <img
                  :src="item.comment_reply.portrait"
                  alt=""
                />
              </div>
              <div class="author-name">
                <span class="author-border"> {{ item.comment_reply.name }} </span>&nbsp;
                <span> {{ item.comment_reply.address }} </span>
              </div>
              <div class="author-update-time">{{ item.comment_reply.updated_at }}</div>
              <div class="author-message">{{ item.comment_reply.reply }}</div>
            </div>
            <div
              v-show="item.replyShow"
              class="writingcomment-body"
            >
              <div class="writingcomment-main">
                <textarea
                  id="input"
                  v-model="newReply.reply"
                  placeholder="回复写在这里~😃"
                  class="writingcomment-msg"
                  rows="5"
                  maxlength="200"
                  @click="emojiPickerOff()"
                ></textarea>
                <div
                  class="emoji-btn-show"
                  @click="emojiShow"
                >Emoji😃</div>
                <div
                  class="comments-reply-btn"
                  @click="replyComment()"
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
            class="comment-page"
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
  commentsQuery,
  commentsDelete,
  commentsReplyCreate,
  commentsReplyDelete
} from '@/api/main/comments'
export default {
  name: 'WitingComments',
  data() {
    return {
      comments_list: [],
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
        comment_id: '',
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
    this.initComments()
  },
  methods: {
    emojiPickerOff() {
      this.showDialog = false
    },
    initComments() {
      var _this = this
      this.newReply = {
        user_id: '',
        comment_id: '',
        reply: ''
      }
      this.newReply.user_id = localStorage.getItem('userid')
      commentsQuery({
        limit: this.pageSize,
        offset: this.currentPage
      }).then((res) => {
        this.comments_list.splice(0, this.comments_list.length)
        _this.total = res.data.count
        res.data.rows.forEach((item, i) => {
          queryUser({ id: item.user_id }).then(res => {
            // 由于只有data里的数据是响应式的，可以通过$set来添加属性
            this.$set(item, 'name', res.data.user.rows[0].name)
            this.$set(item, 'replyShow', false)
            this.$set(item, 'portrait', process.env.VUE_APP_BASE_API + res.data.user.rows[0].portrait)
            if (item.comment_reply !== null) {
              queryUser({ id: item.comment_reply.user_id }).then(res => {
                this.$set(item, 'isReply', true)
                this.$set(item.comment_reply, 'name', res.data.user.rows[0].name)
                this.$set(item.comment_reply, 'portrait', process.env.VUE_APP_BASE_API + res.data.user.rows[0].portrait)
              })
            } else {
              this.$set(item, 'isReply', false)
            }
            this.comments_list.push(item)
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
      this.initComments()
    },
    changeSize(val) {
      this.pageSize = val
    },
    reply(item, index) {
      this.newReply.comment_id = item.id
      this.$nextTick(() => {
        this.comments_list[index].replyShow =
          !this.comments_list[index].replyShow
      })
    },
    replyComment() {
      commentsReplyCreate(this.newReply).then(res => {
        this.$msg({
          type: 'success',
          content: '回复成功!'
        })
        this.initComments()
      })
    },
    deleteReply(id) {
      this.$msgBox.confirm(
        {
          title: '提醒',
          content: '要删除吗？一旦删除将不可恢复',
          type: 'warning',
          onOK: () => {
            commentsReplyDelete({ id: id }).then(() => {
              this.initComments()
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
    deleteComment(id) {
      this.$msgBox.confirm({
        title: '提醒',
        content: '要删除吗？一旦删除将不可恢复',
        type: 'warning',
        onOK: () => {
          commentsDelete({
            id: id
          }).then(() => {
            this.initComments()
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
@import "./scss/CommentsControl.scss";
</style>
