<template>
  <div class="shareControl">
    <TemplatePage class="write-template"></TemplatePage>
    <ControlTabVue default-name="随笔"></ControlTabVue>
    <div class="share-control">
      <ul class="control-share-list">
        <li
          v-for="(item,index) in share_list"
          :key="index"
          class="control-share-item"
        >
          <img
            data-title="删除"
            src="../../../assets/icon/删除2.png"
            class="share-delete"
            alt=""
            @click="shareDelete(item)"
          >
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
            <div class="add-share-img">
              <img
                src="@/assets/icon/jiahao.png"
                alt=""
                data-title="添加一篇新分享"
                @click="jumpToAddShare()"
              >
            </div>
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/* import getToken from '../utils/author' */
import TemplatePage from '../../component/MyComponents/TemplatePage.vue'
import ControlTabVue from '../../component/MyComponents/ControlTab.vue'
import { shareQuery, shareDelete } from '@/api/shareapi'
import 'animate.css'
export default {
  name: 'ShareControlPage',
  components: {
    TemplatePage,
    ControlTabVue
  },
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
      this.$router.push('/writing/share?id=' + item.id)
    },
    jumpToAddShare() {
      this.$router.push('/writing/share?id=' + undefined)
    },
    shareDelete(item) {
      this.$confirm('是否删除这篇随笔', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        shareDelete({ id: item.id }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
    <style src="../../../../public/css/main.css"></style>
    <style scoped>
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
    border-radius: 12px;
    background: rgb(255, 255, 255,0.5);
  }
  .new-block {
  border-radius: 20px;
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
  border-radius: 12px;
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
  border-radius: 12px;
}
.control-share-img img{
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: url(http://qkongtao.cn/wp-control-share-content/uploads/2021/08/arr41-1.png), pointer!important;
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
  border-radius:0 12px 12px 0;
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
  background: rgba(213, 213, 213, 0.63);
}
.add-share-img{
  width: 60%;
  height: 100%;
  margin: 0 20%;
  background: rgb(255, 255, 255,0.8);
  display: flex;
  justify-content: center;
}
.add-share-img img{
  width: 100px;
  height: 100px;
  margin-top: 40px;
}
.add-share-img img:hover{
  transform: scale(1.1);
  transition: 300ms ;
}
  </style>

