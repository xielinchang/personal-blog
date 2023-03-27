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
                size="24px"
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
                  size="24px"
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
              class="writingcomment-body animated animate__fadeInDown"
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
                    size="30px"
                    color="#1DA9E0"
                    icon-name="publish"
                    class="svg-icon"
                  />
                  <span>回复</span>
                </div>
                <VEmojiPicker
                  v-show="showDialog"
                  class="emoji-picker-show"
                  @select="selectEmoji"
                />
              </div>
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
import { queryUser } from '@/api/user'
import {
  commentsQuery,
  commentsDelete,
  commentsReplyCreate,
  commentsReplyDelete
} from '../../../api/comments'
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
      this.newReply.user_id = localStorage.getItem('userId')
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
      this.replymsg = resultText
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

<style scoped>
.comments-container {
  height: auto;
  width: 60%;
  margin-left: 20%;
  padding-bottom: 30px;
}
.writingcomment-body {
  width: 100%;
  height: auto;
  min-height: 50px;
}
.writingcomment-main {
  padding: 0;
  margin: 0;
  width: 100%;
  height: auto;
  min-height: 220px;
  z-index: 9999;
  position: relative;
  margin-left: 0px;
  border-radius: 12px;
}
.emoji-btn-show {
  width: 100px;
  height: 35px;
  margin-top: 6px;
  box-shadow: 0 0 0 2px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
  border-radius: 12px;
  position: absolute;
  left: 120px;
  top: 170px;
  background: rgb(255, 255, 255, 0.75);
  text-align: center;
  line-height: 40px;
  font-weight: 600;
  font-family: YouYuan;
  color: rgb(98, 98, 98);
  cursor: pointer;
}
.emoji-btn-show:hover {
  color: rgb(255, 120, 241);
}
.writingcomment-msg {
  width: 80%;
  margin-left: 10%;
  position: absolute;
  top: 20px;
  height: 200px;
  box-sizing: border-box;
  padding: 0 50px;
  outline: none;
  border: none;
  color: rgb(87, 87, 87);
  background: rgb(255, 255, 255, 0.7);
  font-size: 24px;
  box-shadow: 0 0 0 2px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
  border-radius: 12px;
  resize: none;
  overflow: hidden;
}
input::-webkit-input-placeholder {
  color: rgb(66, 66, 66);
  font-weight: 600;
}
textarea::-webkit-input-placeholder {
  color: rgb(141, 141, 141);
  font-weight: 500;
  font-size: 20px;
}
.all-comments {
  width: 100%;
  height: auto;
  padding: 20px 0;
  padding-bottom: 40px;
  box-shadow: 0 0 0 2px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
  border-radius: 12px;
  margin-top: 100px;
  position: relative;
  zoom: 1;
}
.comments-list {
  width: 76%;
  height: auto;
  background-color: rgba(247, 247, 247, 0.8);
  padding: 0;
  margin: 0;
  padding: 0 2%;
  margin-left: 10%;
  padding-bottom: 60px;
  border-radius: 12px;
  list-style: none;
}
.emoji-picker-show {
  position: relative;
  left: -260px;
  top: 20px;
}
.comments-reply-btn {
  width: 100px;
  height: 45px;
  margin-top: 6px;
  box-shadow: 0 0 0 2px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
  background: rgb(220, 220, 220, 0.5);
  border-radius: 30px;
  position: absolute;
  right: 100px;
  top: 160px;
  text-align: center;
  line-height: 40px;
  color: rgba(111, 111, 111, 0.7);
  cursor: pointer;
  line-height: 45px;
}
.comments-reply-btn:hover {
  color: rgb(85, 85, 85);
}
.svg-icon {
  width: 30px;
  height: 30px;
  position: absolute;
  left: 8px;
  top: 6px;
}
.comments-reply-btn span {
  position: absolute;
  right: 20px;
  font-size: 18px;
}
.comments-list li {
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  height: auto !important;
  font-family: YouYuan;
  z-index: 1;
}
.comment-portrait {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 10px;
}
.comment-portrait img {
  width: 100%;
  height: 100%;
}
.comment-name {
  width: 50%;
  height: 30px;
  line-height: 30px;
  position: relative;
  left: 80px;
  top: 15px;
  display: flex;
  justify-content: left;
}
.comment-name span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: auto;
  height: 30px;
  color: #3e8683;
  font-size: 18px;
}
.comment-name span:nth-child(2) {
  color: #595959;
  font-size: 14px;
}
.comment-time {
  width: 200px;
  height: 30px;
  line-height: 30px;
  position: relative;
  left: 80px;
  top: 10px;
  font-size: 12px;
  color: rgb(74, 136, 74);
  font-weight: 600;
}
.c-address {
  width: 200px;
  height: 30px;
  line-height: 30px;
  position: relative;
  left: 130px;
  top: 0;
  font-size: 16px;
  color: rgb(83, 83, 83);
}
.comment-message {
  width: 80%;
  height: auto;
  padding-bottom: 30px;
  position: relative;
  left: 80px;
  top: 10px;
  font-size: 20px;
}
.comment-page {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 15px;
}
.reply-container {
  width: 80%;
  margin-left: 10%;
  height: auto;
  min-height: 120px;
  background: rgba(160, 197, 255, 0.5);
  position: relative;
  border-radius: 8px;
}
.author-portrait {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 50%;
  overflow: hidden;
}
.author-portrait img {
  width: 100%;
  height: 100%;
}
.author-name {
  width: 200px;
  height: 20px;
  line-height: 20px;
  display: flex;
  justify-content: left;
  position: absolute;
  top: 5px;
  left: 60px;
}
.author-border {
  color: #3e8683;
  border-radius: 4px;
  border: 1px solid #c0fffc;
  background: rgba(199, 255, 252, 0.3);
  width: auto;
  padding: 0 5px;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
.author-update-time {
  position: absolute;
  left: 65px;
  top: 30px;
  font-size: 12px;
  color: rgb(1, 119, 8);
}
.author-message {
  width: 80%;
  margin-left: 2%;
  height: 80px;
  position: absolute;
  bottom: 0;
  left: 50px;
  text-align: left;
  line-height: 40px;
  font-family: YouYuan;
  font-size: 18px;
}
.c-reply {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 80px;
  top: 70px;
}
.c-reply img {
  width: 100%;
}
.comment-delete-btn {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 20px;
}
.comment-delete-btn img {
  width: 100%;
  height: 100%;
}
.comment-delete-btn img:hover {
  transform: scale(1.1);
}
</style>
