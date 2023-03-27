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
            :image="image"
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
          @click="updateRecordDefault"
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
import { recordQuery, recordCreate, recordDelete, recordDefaultQuery, recordDefaultUpdate } from '@/api/api'
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
      image: '',
      uploadUrl: process.env.VUE_APP_BASE_API + '/api/file',
      publishAgain: true,
      currentPage: 1,
      total: 0,
      pageSize: 6,
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
        limit: 5,
        offset: this.currentPage
      }).then((res) => {
        this.record_list.splice(0, this.record_list.length)
        for (let i = 0; i < res.data.rows.length; i++) {
          this.record_list.push(res.data.rows[i])
        }
      })
      recordDefaultQuery().then(res => {
        res.data[0].img = process.env.VUE_APP_BASE_API + res.data[0].img
        this.record_default = res.data[0]
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
    uploadCallback: function(file, res) {
      this.record_default.img = res.data.data.url
      recordDefaultUpdate(this.record_default).then(res => {
        this.record_default.img = process.env.VUE_APP_BASE_API + this.img
        this.$msg({
          content: '更新成功',
          type: 'success'
        })
        this.initrecord()
      })
    },
    updateRecordDefault() {
      this.uploadCallback()
    }
  }
}
</script>

<style scoped lang="scss">
.record-container{
    height: auto;
    width: 60%;
    margin-left: 20%;
    position: relative;
    top: 100px;
    padding-top: 20px;
    box-shadow: 0 0 0 2px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
    .record-default{
      background-color: rgba(247, 247, 247, 0.8);
      width: 80%;
      border-radius: 4px;
      height: 300px;
      margin-left: 10%;
      margin-top: 10px;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .r-d-img{
      width: 80px;
      height: 80px;
      position: relative;
      & img{
        position: absolute;
        top: 0;
        border-radius: 4px;
        width: 100%;
        height: 100%;
      }
      }
    }
}
.record-body{
  width: 100%;
  height: 500px;
  margin-top: 30px;
  min-height: 50px;
}
.record-main{
  padding: 0;
  margin: 0;
  width: 100%;
  height: auto;
  min-height: 240px;
  z-index: 2;
  position: relative;
  margin-left: 0px;
  padding-bottom: 15px;
  margin-bottom: 30px;
    border-radius: 4px;
}
.emoji-btn{
    width: 100px;
    height:35px;
    box-shadow: 0 0 0 2px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
    border-radius: 4px;
    position: absolute;
    right: 220px;
    bottom: 35px;
    background: rgb(255, 255, 255,0.75);
    text-align: center;
    line-height: 40px;
    font-weight: 600;
    font-family: YouYuan;
    color: rgb(93, 93, 93);
    cursor: pointer;
}
.emoji-btn:hover{
     color: rgb(255, 120, 241);
}
.record-msg-main{
  width: 80%;
  margin-left: 10%;
  margin-top: 0px;
  position: absolute;
  top: 25px;
  height: 200px;
  box-sizing: border-box;
  padding: 10px 50px;
  outline: none;
  border: none;
  color: rgb(76, 76, 76);
  background: rgb(255, 255, 255,0.7);
  font-size: 24px;
  border-radius: 4px;
  resize: none;
  overflow: hidden;

}
input::-webkit-input-placeholder{
  color: rgb(81, 81, 81);
  font-weight: 600;
}
textarea::-webkit-input-placeholder{
  color: rgb(62, 125, 98);
  font-weight: 500;
  font-size: 20px;
}
.all-record{
  position: relative;
    width: 100%;
    height: auto;
    padding: 20px 0;
    padding-bottom: 40px;
    border-radius: 4px;
    margin-top: 10px;
    zoom:1;
    overflow:hidden;
}
.record-list{
    width: 76%;
    height: auto;
    background-color: rgba(247, 247, 247, 0.8);
    padding: 0;
    margin: 0;
    padding: 0 2%;
    padding-bottom: 30px;
    margin-left: 10%;
    border-radius: 4px;
    list-style: none;
}
.emoji-picker{
    position: absolute;
    right: -50px;
    top: 210px;
    z-index: 9999;
}
.record-publish-btn{
    width: 100px;
    height:35px;
    margin-top: 6px;
    box-shadow: 0 0 0 2px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
    background: rgb(220, 220, 220,0.5);
    border-radius: 30px;
    position: absolute;
    right: 100px;
    bottom: 35px;
    text-align: center;
    line-height: 40px;
    font-weight: 600;
    font-family: YouYuan;
     color: rgba(80, 80, 80, 0.7);
     cursor: pointer;
     line-height: 35px;
}
.record-publish-btn:hover{
  color: rgb(35, 121, 119);
}
.publish{
    width: 30px;
    height: 30px;
    position: absolute;
    left: 10px;
    top: 5px;
}
.record-publish-btn span{
    position: absolute;
    right: 20px;
    font-size: 18px;
}
.record-list li{
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  height: auto !important;
  font-family: YouYuan;
}
.r-create-time{
  width: 200px;
  height: 30px;
  line-height: 30px;
  position: relative;
  left: 30px;
  top: 10px;
  font-size: 14px;
  color: rgb(74, 136, 74);
  font-weight: 600;
}
.r-message{
  width: 80%;
  height: auto;
  padding-bottom: 30px;
  position: relative;
  left: 30px;
  top: 10px;
  font-size: 20px;
}
.record-page{
  position: absolute;
  right: 100px;
}
.delete-btn{
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 20px;
}
.delete-btn img{
  width: 100%;
  height: 100%;
}
</style>
