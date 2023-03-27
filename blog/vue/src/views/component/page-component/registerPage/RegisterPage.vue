<template>
  <div class="register">
    <div class="shadow">
      <div class="register-conatiner">
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
          class="input"
          label="密码："
          icon="lock"
          type="password"
          placeholder="请输入密码"
        ></my-input>
        <my-input
          v-model="ruleForm.name"
          :width="size"
          label="名称："
          icon="user"
          class="input"
          placeholder="请输入名称"
        ></my-input>
        <div class="btns">
          <my-button
            style="margin-right: 20px"
            @click="register"
          >注册</my-button>
          <my-button
            plain
            type="info"
            @click="turnToLogin"
          >返回登录</my-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from '@/api/loginapi'
import { defaultPortrait } from '@/api/api'
export default {
  name: 'LoginPage',
  components: {},
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
        identity: '游客',
        name: '',
        portrait: ''
      },
      size: 240
    }
  },
  methods: {
    register(formName) {
      defaultPortrait().then(res => {
        var randomPortrait = Math.floor(
          Math.random() * res.data.length
        )
        this.ruleForm.portrait = res.data[randomPortrait].url
        console.log(res)
        if (this.ruleForm.username.length < 6 || this.ruleForm.username.length > 12) {
          this.$msg({
            content: '账号长度应该在6位到10位之间',
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
            console.log(res)
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
              console.log(res)
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
.register {
  width: 100%;
  height: calc(100vh);
  background: url(../../../../assets/images/动漫4.jpg);
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
}
.register-conatiner {
  width: 400px;
  height: 220px;
  margin-left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  top: calc(30vh);
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

