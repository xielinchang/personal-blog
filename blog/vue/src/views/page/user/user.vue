<template>
  <div>
    <TemplatePage></TemplatePage>
    <div
      class="main"
    >
      <div class="user">
        <div class="portrait">
          <img
            :src="user.portrait"
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
        <div class="user-r">

          <div class="username user-r-item"> 账号：{{ user.username }}</div>

          <div class="name user-r-item">
            <div v-if="editFlag">
              <span> 名称：{{ user.name }}</span>
              <svg-icon
                icon-name="edit"
                @click="editFlag=!editFlag"
              ></svg-icon>
            </div>
            <div v-else>
              <my-input
                v-model="user.name"
                style="float: left; margin-right: 5px;"
              ></my-input>
              <my-button @click="updateName">确认修改</my-button>
            </div>
          </div>

          <div class="identity user-r-item">
            身份：{{ user.identity }}
          </div>
          <div class="logout">
            <my-button
              type="danger"
              @click="logout"
            >退出登录</my-button>
          </div>
        </div>
      </div>
      <span
        v-if="essay_list.length>0"
        style="font-family: YOUYUAN;"
      >收藏：</span>
      <ul>
        <li
          v-for="(item, index) in essay_list"
          :key="index"
          class="essay-list-item"
        >
          <img
            class="control-item-img"
            :src="item.coverUrl"
            @click="jumpToEssay(item)"
          />
          <div
            class="control-item-right"
            @click="jumpToEssay(item)"
          >
            <div class="control-item-time">{{ item.updated_at }}</div>
            <div
              class="control-item-title"
              :right-title="item.title"
            >
              {{ item.title }}
            </div>
            <div
              class="item-sub-title"
              :right-title="item.subtitle"
            >
              {{ item.subtitle }}
            </div>
            <ul class="control-item-type">
              <li
                v-for="(item, index) in essay_list[index].tags"
                :key="index"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { essayQuery } from '@/api/essayapi'
import { queryUser, updateUser } from '@/api/user'

