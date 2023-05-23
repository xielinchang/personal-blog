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
    meta: { name: '首页', icon: '' },
    component: () => import('../views/page/home/Home.vue')
  },
  {
    path: '/more',
    name: 'More',
    meta: { name: '更多', icon: '' },
    component: () => import('../views/page/more/MorePage.vue')
  },
  {
    path: '/more/component',
    name: 'component',
    meta: { name: '组件测试', icon: '' },
    component: () => import('@/views/page/more/componentTest/index.vue')
  },
  {
    path: '/message',
    name: 'message',
    meta: { name: '留言', icon: '' },
    component: () => import('../views/page/message/MessagePage.vue')
  },
  {
    path: '/aboutme',
    name: 'aboutme',
    meta: { name: '关于我', icon: '' },
    component: () => import('../views/page/aboutme/AboutMe.vue')
  },
  {
    path: '/note/essay',
    name: 'Essay',
    meta: { name: '文章', icon: '' },
    component: () => import('../views/page/essay/EssayPage.vue')
  },
  {
    path: '/note/project',
    name: 'Project',
    meta: { name: '项目', icon: '' },
    component: () => import('../views/page/project/ProjectPage.vue')
  },
  {
    path: '/user',
    name: 'User',
    meta: { name: '用户页', icon: '' },
    component: () => import('@/views/page/user/user.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { name: '登录', icon: '' },
    component: () => import('../views/page/login/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { name: '注册', icon: '' },
    component: () => import('../views/page/login/RegisterPage.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // const whiteList = ['/login']
  var token = getToken('token')
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      store.dispatch('getUserInfo')
      next()
    }
  } else {
    next()
  }
})

export default router
