<template>
  <div class="register">
    <div class="shadow">
      <div class="register-conatiner">
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
          <el-form-item
            label="名称"
            prop="name"
          >
            <el-input
              v-model="ruleForm.name"
              type="text"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="register-btn"
              type="primary"
              @click="submitForm('ruleForm')"
            >注册</el-button>
            <el-button
              class="login-btn"
              type="default"
              @click="turnToLogin"
            >已有账号</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
import { register } from '@/api/loginapi'
export default {
  name: 'LoginPage',
  components: {
  },
  data () {
    return {
      ruleForm: {
        username: '',
        password: '',
        identity: '游客',
        name: '',
        portrait_url: ''

      },
      // portraitArr: [
      //   '/public/uploads/2022/08/03/1659524422501607.jpg',
      //   '/public/uploads/2022/08/03/1659525306960790.jpg',
      //   '/public/uploads/2022/08/04/1659575550058157.jpg',
      //   '/public/uploads/2022/08/04/1659575588104356.jpg'
      // ],
      rules: {
        username: [
          { required: true, message: '不能没有账号😀', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码还没输呢', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '最好还是取个名字吧', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var randomPortrait = Math.floor(Math.random() * this.portraitArr.length)
          this.ruleForm.portrait_url = this.portraitArr[randomPortrait]
          register(this.ruleForm).then(res => {
            console.log(res)
            if (res.data.success) {
              this.$message({
                message: '注册成功',
                type: 'success'
              })
              this.$router.push('/login')
            } else {
              this.$message.error('账号已存在')
              console.log(res)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    turnToLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

  <style>
  .register{
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
  }
  .register-conatiner{
      width: 400px;
      height: 280px;
      margin-left: 50%;
      transform: translateX(-50%);
      z-index: 10000;
      top: 30%;
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

