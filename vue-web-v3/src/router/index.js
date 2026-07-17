import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '../utils/author'
import { useMainStore } from '../store'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    meta: { name: 'home', icon: '' },
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/message',
    name: 'message',
    meta: { name: 'message', icon: '' },
    component: () => import('@/views/message/index.vue')
  },
  {
    path: '/aboutme',
    name: 'aboutme',
    meta: { name: 'about me', icon: '' },
    component: () => import('@/views/aboutme/index.vue')
  },
  {
    path: '/note/essay',
    name: 'Essay',
    component: () => import('@/views/essay/index.vue')
  },
  {
    path: '/note/project',
    name: 'Project',
    meta: { name: 'project', icon: '' },
    component: () => import('@/views/project/index.vue')
  },
  {
    path: '/user',
    name: 'User',
    meta: { name: 'user page', icon: '' },
    component: () => import('@/views/user/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { name: 'login', icon: '' },
    component: () => import('@/views/login/LoginPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL || '/'),
  routes
})

router.beforeEach((to, from, next) => {
  const whiteList = ['/login', '/home', '/message', '/aboutme', '/note/essay', '/note/project']
  var token = getToken('token')
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      const store = useMainStore()
      store.getUserInfo()
      next()
    }
  } else {
    if (!whiteList.includes(to.path)) {
      return next('/login')
    }
    next()
  }
})

export default router
