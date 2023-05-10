<template>
  <div class="main">
    <div class="shadow">

      <div class="main-conatiner">
        <my-input
          v-model="ruleForm.username"
          :width="size"
          class="input"
          icon="user"
          label="账号："
          placeholder="请输入账号"
        ></my-input>
        <my-input
          v-model="ruleForm.password"
          :width="size"
          icon="lock"
          class="input"
          label="密码："
          placeholder="请输入密码"
          type="password"
        ></my-input>
        <div class="btns">
          <my-button
            style="margin-right: 20px"
            @click="login"
          >登录</my-button>
          <my-button
            plain
            type="info"
            @click="turnToRegister"
          >去注册</my-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, validate } from '@/api/loginapi'
import { setToken, getToken } from '@/utils/author'
export default {
  name: 'LoginPage',
  components: {},
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      size: 300
    }
  },
  mounted() {
    const identity = localStorage.getItem('identity')
    /* 如果Cookie和本地存有token则验证身份 */
    if (getToken() || localStorage.getItem('token')) {
      if (identity === '游客') {
        this.$router.push('/control/user')
      } else if (identity === '管理员') {
        this.$router.push('/control/essay')
      }
    }
  },
  methods: {
    login() {
      login(this.ruleForm).then((res) => {
        console.log(res)
        if (res.data.success) {
          /* cookie存储token,可持久性储存 */
          setToken(res.data.token, 60 * 60 * 48)
          localStorage.setItem('token', res.data.token)
          validate().then((res) => {
            /* 本地储存 */
            localStorage.setItem('userId', res.data.user.id * 1)
            if (res.data.success) {
              this.$msg({
                content:
                      '欢迎 ' +
                      res.data.user.identity +
                      ' ' +
                      res.data.user.name,
                type: 'success'
              })
              setTimeout(() => {
                location.reload()
              }, 100)
            }
          })
        } else {
          this.$msg({
            content: res.data.msg,
            type: 'danger'
          })
        }
      })
    },
    turnToRegister() {
      this.$router.push('/register')
    }
  }
}
</script>

<style scpoed lang="scss">
@import './index.scss'
</style>
