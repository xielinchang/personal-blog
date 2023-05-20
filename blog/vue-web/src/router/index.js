import Vue from 'vue'
import { getToken } from '@/utils/author'
import VueRouter from 'vue-router'
import store from '@/store'
import msg from '@/views/component/default-component/message/index'
Vue.prototype.$msg = msg
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/page/home/Home.vue')
  },
  {
    path: '/more',
    name: 'More',
    component: () => import('../views/page/more/MorePage.vue')
  },
  {
    path: '/more/component',
    name: 'component',
    component: () => import('@/views/page/more/componentTest/index.vue')
  },
  {
    path: '/control/essay',
    name: 'EssayControl',
    component: () => import('../views/page/essay/EssayControl.vue')
  },
  {
    path: '/control/essay/writing',
    name: 'EssayWriting',
    component: () => import('../views/page/essay/EssayWriting.vue')
  },
  {
    path: '/control/message',
    name: 'messageControl',
    component: () => import('../views/page/message/MessageControl.vue')
  },
  {
    path: '/control/record',
    name: 'RecordControl',
    component: () => import('../views/page/record/RecordControl.vue')
  },
  {
    path: '/control/project',
    name: 'ProjectControl',
    component: () => import('../views/page/project/ProjectControl.vue')
  },
  {
    path: '/control/project/writing',
    name: 'ProjectWriting',
    component: () => import('../views/page/project/ProjectWriting.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('../views/page/message/MessagePage.vue')
  },
  {
    path: '/aboutme',
    name: 'aboutme',
    component: () => import('../views/page/aboutme/AboutMe.vue')
  },
  {
    path: '/note/essay',
    name: 'Essay',
    component: () => import('../views/page/essay/EssayPage.vue')
  },
  {
    path: '/note/project',
    name: 'Project',
    component: () => import('../views/page/project/ProjectPage.vue')
  },
  {
    path: '/control/user',
    name: 'UserControl',
    component: () => import('@/views/page/user/userControl.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/page/user/user.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/page/login/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/page/login/RegisterPage.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const whiteList = ['/login']
  var token = getToken('token')
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      store.dispatch('getUserInfo')
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
