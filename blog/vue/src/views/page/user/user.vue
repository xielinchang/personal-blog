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
            if (res.data.rows[0].tags) {
              res.data.rows[0].tags = res.data.rows[0].tags.split(',')
            }

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
@import "./scss/user";
</style>
