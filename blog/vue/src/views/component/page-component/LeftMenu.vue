<template>
  <div>
    <div class="menu animated animate__bounceInDown">
      <div class="menu-container">
        <div class="menu-header">
          <div
            v-for="(item,index) in 3"
            :key="index"
            class="menu-round"
          ></div>
        </div>
        <div class="portrait-box">
          <div class="user-portrait">
            <img
              :src="portrait"
              alt=""
              @contextmenu.prevent="show()"
            >
          </div>
          <ul
            class="logout"
            :style="{display:$store.state.logout.display,opacity:$store.state.logout.opacity}"
          >
            <li @click="logoutUser()">退出登录</li>
          </ul>
          <div
            v-if="token"
            class="user-name"
          >{{ name }}</div>
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
          <img
            :title="'锁住菜单栏'"
            class="lock-btn"
            :style="{'display':lockshow}"
            src="../../../assets/icon/menu/锁/suoding.png"
            alt=""
          >
          <img
            :title="'锁住菜单栏'"
            class="unlock-btn"
            :style="{'display':unlockshow}"
            src="../../../assets/icon/menu/锁/jiesuo.png"
            alt=""
          >
        </div>
        <div class="menu-box">
          <ul class="menu-list">
            <li
              v-for="(item,index) in menu_list"
              :key="index"
            >
              <router-link :to="item.router">
                <img
                  :src="item.menuicon"
                  alt=""
                >
                <div
                  class="menu-name"
                >
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
export default {
  name: 'LeftMenu',
  data () {
    return {
      lock: true,
      lockshow: 'block',
      unlockshow: 'none',
      menu_list: [{
        // menuicon: require('../../../assets/icon/menu/首页.png'),
        title: '首页',
        router: '/'
      }, {
        // menuicon: require('../../../assets/icon/menu/关于.png'),
        title: '关于我',
        router: '/aboutme'
      }, {
        // menuicon: require('../../../assets/icon/menu/pinglun.png'),
        title: '评论',
        router: '/comments'
      }, {
        // menuicon: require('../../../assets/icon/menu/管理.png'),
        title: '管理',
        router: '/essay/control'
      }, {
        // menuicon: require('../../../assets/icon/menu/更多.png'),
        title: '更多',
        router: '/more'
      }],
      logout: {
        display: 'none',
        opacity: 0
      },
      // portrait: require('../../../assets/images/动漫2.webp'),
      token: '',
      name: ''
    }
  },
  watch: {
  },
  mounted () {
    this.menuitemhover()
    if (Cookie.get('token')) {
      this.token = Cookie.get('token')
    } else {
      this.token = localStorage.getItem('token')
    }
    if (this.token) {
      this.name = localStorage.getItem('name')
      this.portrait = process.env.VUE_APP_BASE_API + localStorage.getItem('portrait_url')
    } else {
      // this.portrait = require('../../../assets/images/动漫2.webp')
    }
    window.addEventListener('setName', (e) => {
      this.name = e.newValue
    })
    window.addEventListener('setToken', (e) => {
      this.token = e.newValue
    })
    window.addEventListener('portrait_url', (e) => {
      this.portrait = import.meta.env.VUE_APP_BASE_API + e.newValue
    })
  },
  methods: {
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
      if (this.lock === false) {
        menu.style.left = '0px'
        this.lockshow = 'block'
        this.unlockshow = 'none'
        menu.removeEventListener('mouseover', this.menuover, true)
        menu.removeEventListener('mouseout', this.menuout, true)
        this.lock = true
        return
      }
      if (this.lock === true) {
        this.unlockshow = 'block'
        this.lockshow = 'none'
        menu.style.left = '-54px'
        menu.addEventListener('mouseover', this.menuover, true)
        menu.addEventListener('mouseout', this.menuout, true)
        this.lock = false
        return
      }
    },
    show() {
      this.$store.state.logout.display = 'block'
      this.$store.state.logout.opacity = 1
    },
    logoutUser() {
      Cookie.remove('token')
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      if (this.$route.path !== '/') {
        this.$router.replace('/')
      }
      this.name = ''
      this.token = ''
      // this.portrait = require('../../../assets/images/动漫2.webp')
    }
  }
}
</script>

