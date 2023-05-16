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
import { login, validate } from '@/api/default/loginapi'
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
  methods: {
    login() {
      login(this.ruleForm).then((res) => {
        console.log(res.data.data.token)
        if (res.data.success) {
          /* cookie存储token,可持久性储存 */
          setToken('token', res.data.data.token)
          localStorage.setItem('token', res.data.data.token)
          this.$msg({
            content: '登录成功',
            type: 'success'
          })
          this.$router.push('/')
        } else {
          this.$msg({
            content: '登录失败！账号或者密码有误！！',
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
