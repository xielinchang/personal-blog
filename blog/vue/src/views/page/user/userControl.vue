<template>
  <div>
    <TemplatePage></TemplatePage>
    <div class="main">
      <ul class="user-list">
        <li
          v-for="(item,index) in userList"
          :key="item.id"
        >
          <div class="user">
            <div class="portrait">
              <img
                :src="item.portrait"
                alt=""
              >
              <my-upload
                v-model="file"
                :action="uploadUrl"
                @upload-success="uploadCallback($event,item.id,index)"
              >
              </my-upload>
            </div>
            <div class="user-r">

              <div class="username user-r-item"> 账号：{{ item.username }}</div>

              <div class="name user-r-item">
                <div v-if="editFlag">
                  <span> 名称：{{ item.name }}</span>
                  <svg-icon
                    icon-name="edit"
                    @click="editShow(index)"
                  ></svg-icon>
                </div>
                <div v-else>
                  <my-input
                    v-model="item.name"
                    style="float: left; margin-right: 5px;"
                  ></my-input>
                  <my-button @click="updateName(item.id,index)">确认修改</my-button>
                </div>
              </div>

              <div class="identity user-r-item">
                身份：{{ item.identity }}
              </div>
              <div class="logout">
                <my-button
                  v-if="item.identity==='游客'"
                  type="danger"
                  @click="deleteConfirm(item.id)"
                >删除用户</my-button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { queryUser, updateUser, deleteUser } from '@/api/user'
export default {
  name: 'UserManage',
  data () {
    return {
      userList: [],
      editFlag: true,
      // 保存之前的头像路径，以便用于更新的参数
      portrait: [],
      file: {},
      user: [],
      uploadUrl: process.env.VUE_APP_BASE_API + '/api/file'
    }
  },
  watch: {
    '$route.path': function(to, from) {
      this.initUser()
    }
  },
  mounted () {
    this.initUser()
  },
  methods: {
    initUser() {
      this.userList = []
      queryUser().then(res => {
        res.data.user.rows.forEach(item => {
          this.portrait.push(item.portrait)
          item.portrait = process.env.VUE_APP_BASE_API + item.portrait
          this.userList.push(item)
        })

        console.log(this.userList)
      })
    },
    editShow(index) {
      this.editFlag = !this.editFlag
      console.log(this.editFlag)
    },
    updateName(id, index) {
      // 取之前的路径作为参数，保证不改路劲
      this.user.portrait = this.portrait
      queryUser({ id: id }).then(res => {
        console.log(res)
        this.user = res.data.user.rows[0]
        this.user.name = this.userList[index].name
        updateUser(this.user).then(res => {
          this.editFlag = !this.editFlag
          this.user.portrait = process.env.VUE_APP_BASE_API + this.portrait[index]
        })
      })
    },
    uploadCallback(url, id, index) {
      queryUser({ id: id }).then(res => {
        this.user = res.data.user.rows[0]
        this.user.portrait = url
        updateUser(this.user).then(res => {
          this.user.portrait = process.env.VUE_APP_BASE_API + this.portrait[index]
          location.reload()
        })
      })
    },
    deleteConfirm(id) {
      this.$msgBox.confirm({
        title: '提醒',
        content: '要删除吗？一旦删除将不可恢复',
        type: 'danger',
        onOK: () => {
          console.log(id)
          deleteUser({ id: id * 1 }).then(res => {
            console.log(res)
            this.$msg({
              content: '删除成功',
              type: 'success'
            })
            this.initUser()
          })
        },
        onCancel: () => {
          this.$msg({
            content: '已取消',
            type: 'info'
          })
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import "./scss/userControl";
</style>
