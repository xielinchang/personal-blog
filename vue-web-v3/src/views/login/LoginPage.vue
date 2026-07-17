<template>
  <div class="main">
    <TemplatePage :wave="true"></TemplatePage>
    <div class="wrap-box">
      <div class="main-conatiner">
        <div class="login-left">
          <section>
            <span>{{ loginForm.text1 }}</span>
            <button
              plain
              class="register-btn btn"
              type="info"
              @click="turnMode"
            >
              {{ loginForm.buttonText1 }}
            </button>
          </section>
          <img :src="imgurl" alt="" />
        </div>
        <div class="register-left">
          <section>
            <span>{{ registerForm.text1 }}</span>
            <button
              plain
              class="register-btn btn"
              type="info"
              @click="turnMode"
            >
              {{ registerForm.buttonText1 }}
            </button>
          </section>
          <img :src="imgurl" alt="" />
        </div>
        <div class="login-right">
          <span>{{ loginForm.buttonText2 }}</span>
          <div class="input-box">
            <input
              v-model="loginForm.input.username"
              class="input"
              type="text"
              placeholder="Account"
              @input="validateInput('username')"
            >
            <input
              v-model="loginForm.input.password"
              class="input"
              placeholder="Password"
              type="password"
              @input="validateInput('password')"
            >
          </div>
          <button class="login-btn btn" @click="operate">{{ loginForm.buttonText2 }}</button>

        </div>
        <div class="register-right">
          <span>{{ registerForm.buttonText2 }}</span>
          <div class="input-box">
            <input
              v-model="registerForm.input.username"
              class="input"
              type="text"
              placeholder="Account"
              @input="validateInput('username')"
            >
            <input
              v-model="registerForm.input.password"
              class="input"
              placeholder="Password"
              type="password"
              @input="validateInput('password')"
            >
            <input
              v-model="registerForm.input.name"
              class="input"
              placeholder="Name"
            >
          </div>

          <button class="login-btn btn" @click="operate">{{ registerForm.buttonText2 }}</button>

        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { login, register } from '@/api/default/user'
import { defaultPortrait } from '@/api/default/index'
import { setToken } from '@/utils/author'

const router = useRouter()
const message = useMessage()

// 响应式数据
const imgurl = ref(new URL('@/assets/images/动漫1.jpg', import.meta.url).href)
const loginForm = ref({
  input: {
    username: '',
    password: ''
  },
  text1: 'No account?',
  buttonText1: 'register',
  buttonText2: 'Login'
})

const registerForm = ref({
  input: {
    username: '',
    password: '',
    name: '',
    portrait: ''
  },
  text1: 'Already have an account?',
  buttonText1: 'login',
  buttonText2: 'Register'
})

const mode = ref('login')

// 方法
const validateInput = (field) => {
  if (mode.value === 'login') {
    loginForm.value.input[field] = loginForm.value.input[field].replace(/[^a-zA-Z0-9]/g, '')
  } else {
    registerForm.value.input[field] = registerForm.value.input[field].replace(/[^a-zA-Z0-9]/g, '')
  }
}

const operate = () => {
  if (mode.value === 'login') {
    login(loginForm.value.input).then((res) => {
      console.log(res)

      if (res.data.success === true) {
        setToken('token', res.data.token)
        message.success(res.data.msg)
        router.push('/user')
      } else {
        message.error(res.data.msg)
      }
    })
  } else {
    defaultPortrait().then(res => {
      var randomPortrait = Math.floor(
        Math.random() * res.data.length
      )
      registerForm.value.input.portrait = res.data[randomPortrait].url
      register(registerForm.value.input).then((res) => {
        if (res.data.success) {
          message.success(res.data.msg)
          turnMode()
        } else {
          message.warning(res.data.msg)
        }
      })
    })
  }
}

const turnMode = () => {
  const loginLeft = document.querySelector('.login-left')
  const loginRight = document.querySelector('.login-right')
  const registerLeft = document.querySelector('.register-left')
  const registerRight = document.querySelector('.register-right')
  mode.value === 'login' ? mode.value = 'register' : mode.value = 'login'
  if (mode.value === 'login') {
    loginLeft.style.transform = 'translateX(0%)'
    loginLeft.style.opacity = 1
    registerLeft.style.transform = 'translateX(0)'
    registerLeft.style.opacity = 0
    loginRight.style.transform = 'translateY(0%)'
    loginRight.style.opacity = 1
    registerRight.style.transform = 'translateY(0%)'
    registerRight.style.opacity = 0
  } else {
    loginLeft.style.transform = 'translateX(100%)'
    loginLeft.style.opacity = 0
    registerLeft.style.transform = 'translateX(100%)'
    registerLeft.style.opacity = 1
    loginRight.style.transform = 'translateY(100%)'
    loginRight.style.opacity = 0
    registerRight.style.transform = 'translateX(-100%)'
    registerRight.style.opacity = 1
  }
}
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
