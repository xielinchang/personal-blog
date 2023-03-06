<template>
  <div class="login">
    <div class="shadow">
      <div class="login-conatiner">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="账号"
            prop="username"
          >
            <el-input
              v-model="ruleForm.username"
              type="text"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
          >
            <el-input
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login-btn"
              type="primary"
              @click="submitForm('ruleForm')"
            >登录</el-button>
            <el-button
              class="register-btn"
              type="default"
              @click="turnToRegister"
            >去注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
import { login, validate } from '@/api/loginapi'
import Cookie from 'js-cookie'
export default {
  name: 'LoginPage',
  components: {
  },
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '需登录后才能运用此模块', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '需登录后才能运用此模块', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    const identity = localStorage.getItem('identity')
    /* 如果Cookie和本地存有token则验证身份 */
    if (Cookie.get('token') || localStorage.getItem('token')) {
      if (identity === '游客') {
        this.$message({
          message: '您目前是游客身份，请登录管理员账号',
          type: 'warning'
        })
      } else if (identity === '管理员') {
        this.$router.push('/essay/control')
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.ruleForm).then(res => {
            if (res.data.success) {
              /* cookie存储token,可持久性储存 */
              Cookie.set('token', res.data.token)
              /* 本地储存，只在会话中储存，会话结束后销毁 */
              localStorage.setItem('token', res.data.token)
              validate().then(res => {
                console.log(res)
                var identity = res.data.user.identity
                localStorage.setItem('identity', identity)
                localStorage.setItem('name', res.data.user.name)
                localStorage.setItem('portrait_url', res.data.user.portrait_url)
                if (res.data.success) {
                  this.$message({
                    message: '欢迎 ' + res.data.user.identity + ' ' + res.data.user.name,
                    type: 'success'
                  })
                }
                this.$router.push('/')
              })
            } else {
              this.$message.error(res.data.msg)
            }
          })
        } else {
          return false
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
.login{
  width: 100%;
  height: calc(100vh);
  background: url(../../../../assets/images/动漫1.webp);
  background-repeat: no-repeat;
  background-size: cover;
}
.shadow{
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
.login-conatiner{
    width: 400px;
    height: 200px;
    margin-left: 50%;
    transform: translateX(-50%);
    top: 30%;
    z-index: 10000;
    position: fixed;
    border-radius: 12px;
    border: 1px solid #c0c7cf;
    background: rgb(255,255,255,0.6);
    box-shadow: 0 0 0 2px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
    padding-top: 50px;
    padding-right: 80px;

}
.login-btn,.register-btn{
  margin-left: 25%;
}
</style>
