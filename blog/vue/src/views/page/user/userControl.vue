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
                :image="image"
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
      image: '',
      user: '',
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
        console.log(res)
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
        this.user = res.data.user.rows[0]
        updateUser(this.user).then(res => {
          this.editFlag = !this.editFlag
          this.user.portrait = process.env.VUE_APP_BASE_API + this.portrait[index]
          location.reload()
        })
      })
    },
    uploadCallback: function(file, res, id, index) {
      this.user.portrait = res.data.data.url
      queryUser({ id: id }).then(res => {
        this.user = res.data.user.rows[0]
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
.main{
  width: 60%;
  margin-left: 20%;
  background: rgb(255,255,255,0.7);
   border-radius: 4px;
  height: auto;
  position: relative;
  top: 100px;
  padding: 0 5%;
  padding-top: 40px;
  box-sizing: border-box;
  & ul{
    list-style: none;
    margin: 0;
    padding: 0;
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
  }

}
</style>
