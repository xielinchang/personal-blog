<template>
  <div>
    <TemplatePage></TemplatePage>
    <div
      class="main"
    >
      <div class="user">
        <div class="portrait">
          <img
            :src="prefix+userInfo.user.portrait"
            alt=""
          >
          <my-upload
            v-model="file"
            :action="prefix+uploadUrl"
            :image="image"
            @upload-success="uploadCallback"
          >
          </my-upload>
        </div>
        <div class="user-r">
          <div class="username user-r-item"> 账号：{{ userInfo.user.username }}</div>
          <div class="name user-r-item">
            <div v-if="editFlag">
              <span> 名称：{{ userInfo.user.name }}</span>
              <svg-icon
                icon-name="edit"
                @click="editFlag=!editFlag"
              ></svg-icon>
            </div>
            <div v-else>
              <my-input
                v-model="userInfo.user.name"
                style="float: left; margin-right: 5px;"
              ></my-input>
              <my-button @click="updateName">确认修改</my-button>
            </div>
          </div>

          <div class="identity user-r-item">
            身份：{{ userInfo.role.role_name }}
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
import { getToken } from '@/utils/author'
import { essayQuery } from '@/api/main/essayapi'
import { queryUser, updateUser } from '@/api/default/user'
import store from '@/store'
import Cookie from 'js-cookie'
export default {
  name: 'UserPage',
  data () {
    return {
      essay_list: [],
      editFlag: true,
      // 保存之前的头像路径，以便用于更新的参数
      portrait: '',
      file: {},
      image: '',
      userInfo: {
        user: '',
        role: ''
      },
      prefix: process.env.VUE_APP_BASE_API,
      uploadUrl: '/api/file'
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
      store.dispatch('getUserInfo').then(user => {
        this.userInfo = { ...user }
        var ids = []
        this.essay_list = []
        if (this.userInfo.user.user_detail) {
          ids = this.userInfo.user.user_detail.collect.split(',')
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
              if (res.data.rows[0].tags) {
                res.data.rows[0].tags = res.data.rows[0].tags.split(',')
              }
              res.data.rows[0].coverUrl =
            this.prefix + res.data.rows[0].coverUrl
              if (ids[i] !== '') {
                this.essay_list.push(res.data.rows[0])
              }
            })
          }
        }
      })
    },
    jumpToEssay(item) {
      this.$router.push('/note/essay?id=' + item.id)
    },
    updateName() {
      updateUser(this.user).then(res => {
        this.editFlag = !this.editFlag
        location.reload()
      })
    },
    uploadCallback: function(file, res) {
      updateUser(this.user).then(res => {
      })
    },
    logout() {
      Cookie.remove('token')
      localStorage.removeItem('token')
      localStorage.removeItem('userid')
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
@import "./scss/user";
</style>
