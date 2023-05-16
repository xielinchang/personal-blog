import Vue from 'vue'
import Cookie from 'js-cookie'
import VueRouter from 'vue-router'
import store from '../store'
import { queryUser, queryeRoleList, getUserInfo, queryeUserRole } from '@/api/default/user'
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
    name: 'Writing',
    component: () => import('../views/page/essay/EssayWriting.vue')
  },
  {
    path: '/control/comments',
    name: 'CommentsControl',
    component: () => import('../views/page/comments/CommentsControl.vue')
  },
  {
    path: '/control/record',
    name: 'RecordControl',
    component: () => import('../views/page/record/RecordControl.vue')
  },
  {
    path: '/comments',
    name: 'Comments',
    component: () => import('../views/page/comments/CommentsPage.vue')
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
  var token = Cookie.get('token')
  if (Cookie.get('token')) {
    token = Cookie.get('token')
  } else {
    token = localStorage.getItem('token')
  }
  if (to.path === '/login') {
    next()
    if (token) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
  var pathArr = []
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].path.indexOf('control') === 1) {
      pathArr.push(routes[i].path)
    }
  }
  store.dispatch('getUserInfo')
  var role_name = '游客'
  if (localStorage.getItem('userId')) {
    queryUser({ id: localStorage.getItem('userId') * 1 }).then(res => {
      for (let i = 0; i < pathArr.length; i++) {
        if (to.path === pathArr[i]) {
          if (token && role_name === '管理员') {
            next()
          } else if (token && role_name === '游客') {
            next({
              path: '/user'
            })
          } else {
            next({
              path: '/login'
            })
          }
        } else {
          next()
        }
      }
    })
  } else {
    for (let i = 0; i < pathArr.length; i++) {
      if (to.path === pathArr[i]) {
        next({
          path: '/login'
        })
      } else {
        next()
      }
    }
  }
})

export default router