<style>

.menu{
    width: 70px;
    height: calc(80vh);
    position: fixed;
    left: 0;
    top: 90px;
   transition: 500ms;
   z-index: 9999;
   background: -webkit-linear-gradient(top, rgb(250,250,250 ,0.6),rgb(255, 255, 255,0.75));
  border-radius: 0 12px 12px 0;
}
.menu-container{
    width: 100%;
    height: calc(80vh);
    position: absolute;
    top: 0;
}
.menu-box{
    width: 70px;
    height: calc(60vh);
    zoom: 1;
    position: relative;
}
.menu-header{
  width: 80%;
  height: 15px;
  position: absolute;
  top: 10px;
  margin-left: 10%;
  display: flex;
  justify-content: space-around;
}
.menu-round{
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.menu-round:nth-child(1){
  background: rgb(255, 238, 0);
}
.menu-round:nth-child(2){
  background: rgb(224, 0, 0);
}
.menu-round:nth-child(3){
  background: rgb(1, 221, 206);
}
.portrait-box{
  width: 60px;
  height: 80px;
  position: relative;
  margin: auto;
  margin-top: 50px;
}
.user-portrait{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  margin-left: 5px;
  overflow: hidden;
  z-index: 999;
}
.portrait-box:hover .user-name-login{
  bottom: 0px;
  transition: 300ms;
}
.user-portrait img{
  width: 100%;
  height: 100%;
}
.user-name-login,.user-name{
  width: 100%;
  height: 20px;
  position: absolute;
  bottom: 40px;
  text-align: center;
  font-size: 14px;
  color: rgb(106, 106, 106);
  text-decoration: none;
}
.user-name{
  color: #000000;
  font-family: YouYuan;
  bottom: 0px;
  overflow: hidden;
	text-overflow: ellipsis;
  white-space: nowrap;
}
.user-name-login:hover{
  color: #000000;
}
.lock-box{
  width: 30px;
  height: 40px;
  position: absolute;
  right: -30px;
  top: 30px;
  border-radius: 0 30px 30px 0;
  background: rgb(250,250,250 ,0.6);
  border-left: none;
}
.lock-box img{
  width: 20px;
  height: 20px;
  position: absolute;
  right: 5px;
  top: 8px;
}
.menu-name{
  width: 70px;
  height: 30px;
  text-align: center;
  line-height: 35px;
  position: absolute;
  right: 0px;
  top: 0;
  display: none;
  font-weight: 600;
  color: rgba(217, 141, 0);
}
.menu-list{
  width: 100%;
  height: 90%;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  position: absolute;
  top: 0px;
}
.menu-list li{
  width: 35px;
  height: 30px;
  margin-left: 10px;
  padding: 3px;
  position: relative;
  color: #000;
  font-family: YouYuan;
  font-size: 16px;
  box-shadow: 0 0 0 1px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
  border-radius: 30px;
  border: 1px solid #c0c7cf;
  background: -webkit-linear-gradient(top, rgb(255, 255, 255,0.3), rgba(218, 238, 255, 0.3));
}
.menu-list li  img{
  width: 25px;
  height: 25px;
  margin-left: 5px;
  margin-top: 2px;
}
.menu-list li:hover .menu-name{
  display: block;
}
.menu-list li:hover{
  width: 90px;
  transition: 400ms;
}
.menu-list li img:hover{
  transform: scale(1.1);
  transition: 400ms;
}
.logout{
  width: 80px;
  height: 35px;
  background: white;
  z-index: 9999;
  position: absolute;
  top: 30px;
  left: 30px;
  list-style: none;
  font-size: 12px;
  text-align: center;
  line-height: 35px;
  padding: 0;
  margin: 0;
  border-radius:0px 12px 12px 12px;
  font-family: YouYuan;
  transition: 300ms;
}
</style>
