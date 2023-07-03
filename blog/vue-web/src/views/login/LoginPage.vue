<template>
  <div class="main">
    <img
      v-lazy="imgurl"
      alt=""
    >

    <div class="shadow">
      <div
        class="main-conatiner"
        style="height: 250px;"
      >
        <my-input
          v-model="ruleForm.username"
          :width="width"
          :height="height"
          style="padding-bottom: 20px;"
          class="input"
          type="text"
          icon="user"
          label="账号："
          placeholder="请输入账号"
        ></my-input>
        <my-input
          v-model="ruleForm.password"
          :width="width"
          :height="height"
          icon="lock"
          class="input"
          label="密码："
          placeholder="请输入密码"
          type="password"
        ></my-input>
        <div class="btns">
          <button
            class="login-btn"
            @click="login"
          >登 录</button>
          <button
            plain
            class="register-btn"
            type="info"
            @click="turnToRegister"
          >去注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/default/user'
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
      imgurl: require('@/assets/images/动漫1.jpg'),
      width: 250,
      height: 40
    }
  },
  methods: {
    login() {
      login(this.ruleForm).then((res) => {
        console.log(res);
        if (res.data.data.success === true) {
          setToken('token', res.data.data.token)
          this.$msg({
            content: '登录成功',
            type: 'success'
          })
          this.$router.go(-1)
          location.reload()
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

<style scoped lang="scss">
@import './index.scss';
</style>
