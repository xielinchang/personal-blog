<template>
  <div>
    <TemplatePage></TemplatePage>
    <div class="record-container animated animate__fadeInUp">
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
import { recordQuery, recordCreate, recordDelete } from '@/api/api'
export default {
  name: 'EssayRecord',
  data () {
    return {
      newrecord: {
        message: ''
      },
      record_list: [],
      showDialog: false,
      text: '',
      publishAgain: true,
      currentPage: 1,
      total: 0,
      pageSize: 6
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
    },
    emojiPickerOff() {
      this.showDialog = false
    },
    publishrecord() {
      recordCreate(this.newrecord).then(() => {
        this.$message({
          type: 'success',
          message: '创建成功!'
        })
        this.initrecord()
      })
    },
    deleteRecord(id) {
      this.$confirm('是否要删除这条博客记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        recordDelete({
          id: id
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.initrecord()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
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
    }
  }
}
</script>

<style scoped lang="scss">
.record-container{
    height: auto;
    width: 60%;
    margin-left: 20%;
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
  box-shadow: 0 0 0 2px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
    border-radius: 12px;
}
.emoji-btn{
    width: 100px;
    height:35px;
    box-shadow: 0 0 0 2px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
    border-radius: 12px;
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
  box-shadow: 0 0 0 2px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
  border-radius: 12px;
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
    width: 100%;
    height: auto;
    padding: 20px 0;
    padding-bottom: 40px;
    box-shadow: 0 0 0 2px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
    border-radius: 12px;
    margin-top: 100px;
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
    border-radius: 12px;
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
