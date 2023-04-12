import Vue from 'vue'
import Cookie from 'js-cookie'
import VueRouter from 'vue-router'
import { queryUser } from '@/api/user'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/page/home/Home.vue')
  },
  {
    path: '/more',
    name: 'More',
    component: () => import('../views/page/more/MorePage.vue')
  },
  {
    path: '/control/essay',
    name: 'EssayControl',
    component: () => import('../views/page/essay/EssayControl.vue')
  },
  {
    path: '/control/share',
    name: 'ShareControl',
    component: () => import('../views/page/shares/ShareControl.vue')
  },
  {
    path: '/control/essay/writing',
    name: 'Writing',
    component: () => import('../views/page/essay/EssayWriting.vue')
  },
  {
    path: '/control/share/writing',
    name: 'WritingShare',
    component: () => import('../views/page/shares/ShareWriting.vue')
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
    path: '/note/share',
    name: 'Share',
    component: () => import('../views/page/shares/SharePage.vue')
  },
  {
    path: '/control/user',
    name: 'UserControl',
    component: () => import('@/views/page/user/user.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/page/user/userControl.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/component/page-component/loginPage/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/component/page-component/registerPage/RegisterPage.vue')
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
  var identity = '游客'
  if (localStorage.getItem('userId')) {
    queryUser({ id: localStorage.getItem('userId') * 1 }).then(res => {
      identity = res.data.user.rows[0].identity
      for (let i = 0; i < pathArr.length; i++) {
        if (to.path === pathArr[i]) {
          if (token && identity === '管理员') {
            next()
          } else if (token && identity === '游客') {
            next({
              path: '/control/user'
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
