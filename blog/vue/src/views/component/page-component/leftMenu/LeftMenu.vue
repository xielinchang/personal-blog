<template>
  <div>
    <div class="menu animated animate__bounceInDown">
      <div class="menu-container">
        <div class="menu-header">
          <div
            v-for="(item, index) in 3"
            :key="index"
            class="menu-round"
          ></div>
        </div>
        <div class="portrait-box">
          <div
            v-show="user.portrait"
            class="user-portrait"
            right-title="点击打开用户页"
          >
            <router-link to="/control/essay">
              <img
                :src="user.portrait"
                @contextmenu.prevent="show()"
              />
            </router-link>

          </div>
          <ul
            v-show="logoutShow"
            class="logout"
          >
            <li
              ref="box"
              @click="logoutUser()"
            >退出登录</li>
          </ul>
          <div
            v-if="token"
            class="user-name"
            style="font-size: 14px;"
          >{{ user.name }}</div>
          <div
            v-else
            class="user-name-login"
            @click="jumpToLogin"
          >登陆</div>
        </div>
        <div
          class="lock-box"
          @click="menulock"
        >
          <svg-icon
            size="20px"
            :icon-name="isLock"
            class="lock-btn"
            alt=""
          >
          </svg-icon>
        </div>
        <div class="menu-box">
          <ul class="menu-list">
            <li
              v-for="(item, index) in menu_list"
              :key="index"
            >
              <router-link :to="item.router">
                <svg-icon
                  class="svg-icon"
                  size="24px"
                  :color="item.color"
                  :icon-name="item.menuicon"
                  alt=""
                />
                <div class="menu-name">
                  {{ item.title }}
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import { queryUser, updateUser } from '@/api/user'
export default {
  name: 'LeftMenu',
  data() {
    return {
      isLock: 'lock',
      menu_list: [
        {
          menuicon: 'home-filled',
          color: '#F5A7B2',
          title: '首页',
          router: '/home'
        },
        {
          menuicon: 'about-me',
          color: '#00B753',
          title: '关于我',
          router: '/aboutme'
        },
        {
          menuicon: 'comment-filled',
          color: '#1DA9E0',
          title: '留言',
          router: '/comments'
        },
        {
          menuicon: 'setting-filled',
          color: '#7184AD',
          title: '管理',
          router: '/control/essay'
        },
        {
          menuicon: 'more-filled',
          color: '#FC9709',
          title: '更多',
          router: '/more'
        }
      ],
      user: {
        userId: null,
        portrait: '',
        name: ''
      },
      token: '',
      logoutShow: false

    }
  },
  watch: {
    '$route.path': function(to, from) {
      this.initUser()
    }
  },
  mounted() {
    this.menuitemhover()
    document.addEventListener('click', (e) => {
      if (!this.$refs.box.contains(e.target)) {
        this.logoutShow = false
      }
    })
    this.initUser()
  },
  methods: {
    initUser() {
      this.user.userId = localStorage.getItem('userId') * 1
      if (Cookie.get('token')) {
        this.token = Cookie.get('token')
      } else {
        this.token = localStorage.getItem('token')
      }
      if (this.token) {
        if (this.user.userId !== '') {
          queryUser({ id: this.user.userId * 1 }).then(res => {
            this.user = res.data.user.rows[0]
            this.user.portrait = process.env.VUE_APP_BASE_API + res.data.user.rows[0].portrait
          })
        } else {
          this.user.name = null
          this.user.portrait = ''
        }
      } else {
        this.user.name = null
        this.user.portrait = ''
      }
    },
    jumpToLogin() {
      this.$router.push('/login')
    },
    menuitemhover() {
      var menuitem = document.querySelectorAll('.menu-list li')
      for (let i = 0; i < menuitem.length; i++) {
        menuitem[i].addEventListener('mouseover', this.menuitemover, true)
        menuitem[i].addEventListener('mouseout', this.menuitemout, true)
      }
    },
    menuitemover() {
      var menu = document.querySelector('.menu')
      menu.style.width = '115px'
    },
    menuitemout() {
      var menu = document.querySelector('.menu')
      menu.style.width = '70px'
    },
    menuover() {
      var menu = document.querySelector('.menu')
      menu.style.left = 0
    },
    menuout() {
      var menu = document.querySelector('.menu')
      menu.style.left = '-65px'
    },
    menulock() {
      var menu = document.querySelector('.menu')
      if (this.isLock === 'unlock') {
        this.isLock = 'lock'
        menu.style.left = '0px'
        menu.removeEventListener('mouseover', this.menuover, true)
        menu.removeEventListener('mouseout', this.menuout, true)
        this.lock = true
        return
      } else {
        this.isLock = 'unlock'
        menu.style.left = '-54px'
        menu.addEventListener('mouseover', this.menuover, true)
        menu.addEventListener('mouseout', this.menuout, true)
        this.lock = false
        return
      }
    },
    show() {
      this.logoutShow = true
    },
    logoutUser() {
      this.logoutShow = false
      Cookie.remove('token')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      location.reload()
      // if (this.$route.path !== '/') {
      //   this.$router.replace('/')
      // }
      this.user = ''
      this.token = ''
    }
  }
}
</script>

<style scoped lang="scss">
@import './scss/LeftMenu.scss';
</style>
