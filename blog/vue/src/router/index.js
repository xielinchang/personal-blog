import Vue from 'vue'
import { getToken } from '@/utils/author'
import VueRouter from 'vue-router'
import store from '../store'
import msg from '@/views/component/default-component/message/index'
Vue.prototype.$msg = msg
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
  var token = getToken('token')
  var pathArr = []
  var role_code = ''
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].path.indexOf('control') === 1) {
      pathArr.push(routes[i].path)
    }
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
  if (token) {
    store.dispatch('getUserInfo')
      .then(user => {
        if (Object.keys(user).length > 0) {
          role_code = user.role.code
        }
        if (role_code === 'user') {
          for (let i = 0; i < pathArr.length; i++) {
            if (to.path === pathArr[i]) {
              next({
                path: '/user'
              })
            } else {
              next()
            }
          }
        } else {
          next()
        }
      })
      .catch(error => {
        console.error(error)
        next('/')
      })
  } else {
    // 没登录默认用户为游客
    var usermsg = {
      role: {
        code: 'visitor'
      }
    }
    store.commit('setUserInfo', usermsg)
    role_code = 'visitor'
    for (let i = 0; i < pathArr.length; i++) {
      if (to.path === pathArr[i]) {
        msg({
          content: '请先登录',
          type: 'warning'
        })
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
