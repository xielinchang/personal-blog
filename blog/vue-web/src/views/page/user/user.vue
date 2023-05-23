<template>
  <div>
    <TemplatePage></TemplatePage>
    <div
      class="main"
    >
      <div class="user">
        <div class="portrait">
          <img
            v-lazy="prefix+userInfo.portrait"
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
          <div class="username user-r-item"> 账号：{{ userInfo.username }}</div>
          <div class="name user-r-item">
            <div v-if="editFlag">
              <span> 名称：{{ userInfo.name }}</span>
              <svg-icon
                icon-name="edit"
                @click="editFlag=!editFlag"
              ></svg-icon>
            </div>
            <div v-else>
              <my-input
                v-model="userInfo.name"
                style="float: left; margin-right: 5px;"
              ></my-input>
              <my-button
                style="float: left; margin-right: 5px;"
                type="primary"
                @click="editFlag=!editFlag"
              >取消修改</my-button>
              <my-button
                type="success"
                @click="updateName"
              >确认修改</my-button>
            </div>
          </div>
          <div
            v-if="changePswFlag"
            class="change-psw"
          >
            <my-input
              v-model="changePswForm.old_pass"
              label="原密码"
              placeholder="请输入原密码"
            ></my-input>
            <my-input
              v-model="changePswForm.pass"
              label="新密码"
              placeholder="请输入6-20位的新密码"
              style="margin-top: 10px;"
            ></my-input>
          </div>
          <div class="btns">
            <div
              v-if="!changePswFlag"
              style="display: flex;"
            >
              <my-button
                style="margin-right: 10px;"
                type="primary"
                @click="changePswInit"
              >修改密码</my-button>
              <my-button
                type="danger"
                @click="logout"
              >退出登录</my-button>
            </div>
            <div
              v-else
              style="display: flex;"
            >
              <my-button
                style="margin-right: 10px;"
                type="primary"
                @click="changePswFlag=!changePswFlag"
              >取消修改</my-button>
              <my-button
                type="success"
                @click="changePswCheck"
              >确认修改</my-button>
            </div>

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
import { essayQuery } from '@/api/main/essay'
import { changePsw } from '@/api/default/user'
import store from '@/store'
import { getToken, removeToken } from '@/utils/author'
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
      userInfo: {},
      prefix: process.env.VUE_APP_BASE_API,
      uploadUrl: process.env.VUE_APP_BASE_API + '/api/file',
      changePswForm: {},
      changePswFlag: false
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
    changePswInit() {
      this.changePswFlag = true
      this.changePswForm = {
        old_pass: '',
        pass: ''
      }
    },
    initEssayList() {
      if (getToken('token')) {
        this.$store.dispatch('getUserInfo').then(user => {
          var userInfo = user
          this.userInfo = userInfo
          var ids = []
          this.essay_list = []
          if (this.userInfo.user_detail !== null) {
            ids = this.userInfo.user_detail.collect.split(',')
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
                if (res) {
                  res.data.rows[0].tags = res.data.rows[0].tags.split(',')
                  res.data.rows[0].coverUrl =
            this.prefix + res.data.rows[0].coverUrl
                }
                if (ids[i] !== '') {
                  this.essay_list.push(res.data.rows[0])
                }
              })
            }
          }
        })
      }
    },
    uploadCallback() {

    },
    jumpToEssay(item) {
      this.$router.push('/note/essay?id=' + item.id)
    },
    changePswCheck() {
      console.log(this.changePswForm)
      if (this.changePswForm.old_pass !== '' &&
          this.changePswForm.pass !== '' &&
          this.changePswForm.pass.length > 6) {
        changePsw(this.changePswForm).then(res => {
          this.$msg({
            type: 'success',
            content: res.data.msg
          })
          this.logout()
        })
      } else {
        this.$msg({
          content: '请按规定填写信息',
          type: 'warning'
        })
      }
    },
    logout() {
      removeToken('token')
      if (this.$route.path !== '/') {
        this.$router.replace('/')
      }
      location.reload()
    }
  }

}
</script>
<style lang='scss' scoped>
@import "./scss/user";
</style>
