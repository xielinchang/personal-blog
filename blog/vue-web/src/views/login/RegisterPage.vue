<template>
  <div class="main">
    <img
      v-lazy="imgurl"
      alt=""
    >
    <div class="shadow">
      <div class="main-conatiner">
        <my-input
          v-model="ruleForm.username"
          :width="width"
          :height="height"
          class="input"
          icon="user"
          label="账号："
          placeholder="请输入账号"
        ></my-input>
        <my-input
          v-model="ruleForm.password"
          :width="width"
          :height="height"
          class="input"
          label="密码："
          icon="lock"
          type="password"
          placeholder="请输入密码"
        ></my-input>
        <my-input
          v-model="ruleForm.name"
          :width="width"
          :height="height"
          label="名称："
          icon="user"
          class="input"
          placeholder="请输入名称"
        ></my-input>
        <div class="btns">
          <button
            class="login-btn"
            style="margin-right: 20px"
            @click="register"
          >注册</button>
          <button
            plain
            class="register-btn"
            @click="turnToLogin"
          >返回登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from '@/api/default/user'
import { defaultPortrait } from '@/api/default/index'
export default {
  name: 'LoginPage',
  components: {},
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
        name: '',
        portrait: ''
      },
      imgurl: require('@/assets/images/动漫1.jpg'),
      width: 250,
      height: 40
    }
  },
  methods: {
    register(formName) {
      defaultPortrait().then(res => {
        var randomPortrait = Math.floor(
          Math.random() * res.data.length
        )
        this.ruleForm.portrait = res.data[randomPortrait].url
        if (this.ruleForm.username.length < 6 || this.ruleForm.username.length > 12) {
          this.$msg({
            content: '账号长度应该在6位到12位之间',
            type: 'warning'
          })
          this.ruleForm.username = ''
        } else if (this.ruleForm.password.length < 6 || this.ruleForm.password.length > 20) {
          this.$msg({
            content: '密码长度应该在6位到20位之间',
            type: 'warning'
          })
          this.ruleForm.password = ''
        } else if (this.ruleForm.name.length < 1 || this.ruleForm.name.length > 10) {
          this.$msg({
            content: '名字长度应该在1位到10位之间',
            type: 'warning'
          })
          this.ruleForm.name = ''
        } else {
          register(this.ruleForm).then((res) => {
            if (res.data.success) {
              this.$msg({
                content: '注册成功',
                type: 'success'
              })
              this.$router.push('/login')
            } else {
              this.$msg({
                content: '账号已存在',
                type: 'warning'
              })
            }
          })
        }
      })
    },
    turnToLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scpoed lang="scss">
@import './index.scss';
</style>

