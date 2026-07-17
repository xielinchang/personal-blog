<template>
    <div class="login">
        <div class="round" :style="{transform:`translate(${position}) rotate(-40deg)`}"></div>
        <img width="50%" src="../../assets/img/login.svg" alt="">
        <div class="login-container">
            <div class="title">Management Platform</div>
            <div>
              <div class="username">
                <my-input
                    height="50"
                    icon="user"
                    width="400"
                    v-model="loginForm.username"
                    type="text"
                    placeholder="Please enter account"
                />
            </div>
            <div class="password">
                <my-input
                    height="50"
                    icon="lock"
                    width="400"
                    v-model="loginForm.password"
                    type="password"
                    placeholder="Please enter password"
                    @keyup.enter="login"
                />
            </div>
            <div class="login-btn">
                <button @click="login">Login</button>
            </div>
            </div>
           
        </div>
    </div>
</template>

<script>
import { login } from '../../api/login'
import { setToken } from '../../utils/cookie'
export default {
    data() {
        return {
            loginForm: {},
            loginFormRules: {
                username: [{ required: true, message: 'Please enter account', trigger: 'blur' }],
                password: [{ required: true, message: 'Please enter password', trigger: 'blur' }]
            },
            position:''
        }
    },
    mounted () {
      var _this=this
      setTimeout(()=>{
        _this.position='500px,500px'
      })
    },
    methods: {
        login() {
            if (!this.loginForm.username) {
                return this.$message.error('Please enter account')
            }
            if (!this.loginForm.password) {
                return this.$message.error('Please enter password')
            }
            login(this.loginForm).then((res) => {
              console.log(res);
                if (res.success) {
                    setToken('systoken', res.data)
                    this.$message({ message: 'Login successful!', type: 'success' })
                    this.$router.push('/')
                } else {
                    this.$message.error('Login failed! Account or password is incorrect!')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/global.scss';
.login {
  box-sizing: border-box;
  height: 100vh;
    width: 100%;
    overflow: hidden;
  .round{
    width: 2000px;
    height: 1500px;
    border-radius: 50%;
    background: rgb(0, 172, 252);
    position: fixed;
    top: -1000px;
    left: -1500px;
    transition: 1000ms;
  }
  & img{
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .login-container {
    width: 400px;
    height: calc(60vh);
    text-align: center;
    border-radius: 4px;
    position: fixed;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    top: 0%;
    right: 3%;
    padding:200px 50px;
    // @include box-shadow;
    .title {
      font-size: 50px;
      font-weight: 900;
      padding-bottom: 50px;
      color: rgb(0, 172, 252);
    }
    .password,
    .username,
    .login-btn {
      margin-top: 50px;
      position: relative;
    }
    .login-btn {
      button {
        width: 120px;
        height: 50px;
        color: #fff;
        background: rgb(0, 172, 252);
        border: none;
        outline: none;
        cursor: pointer;
        width: 100%;
        font-size: 24px;
        letter-spacing: 5px;
        border-radius: 4px;
      }
    }
    input {
      border: 0;
      border-bottom: 1px solid rgb(197, 197, 197);
      outline: none;
      width: 100%;
      padding: 5px 30px;
      box-sizing: border-box;
    }
    input::-webkit-input-placeholder {
      color: #aab2bd;
      font-size: 14px;
    }
  }
  .input-icon {
    position: absolute;
    top: 50%;
    transform: translate(0px, -50%);
  }
}
</style>
