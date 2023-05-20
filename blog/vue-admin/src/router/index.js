/*
 * @Descripttion:
 * @version:
 * @Author: Liu ZiJie
 * @Date: 2022-03-14 11:03:42
 * @LastEditors: Liu ZiJie
 * @LastEditTime: 2022-07-06 16:26:05
 */
import Vue from 'vue'
import { getToken } from '../utils/cookie'
import { roleMenu } from '@/api/login'
import store from '../store'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export const constantRoutes = [
    {
        path: '/login',
        name: 'Login',
        hidden: '1',
        component: () => import('../views/login/Login.vue')
    },
    {
        path: '/change/psw',
        component: () => import('../views/index/Home.vue'),
        redirect: '/change/psw',
        hidden: '1',
        children: [
            {
                path: '',
                component: () => import('@/views/index/ChangePsw'),
                name: 'ChangePsw',
                hidden: '0',
                meta: { title: '修改密码', icon: '' }
            }
        ]
    },
    {
        path: '*',
        component: () => import('@/views/index/404'),
        hidden: '1'
    }
]

// 防止连续点击多次路由报错
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
    mode: 'hash',
    routes: constantRoutes
})

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || '系统'
    const token = getToken('token')
    if (token) {
        if (to.path === '/login') {
            next('/')
        } else {
            if (store.getters.addRouters.length === 0) {
                roleMenu().then(res => {
                    store.dispatch('generateRoutes', res.data).then(() => {
                        store.getters.addRouters.forEach(item => {
                            router.addRoute(item)
                        })
                        next({ ...to, replace: true })
                    })
                })
                store.dispatch('getCurUserInfo')
            } else {
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
        }
    }
})

router.afterEach((to, from) => {
    setKeepAlive(to)
})

function setKeepAlive(to) {
    if (to.meta.keep_alive === '1') {
        store.commit('setKeepAlive', to.name)
    }
}

export default router

