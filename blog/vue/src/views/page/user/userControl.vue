<template>
  <div>
    <TemplatePage></TemplatePage>
    <div class="main">
      <ul class="user-list">
        <li
          v-for="(item,index) in userList"
          :key="item.id"
        >
          <div
            v-if="(item.username!==$store.state.user.user.username)&&(item.role_name!=='超级管理员')"
            class="user"
          >
            <div class="portrait">
              <img
                :src="prefix + item.portrait"
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
              <div v-if="!item.editFlag">
                <div class="name user-r-item">
                  <span> 名称：{{ item.name }}</span>
                  <svg-icon
                    icon-name="user"
                  ></svg-icon>
                </div>
                <div class="identity user-r-item">
                  身份：{{ item.role_name }}
                </div>
              </div>

              <div v-else>
                <my-input
                  v-model="item.name"
                  style="float: left; margin-right: 5px;"
                ></my-input>
                <my-select
                  style="position: absolute;top: 100px;"
                  :options="options"
                  :selected="selected"
                  @change-select="changeSelect"
                ></my-select>
              </div>

              <div class="btns">
                <my-button
                  v-if="!item.editFlag"
                  @click="item.editFlag=!item.editFlag"
                >修改</my-button>
                <my-button
                  v-else
                  type="success"
                  @click="updateName(item,index)"
                >确认修改</my-button>
                <my-button
                  v-if="hasSuperAdmin"
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
import store from '@/store'
import { queryUser, updateUser, deleteUser, updateUserRole, queryeRoleList, queryeUserRole } from '@/api/default/user'
export default {
  name: 'UserManage',
  data () {
    return {
      userList: [],
      file: {},
      user: [],
      uploadUrl: process.env.VUE_APP_BASE_API + '/api/file',
      prefix: process.env.VUE_APP_BASE_API,
      options: [],
      selected: {
        label: '',
        value: ''
      }
    }
  },
  computed: {
    hasSuperAdmin() {
      return store.state.hasSuperPermi
    }
  },
  watch: {
    '$route.path': function(to, from) {
      this.initUser()
    }
  },
  mounted () {
    this.initUser()
    this.initRoleList()
  },
  methods: {
    initRoleList() {
      queryeRoleList().then(res => {
        console.log(res)
        this.options = []
        res.data.forEach(item => {
          if (item.code !== 'superAdmin') {
            this.options.push({
              label: item.role_name,
              value: item.id
            })
          }
        })
      })
    },
    initUser() {
      this.userList = []
      queryUser().then(res => {
        res.data.user.rows.forEach((item) => {
          queryeUserRole({ user_id: item.id }).then(res => {
            queryeRoleList({ id: res.data.user.role_id }).then(res => {
              Object.assign(item, {
                role_code: res.data[0].role_code,
                role_name: res.data[0].role_name
              })
              item.editFlag = false
              this.userList.push(item)
            })
          })
        })
      })
    },
    changeSelect(label, value) {
      console.log(label, value)
      this.selected.label = label
      this.selected.value = value
    },
    editShow(index) {
      this.userList[index].editFlag = !this.userList[index].editFlag
    },
    updateName(item, index) {
      queryUser({ id: item.id }).then(res => {
        if (this.selected.value !== '' && item.name !== '') {
          updateUserRole({ role_id: this.selected.value * 1, user_id: item.id }).then(res => {
            this.selected = ''
            this.initUser()
          })
        } else {
          location.reload()
          this.$msg({
            content: '名字或身份不能为空',
            type: 'warning'
          })
        }

        this.user = res.data.user.rows[0]
        this.user.name = this.userList[index].name
        updateUser(this.user).then(res => {
          this.editShow(index)
        })
      })
    },
    uploadCallback(url, id, index) {
      queryUser({ id: id }).then(res => {
        this.user = res.data.user.rows[0]
        this.user.portrait = url
        updateUser(this.user).then(res => {
          this.user.portrait = this.prefix + this.portrait[index]
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
