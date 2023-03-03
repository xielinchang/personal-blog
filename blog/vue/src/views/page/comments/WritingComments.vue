<template>
  <div>
    <ControlTabVue default-name="评论"></ControlTabVue>
    <TemplatePage></TemplatePage>
    <div class="comments-container animated animate__fadeInUp">
      <div class="all-w-comments">
        <ul class="w-comments-list">
          <li
            v-for="(item, index) in comments_list"
            :key="index"
          >
            <div
              class="w-comment-delete-btn"
              @click="deleteComment(item.id)"
            >
              <img
                src="../../../assets/icon/删除.png"
                alt=""
              />
            </div>
            <div class="w-comment-portrait">
              <img
                :src="item.portrait_url"
                alt=""
              />
            </div>
            <div class="w-comment-name">
              <span> {{ item.name }}</span>&nbsp;
              <span>{{ item.address }}</span>
            </div>
            <div class="w-comment-time">{{ item.created_at }}</div>
            <div class="w-comment-message">{{ item.content }}</div>
            <div
              v-if="item.isreply === 'false' || item.isreply === null"
              class="c-reply"
              title="回复"
            >
              <img
                src="../../../assets/icon/回复.png"
                alt=""
                @click="reply(item, index)"
              />
            </div>
            <div
              v-if="item.isreply === 'true'"
              class="reply-container"
            >
              <div class="w-comment-delete-btn">
                <img
                  src="../../../assets/icon/删除2.png"
                  alt=""
                  @click="deleteReply(item.id)"
                />
              </div>
              <div class="author-portrait">
                <img
                  src="../../../assets/images/动漫1.webp"
                  alt=""
                />
              </div>
              <div class="author-name">
                <span class="author-border"> 博主 </span>&nbsp;
                <span> 福建省福州市 </span>
              </div>
              <div class="author-update-time">{{ item.updated_at }}</div>
              <div class="author-message">{{ item.reply }}</div>
            </div>
            <div
              v-show="item.replyShow"
              class="writingcomment-body animated animate__fadeInDown"
            >
              <div class="writingcomment-main">
                <textarea
                  id="input"
                  v-model="authorReply"
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
                  @click="replyComment(item.id)"
                >
                  <img
                    src="../../../assets/icon/发布.png"
                    alt=""
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
            class="w-comment-page"
            :current-page="currentPage"
            :total="total"
            :page-size="pageSize"
            :page-count="pageCount"
            @change-page="changePage"
          ></QueryPage>
        </ul>
        <!-- 方法名不能加括号 -->
      </div>
    </div>
  </div>
</template>

