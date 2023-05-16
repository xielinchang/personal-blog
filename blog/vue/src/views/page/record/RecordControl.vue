<template>
  <div>
    <TemplatePage></TemplatePage>
    <div class="record-container">
      <div class="record-default">
        <div class="r-d-img">
          <img
            :src="record_default.img"
            alt=""
          >
          <my-upload
            v-model="file"
            :action="uploadUrl"
            @upload-success="uploadCallback"
          >
          </my-upload>

        </div>
        <div class="r-d-title">
          <my-input
            v-model="record_default.title"
            :width="size"
          ></my-input>
        </div>
        <div
          class="r-d-content"
        >
          <my-input
            v-model="record_default.content"
            :width="size"
          ></my-input>
        </div>
        <my-button
          icon="edit"
          @click="uploadCallback"
        >修改</my-button>
      </div>
      <div class="all-record ">
        <ul
          class="record-list"
        >
          <li
            v-for="(item,index) in record_list"
            :key="index"
          >
            <div class="r-create-time">{{ item.created_at }}</div>
            <div class="r-message">{{ item.message }}</div>
            <div
              class="delete-btn"
              @click="deleteRecord(item.id)"
            >
              <svg-icon
                icon-name="delete"
                color="#1DA9E0"
                size="20px"
              />
            </div>
          </li>
        </ul>
        <QueryPage
          class="query-page"
          :current-page="currentPage"
          :total="total"
          :is-one-show="false"
          :page-size="pageSize"
          :page-count="pageCount"
          @change-page="changePage"
        ></QueryPage>
      </div>
      <div class="record-body">
        <div class="record-main">
          <textarea
            id="input"
            v-model="newrecord.message"
            placeholder="创建一条新的博客记录~😃"
            class="record-msg-main"
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
            class="record-publish-btn"
            @click="publishrecord"
          >
            <svg-icon
              class="publish"
              icon-name="publish"
              color="#00B753"
              size="24px"
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
import { recordQuery, recordCreate, recordDelete, recordDefaultQuery, recordDefaultUpdate } from '@/api/default/api'
export default {
  name: 'EssayRecord',
  data () {
    return {
      newrecord: {
        message: ''
      },
      record_list: [],
      record_default: {},
      showDialog: false,
      text: '',
      file: {},
      // 未加前缀的图片路劲
      img: '',
      uploadUrl: process.env.VUE_APP_BASE_API + '/api/file',
      publishAgain: true,
      currentPage: 1,
      total: 0,
      pageCount: 5,
      pageSize: 5,
      size: 400
    }
  },
  mounted () {
    document.documentElement.scrollTop = 0
    this.initrecord()
  },
  methods: {
    initrecord() {
      recordQuery({
        limit: this.pageSize,
        offset: this.currentPage
      }).then((res) => {
        this.total = res.data.count
        this.record_list.splice(0, this.record_list.length)
        for (let i = 0; i < res.data.rows.length; i++) {
          this.record_list.push(res.data.rows[i])
        }
      })
      recordDefaultQuery().then(res => {
        this.img = res.data[0].img
        this.record_default = res.data[0]
        this.record_default.img = process.env.VUE_APP_BASE_API + res.data[0].img
      })
    },
    emojiPickerOff() {
      this.showDialog = false
    },
    publishrecord() {
      recordCreate(this.newrecord).then(() => {
        this.$msg({
          type: 'success',
          content: '创建成功!'
        })
        this.initrecord()
      })
    },
    deleteRecord(id) {
      this.$msgBox.confirm({
        title: '提醒',
        content: '要删除吗？一旦删除将不可恢复',
        type: 'danger',
        onOK: () => {
          recordDelete({
            id: id
          }).then(() => {
            this.$msg({
              type: 'success',
              content: '删除成功!'
            })
            this.initrecord()
          })
        },
        onCancel: () => {
          this.$msg({
            type: 'info',
            content: '已取消删除'
          })
        }
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
      this.newrecord.message = resultText
    },
    emojiShow() {
      this.showDialog = !this.showDialog
      const input = document.getElementById('input')
      input.value = input.value.substring(0, input.length)
    },
    changePage(val) {
      this.currentPage = val
      this.initrecord()
    },
    recordDefaultUpdateApi() {
      this.record_default.img = this.img
      recordDefaultUpdate(this.record_default).then(res => {
        this.record_default.img = process.env.VUE_APP_BASE_API + this.img
        this.$msg({
          content: '更新成功',
          type: 'success'
        })
        this.initrecord()
      })
    },
    uploadCallback(url) {
      if (url) {
        this.record_default.img = url
        this.recordDefaultUpdateApi()
      } else {
        this.recordDefaultUpdateApi()
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "./RecordControl";
</style>
