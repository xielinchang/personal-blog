import Vue from 'vue'
import Cookie from 'js-cookie'
import VueRouter from 'vue-router'
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
    path: '/essay/control',
    name: 'EssayControl',
    component: () => import('../views/page/essay/EssayControl.vue')
  },
  {
    path: '/share/control',
    name: 'ShareControl',
    component: () => import('../views/page/shares/ShareControl.vue')
  },
  {
    path: '/writing',
    name: 'Writing',
    component: () => import('../views/page/essay/Writing.vue')
  },
  {
    path: '/writing/share',
    name: 'WritingShare',
    component: () => import('../views/page/shares/WritingShare.vue')
  },
  {
    path: '/writing/comments',
    name: 'WritingComments',
    component: () => import('../views/page/comments/WritingComments.vue')
  },
  {
    path: '/writing/record',
    name: 'WritingRecord',
    component: () => import('../views/page/record/WritingRecord.vue')
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
  const identity = localStorage.getItem('identity')
  var pathArr = ['/essay/control', '/share/control', '/writing/comments', '/writing/record']
  for (let i = 0; i < pathArr.length; i++) {
    if (to.path === pathArr[i]) {
      if (token && identity === '管理员') {
        next()
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

export default router
