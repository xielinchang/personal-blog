<template>
  <div class="shareControl">
    <TemplatePage class="write-template"></TemplatePage>
    <div class="share-control">
      <ul class="control-share-list">
        <li
          v-for="(item,index) in share_list"
          :key="index"
          class="control-share-item"
        >
          <svg-icon
            right-title="删除"
            icon-name="delete"
            color="#1AAAE0"
            class="share-delete"
            @click="shareDelete(item)"
          />
          <div class="control-share-img">
            <img
              width="100%"
              :src="item.url"
              alt=""
              @click="jumpToShare(item)"
            >
          </div>
          <div
            class="control-share-content"
            @click="jumpToShare(item)"
          >
            {{ item.title }}
          </div>
        </li>
        <li class="control-share-item">
          <div class="add-share-container">
            <div class="add-share-icon">
              <svg-icon
                class="share-icon"
                icon-name="add"
                color="#F1DA4E"
                size="70px"
                right-title="添加一篇新分享"
                @click="jumpToAddShare()"
              />
            </div>
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/* import getToken from '../utils/author' */
import { shareQuery, shareDelete } from '@/api/shareapi'
import 'animate.css'
export default {
  name: 'ShareControlPage',
  data() {
    return {
      share_list: []
    }
  },
  mounted () {
    this.initShare()
  },
  created () {
  },
  methods: {
    initShare() {
      this.share_list = []
      var _this = this
      shareQuery({
        limit: 999,
        offset: 1,
        query: {
          id: undefined,
          title: undefined
        }
      }).then(res => {
        for (let i = 0; i < res.data.rows.length; i++) {
          res.data.rows[i].url = process.env.VUE_APP_BASE_API + res.data.rows[i].url
          _this.share_list.push(res.data.rows[i])
        }
      })
    },
    jumpToShare(item) {
      this.$router.push('/control/share/writing?id=' + item.id)
    },
    jumpToAddShare() {
      this.$router.push('/control/share/writing?id=' + undefined)
    },
    shareDelete(item) {
      this.$msgBox.confirm({
        title: '提醒',
        content: '要删除名为' + item.title + '的随笔吗？一旦删除将不可恢复',
        type: 'warning',
        onOK: () => {
          shareDelete({ id: item.id }).then(res => {
            this.$msg({
              type: 'success',
              content: '删除成功!'
            })
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
    .shareControl{
      width: 100%;
      height: auto;
    }
    .write-template{
      width: 100%;
      height: calc(100vh);
      position: fixed;
      top: 0;
      left: 0;
    }
    .share-control{
    width: 56%;
    height: auto;
    margin-left: 20%;
    position: relative;
    top: 140px;
    padding-top: 30px;
    border-radius: 4px;
    background: rgb(255, 255, 255,0.5);
  }
  .new-block {
  border-radius: 4px;
}
.control-share-list{
  width: 80%;
  height: auto;
  margin: 0;
  margin-left: 10%;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
}
.control-share-list li{
  width: 100%;
  height: 200px;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  margin-bottom: 50px;
}
.control-share-img{
  width: 40%;
  margin-left: 3%;
  height: 80%;
  position: absolute;
  left: 0;
  overflow: hidden;
  margin-top: 3%;
  border-radius: 4px;
}
.control-share-img img{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.control-share-img img:hover{
  transform: scale(1.1);
  transition: 400ms;
}
.control-share-content{
  width: 55%;
  height: 70%;
  box-sizing: border-box;
  padding: 10px 20px;
  position: absolute;
  bottom: 15%;
  left: 45%;
  border-radius:0 4px 4px 0;
  border-left: 4px solid green;
  box-shadow: 0 0 0 1px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
    font-family: YouYuan;
  font-size: 20px;
  line-height: 40px;
  display:-webkit-box;
  -webkit-box-orient:vertical;/*设置方向*/
  -webkit-line-clamp:2;/*设置超过为省略号的行数*/
  overflow:hidden;
}
.share-delete{
  position: absolute;
  right: 10px;
  top: 10px;
  width: 15px;
  height: 15px;
  z-index: 999;
  opacity: 0.3;
}
.control-share-item:hover .share-delete{
  opacity: 1;
}
.add-share-container{
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255,0.7);
}
.add-share-icon{
  width: 60%;
  height: 100%;
  margin: 0 20%;
  display: flex;
  justify-content: center;
  .share-icon{
  width: 70px;
  height: 70px;
  margin-top: 60px;
}
.share-icon:hover{
  transform: scale(1.1);
  transition: 300ms ;
}
}

  </style>

