<template>
  <div>
    <header
      v-show="$store.state.isHead"
      class="header"
    >
      <div class="header-box">
        <SearchBox class="search-box"></SearchBox>
        <div class="header-tab">
          <ul class="item">
            <li
              v-for="(item, index) in contract_list"
              :key="index"
              @click="changeRouter(index)"
            >
              <router-link :to="item.router">
                <svg-icon
                  class="head-icon"
                  :icon-name="item.menuicon"
                  :color="item.color"
                  :right-title="item.title"
                  size="26px"
                  alt=""
                >
                </svg-icon>
              </router-link>
            </li>
          </ul>
          <div
            class="line"
            :style="{ transform: `translateX(${line_move}px)` }"
          ></div>
        </div>
        <div class="user-center">
          <div v-if="userInfo.name">
            <div
              class="user-portrait"
              right-title="点击打开用户页"
            >
              <router-link to="/user">
                <img
                  v-lazy="prefix + userInfo.portrait"
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
              style="font-size: 14px"
            >
              {{ userInfo.name }}
            </div>
          </div>
          <router-link
            v-else
            to="/login"
          >
            <div class="user-name-login">登录</div>
          </router-link>
        </div>
        <div class="writing-center">
          <a
            target="blank"
            :href="controllerUrl"
          >创作中心</a>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { getToken, removeToken } from '@/utils/author'
import SearchBox from './search/search.vue'
export default {
  name: 'HeadTab',
  components: {
    SearchBox
  },
  data() {
    return {
      contract_list: [],
      secondTab: [],
      currentIndex: '',
      routerIndex: '',
      line_move: 0,
      path: '',
      userInfo: {},
      prefix: process.env.VUE_APP_BASE_API,
      controllerUrl: process.env.VUE_APP_BASE_API_ADMIN,
      logoutShow: false
    }
  },
  watch: {
    /* 监听路由变化 */
    '$route.path': function (to, from) {
      this.path = this.$router.history.current.path
      // 优化
      this.contract_list.find((item) => {
        if (item.router === this.path) {
          return this.moveLine(item.id)
        } else if (this.path === '/note/essay') {
          return this.moveLine(0)
        } else if (this.path === '/note/project') {
          return this.moveLine(1)
        } else if (this.path === '/more/component') {
          return this.moveLine(4)
        } else if (this.path === '/more/superMarry') {
          return this.moveLine(4)
        }
      })
    }
  },
  created() {
    this.contract_list = this.$store.state.dictionary.menu
  },
  async mounted() {
    this.initUser()
    this.lineMoveIndex()
    if (this.$refs.box) {
      document.addEventListener('click', (e) => {
        if (!this.$refs.box.contains(e.target)) {
          this.logoutShow = false
        }
      })
    }
  },
  methods: {
    initUser() {
      this.$store.dispatch('getUserInfo').then((res) => {
        var userInfo = res
        this.userInfo = userInfo
      })
    },
    lineMoveIndex() {
      var _this = this
      var tab = document.querySelectorAll('.item li')
      for (let i = 0; i < this.contract_list.length; i++) {
        tab[i].onmouseover = function () {
          if (i === 3) {
            _this.stShow = true
          } else {
            _this.stShow = false
          }
          _this.judgeIndex(i)
        }
        tab[i].onmouseout = function () {
          _this.moveOutLine(i)
        }
      }
    },
    moveLine(index) {
      /* 如果移入了 */
      this.currentIndex = index
      this.judgeIndex(index)
    },
    moveOutLine(index) {
      /* 移出时 */
      index = this.currentIndex
      this.judgeIndex(index)
    },
    judgeIndex(i) {
      /* 根据i调整每个下标对应的移动距离 */
      this.line_move = i * 80
    },
    changeRouter(index) {
      this.routerIndex = index
      this.moveLine(index)
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
@import "./HeadTab.scss";
</style>