import Cookie from 'js-cookie'
export default {
  name: 'UserPage',
  data () {
    return {
      user: '',
      essay_list: [],
      editFlag: true,
      // 保存之前的头像路径，以便用于更新的参数
      portrait: '',
      file: {},
      image: '',
      uploadUrl: process.env.VUE_APP_BASE_API + '/api/file'
    }
  },
  watch: {
    '$route.path': function(to, from) {
      this.initEssayList()
    }
  },
  mounted() {
    this.initEssayList()
  },
  methods: {
    initEssayList() {
      this.essay_list = []
      queryUser({ id: localStorage.getItem('userId') * 1 }).then(res => {
        console.log(res)
        this.user = res.data.user.rows[0]
        this.portrait = this.user.portrait
        this.user.portrait = process.env.VUE_APP_BASE_API + this.user.portrait
        const ids = this.user.user_detail.collect.split(',')
        for (let i = 0; i < ids.length; i++) {
          essayQuery({
            limit: 999,
            offset: 1,
            query: {
              id: Number(ids[i]),
              title: undefined,
              subtitle: undefined,
              domain: undefined
            }
          }).then((res) => {
            res.data.rows[0].tags = res.data.rows[0].tags.split(',')
            res.data.rows[0].coverUrl =
            process.env.VUE_APP_BASE_API + res.data.rows[0].coverUrl
            if (ids[i] !== '') {
              this.essay_list.push(res.data.rows[0])
            }
          })
        }
      })
    },
    jumpToEssay(item) {
      this.$router.push('/note/essay?id=' + item.id)
    },
    updateName() {
      // 取之前的路径作为参数，保证不改路劲
      this.user.portrait = this.portrait
      updateUser(this.user).then(res => {
        this.editFlag = !this.editFlag
        this.user.portrait = process.env.VUE_APP_BASE_API + this.portrait
        location.reload()
      })
    },
    uploadCallback: function(file, res) {
      this.user.portrait = res.data.data.url
      updateUser(this.user).then(res => {
        this.user.portrait = process.env.VUE_APP_BASE_API + this.portrait
        location.reload()
      })
    },
    logout() {
      Cookie.remove('token')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      if (this.$route.path !== '/') {
        this.$router.replace('/')
      }
      this.token = ''
      this.user = ''
    }
  }

}
</script>
<style lang='scss' scoped>
.main{
  width: 60%;
  margin-left: 20%;
  border-radius: 4px;
  height: auto;
  background: rgb(255,255,255,0.7);
  position: relative;
  top: 100px;
  padding: 20px 3%;
  padding-top: 40px;
  box-sizing: border-box;
  .user{
    width: 100%;
    margin-bottom: 20px;
    min-height: 200px;
    height: auto;
    background: rgb(255,255,255,0.6);
    font-family: YOUYUAN;
    border-radius: 4px;
    position: relative;
    .portrait{
      width: 80px;
      height: 80px;
      position: absolute;
      left: 5%;
      top: 5%;
      & img{
        position: absolute;
        top: 0;
        border-radius: 4px;
        width: 100%;
        height: 100%;
      }
    }
    .user-r{
      position: absolute;
      width: calc(100% - 100px - 5%);
      height: 100%;
      right: 0;
      box-sizing: border-box;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: top;
      & span{
        margin-right: 10px;
        float: left;
      }
      .user-r-item{
        margin-bottom: 10px;
      }
      .logout{
        position: absolute;
        bottom: 20px;
        right: 20px;
      }
    }
  }
  & ul {
        width: 100%;
        height: auto;
        margin: auto;
        margin-top: 20px;
        padding: 0;
        list-style: none;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
       .essay-list-item {
          width: 48%;
          height: 155px;
          margin-bottom: 10px;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 13px 15px rgb(31 45 61 / 15%);
          & .close {
            position: absolute;
            right: 10px;
            top: 10px;
            width: 15px;
            height: 15px;
            z-index: 999;
            opacity: 0.3;
          }
          .control-item-img {
            width: 40%;
            height: 100%;
            overflow: hidden;
            position: absolute;
            top: 0;
          }
          .control-item-right {
            width: 60%;
            height: 100%;
            right: 0;
            position: absolute;
            background: rgb(255, 255, 255, 0.8);
            bottom: 0;
            .control-item-time {
              width: 100%;
              height: 20px;
              font-size: 14px;
              color: rgb(155, 155, 155);
              position: absolute;
              margin-left: 10px;
              margin-top: 15px;
            }
            .control-item-title,
            .item-sub-title {
              width: 90%;
              height: 30px;
              font-size: 16px;
              font-weight: 400;
              font-family: YouYuan;
              margin-left: 10px;
              position: absolute;
              top: 40px;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .item-sub-title {
              top: 65px;
              font-size: 14px;
              color: rgb(117, 117, 117);
            }
            .control-item-type {
              list-style: none;
              width: 100%;
              position: absolute;
              bottom: 10px;
              height: 26px;
              padding: 0;
              display: flex;
              justify-content: left;
              & li {
              min-width: 30px;
              padding: 0 5px;
              width: auto;
              height: 20px;
              background: #e1f6da;
              color: #45c717;
              font-weight: 500;
              border-radius: 4px;
              text-align: center;
              line-height: 20px;
              font-size: 12px;
              margin-left: 10px;
              &:nth-child(2) {
                background: #def1ff;
                color: #31a8ff;
              }
            }
            }
          }
          .add-essay-container {
            width: 100%;
            height: 100%;
            background: rgb(255, 255, 255, 0.7);
            .add-essay {
              width: 60%;
              height: 100%;
              margin: auto;
              & .add {
                text-align: center;
                width: 70px;
                height: 70px;
                left: 50%;
                transform: translateX(-50%);
                top: 40px;
              }
            }

          }
        }
      }
}

</style>
