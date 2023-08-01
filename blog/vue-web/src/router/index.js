import Vue from 'vue'
import { getToken } from '@/utils/author'
import VueRouter from 'vue-router'
import store from '@/store'
import msg from '@/components/default-component/message/index'
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
    component: () => import('@/views/home')
  },
  {
    path: '/more',
    name: 'More',
    meta: { name: '更多', icon: '' },
    component: () => import('@/views/more')
  },
  {
    path: '/more/component',
    name: 'component',
    meta: { name: '组件测试', icon: '' },
    component: () => import('@/views/more/componentTest')
  },
  {
    path: '/more/supermarry',
    name: 'superMarry',
    meta: { name: '超级玛丽', icon: '' },
    /* 如果有index.js  默认先拿js文件，所以这边要加index.vue */
    component: () => import('@/views/more/superMarry/index.vue')
  },
  {
    path: '/message',
    name: 'message',
    meta: { name: '留言', icon: '' },
    component: () => import('@/views/message')
  },
  {
    path: '/aboutme',
    name: 'aboutme',
    meta: { name: '关于我', icon: '' },
    component: () => import('@/views/aboutme')
  },
  {
    path: '/note/essay',
    name: 'Essay',
    meta: { name: '文章', icon: '' },
    component: () => import('@/views/essay')
  },
  {
    path: '/note/project',
    name: 'Project',
    meta: { name: '项目', icon: '' },
    component: () => import('@/views/project')
  },
  {
    path: '/user',
    name: 'User',
    meta: { name: '用户页', icon: '' },
    component: () => import('@/views/user')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { name: '登录', icon: '' },
    component: () => import('@/views/login/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { name: '注册', icon: '' },
    component: () => import('@/views/login/RegisterPage.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const whiteList = ['/user']
  var token = getToken('token')
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      store.dispatch('getUserInfo')
      next()
    }
  } else {
    if (!whiteList.find(e => {
      return e === to.path
    })) {
      next()
    } else {
      msg({
        content: '登录失效，请先登录',
        type: 'warning'
      })
      next('/login')
    }
  }
})

export default router
