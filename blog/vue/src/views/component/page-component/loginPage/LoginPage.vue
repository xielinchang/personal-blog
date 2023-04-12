<template>
  <div class="login">
    <div class="shadow">
      <div class="login-conatiner">
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
import Cookie from 'js-cookie'
export default {
  name: 'LoginPage',
  components: {},
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      size: 240
    }
  },
  mounted() {
    const identity = localStorage.getItem('identity')
    /* 如果Cookie和本地存有token则验证身份 */
    if (Cookie.get('token') || localStorage.getItem('token')) {
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
          Cookie.set('token', res.data.token)
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
            content: '失败',
            type: 'warning'
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
.login {
  width: 100%;
  height: calc(100vh);
  background: url('../../../../assets/images/动漫2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.shadow {
  z-index: 1;
  width: 0px;
  height: calc(100%);
  position: fixed;
  background: rgba(169, 169, 169, 0.3);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.login-conatiner {
  width: 400px;
  height: 200px;
  margin-left: 50%;
  transform: translateX(-50%);
  top: calc(30vh);
  z-index: 10000;
  position: fixed;
  border-radius: 12px;
  border: 1px solid #c0c7cf;
  background: rgb(255, 255, 255, 0.6);
  box-shadow: 0 0 0 2px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  & .input {
    margin-left: 15%;
  }
  .btns {
    display: flex;
    justify-content: center;
  }
}
</style>
