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
export default {
  name: 'TemplatePage',
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

  }
}
</script>

<style scpoed lang="scss">
@import './index.scss'
</style>