<script>
import ControlTabVue from '../../component/page-component/ControlTab.vue'
import QueryPage from '../../component/page-component/QueryPage.vue'
import TemplatePage from '../../component/page-component/TemplatePage.vue'
import { baiduLocation } from '../../../api/baiduapi'
import {
  commentsQuery,
  commentsCreate,
  commentsDelete,
  commentsUpdate
} from '../../../api/comments'
export default {
  name: 'WitingComments',
  components: {
    TemplatePage,
    QueryPage,
    ControlTabVue
  },
  data() {
    return {
      comments_list: [],
      showDialog: false,
      text: '',
      publishAgain: true,
      /* 当前页 */
      currentPage: 1,
      /* 评论总数 */
      total: 0,
      /* 需要显示多少个按钮，即在第几个按钮上加‘...’ */
      pageCount: 5,
      /* 每页的条目数 */
      pageSize: 5,
      authorReply: ''
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
      this.authorReply = ''
      commentsQuery({
        limit: this.pageSize,
        offset: this.currentPage
      }).then((res) => {
        this.comments_list.splice(0, this.comments_list.length)
        _this.total = res.data.count
        res.data.rows.forEach((item, i) => {
          item.portrait_url = process.env.VUE_APP_BASE_API + item.portrait_url
          /* 通过赋值给接口数组，再进行二次赋值可以将新值传入 */
          item.replyShow = false
          this.comments_list.push(item)
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
      this.authorReply = resultText
    },
    emojiShow() {
      this.showDialog = !this.showDialog
      const input = document.getElementById('input')
      input.value = input.value.substring(0, input.length)
    },
    publishComment() {
      var _this = this
      if (this.commentReply.name === '') {
        this.commentReply.name = '匿名'
      }
      var randomPortrait = Math.floor(Math.random() * this.portraitArr.length)
      this.commentReply.portrait_url = this.portraitArr[randomPortrait]
      if (this.commentReply.content !== '') {
        commentsCreate(this.commentReply).then((res) => {
          _this.commentReply.content = ''
          this.initComments()
        })
      } else if (this.commentReply.content === '') {
        this.$message.error('不能发送空的信息哦~')
      }
    },
    changePage(val) {
      this.currentPage = val
      this.initComments()
      /* 分页消息提示 */
    },
    reply(item, index) {
      this.$nextTick(() => {
        this.comments_list[index].replyShow =
          !this.comments_list[index].replyShow
      })
    },
    replyComment(id) {
      commentsUpdate({
        id: id,
        reply: this.authorReply
      }).then((res) => {
        this.initComments()
      })
    },
    deleteReply(id) {
      this.$confirm('是否要删除这条回复?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          commentsUpdate({
            id: id,
            reply: null
          }).then(() => {
            this.initComments()
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    deleteComment(id) {
      this.$confirm('是否要删除这条评论?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          commentsDelete({
            id: id
          }).then(() => {
            this.initComments()
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
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
  color: rgb(35, 121, 119);
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
  color: rgb(35, 121, 119);
  background: rgb(255, 255, 255, 0.7);
  font-size: 24px;
  box-shadow: 0 0 0 2px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
  border-radius: 12px;
  resize: none;
  overflow: hidden;
}
input::-webkit-input-placeholder {
  color: rgb(35, 121, 119);
  font-weight: 600;
}
textarea::-webkit-input-placeholder {
  color: rgb(232, 143, 254);
  font-weight: 500;
  font-size: 20px;
}
.all-w-comments {
  width: 100%;
  height: auto;
  padding: 20px 0;
  padding-bottom: 40px;
  box-shadow: 0 0 0 2px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
  border-radius: 12px;
  margin-top: 100px;
  zoom: 1;
}
.w-comments-list {
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
  font-weight: 600;
  font-family: YouYuan;
  color: rgb(35, 121, 119, 0.7);
  cursor: pointer;
  line-height: 45px;
}
.comments-reply-btn:hover {
  color: rgb(35, 121, 119);
}
.comments-reply-btn img {
  width: 30px;
  height: 30px;
  position: absolute;
  left: 10px;
  top: 8px;
}
.comments-reply-btn span {
  position: absolute;
  right: 20px;
  font-size: 18px;
}
.w-comments-list li {
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  height: auto !important;
  font-family: YouYuan;
  z-index: 1;
}
.w-comment-portrait {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 10px;
}
.w-comment-portrait img {
  width: 100%;
  height: 100%;
}
.w-comment-name {
  width: 30%;
  height: 30px;
  line-height: 30px;
  position: relative;
  left: 80px;
  top: 15px;
  display: flex;
  justify-content: left;
}
.w-comment-name span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: auto;
  height: 30px;
  color: #3e8683;
  font-size: 22px;
}
.w-comment-name span:nth-child(2) {
  color: #595959;
  font-size: 16px;
}
.w-comment-time {
  width: 200px;
  height: 30px;
  line-height: 30px;
  position: relative;
  left: 80px;
  top: 10px;
  font-size: 14px;
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
.w-comment-message {
  width: 80%;
  height: auto;
  padding-bottom: 30px;
  position: relative;
  left: 80px;
  top: 10px;
  font-size: 20px;
}
.w-comment-page {
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
  width: 50px;
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
.w-comment-delete-btn {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 20px;
}
.w-comment-delete-btn img {
  width: 100%;
  height: 100%;
}
.w-comment-delete-btn img:hover {
  transform: scale(1.1);
}
</style>
