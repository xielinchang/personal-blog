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
          <div v-if="userInfo">
            <div
              class="user-portrait"
              right-title="点击打开用户页"
            >
              <router-link to="/user">
                <img
                  v-lazy="prefix+userInfo.portrait"
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
              v-if="userInfo.name"
              class="user-name"
              style="font-size: 14px;"
            >{{ userInfo.name }}</div>
          </div>
          <router-link
            v-else
            to="/login"
          >
            <div
              class="user-name-login"
            >登陆
            </div>
          </router-link>

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
import { getToken, removeToken } from '@/utils/author'
export default {
  name: 'LeftMenu',
  data() {
    return {
      isLock: 'lock',
      menu_list: [],
      userInfo: {},
      logoutShow: false,
      prefix: process.env.VUE_APP_BASE_API
    }
  },
  created() {
    this.menu_list = this.$store.state.dictionary.menu
  },
  mounted() {
    this.initUser()
    this.menuitemhover()
    document.addEventListener('click', (e) => {
      if (!this.$refs.box.contains(e.target)) {
        this.logoutShow = false
      }
    })
  },
  methods: {
    initUser() {
      if (getToken('token')) {
        this.$store.dispatch('getUserInfo').then(res => {
          var userInfo = res
          this.userInfo = userInfo
        })
      } else {
        this.userInfo = null
      }
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
      removeToken('token')
      location.reload()
      this.userInfo = ''
    }
  }
}
</script>

<style scoped lang="scss">
@import './scss/LeftMenu.scss';
</style>
