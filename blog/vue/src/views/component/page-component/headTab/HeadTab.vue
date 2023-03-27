<template>
  <div>
    <div
      v-show="headshow"
      class="header"
    >
      <div class="header-box">
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
      </div>
      <div v-show="identity==='管理员'? true:false">
        <div
          v-show="stShow"
          class="second-tab"
        >
          <ul
            class="second-item"
          >
            <li
              v-for="(item, index) in secondTab"
              :key="index"
            >
              <router-link :to="item.router">
                {{ item.title }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { queryUser } from '@/api/user'
export default {
  name: 'HeadTab',
  data() {
    return {
      contract_list: [
        {
          menuicon: 'home-filled',
          color: '#F5A7B2',
          title: '首页',
          router: '/',
          id: 0
        },
        {
          menuicon: 'about-me',
          color: '#00B753',
          title: '关于我',
          router: '/aboutme',
          id: 1
        },
        {
          menuicon: 'comment-filled',
          color: '#1DA9E0',
          title: '留言',
          router: '/comments',
          id: 2
        },
        {
          menuicon: 'setting-filled',
          color: '#7184AD',
          title: '管理',
          router: '/essay/control',
          id: 3
        },
        {
          menuicon: 'more-filled',
          color: '#FC9709',
          title: '更多',
          router: '/more',
          id: 4
        }
      ],
      secondTab: [
        {
          title: '文章管理',
          router: '/essay/control',
          id: 0
        },
        {
          title: '随笔管理',
          router: '/share/control',
          id: 1
        },
        {
          title: '留言管理',
          router: '/comments/control',
          id: 2
        },
        {
          title: '记录管理',
          router: '/record/control',
          id: 3
        },
        {
          title: '用户管理',
          router: '/user/manage',
          id: 4
        }
      ],
      currentIndex: '',
      routerIndex: '',
      line_move: 0,
      path: '',
      headshow: false,
      stShow: false,
      stIndex: 3,
      identity: ''
    }
  },
  watch: {
    /* 监听路由变化 */
    '$route.path': function (to, from) {
      this.initUser()
      this.path = this.$router.history.current.path
      if (this.path === '/') {
        this.headshow = false
      } else {
        /* 处理特殊路径 */
        if (this.path === '/writing') {
          this.path = '/writing?id=undefined'
        }
        if (this.path === '/writing/login') {
          this.path = '/writing?id=undefined'
        }
        this.headshow = true
        this.contract_list.find((item) => {
          if (item.router === this.path && item.id !== 0) {
            return this.moveLine(item.id)
          }
        })
      }
    }
  },
  async mounted() {
    this.initUser()
    this.lineMoveIndex()
  },
  methods: {
    initUser() {
      queryUser(
        {
          id: localStorage.getItem('userId') * 1
        }
      ).then(res => {
        this.identity = res.data.user.rows[0].identity
      })
    },
    secondTabOut() {
      var _this = this
      var st = document.querySelector('.second-tab')
      st.onmouseover = function() {
        _this.stShow = true
        _this.moveLine(_this.stIndex)
      }
      st.onmouseout = function() {
        _this.stShow = false
        _this.contract_list.find((item) => {
          if (item.router === _this.path && item.id !== 0) {
            return _this.moveLine(item.id)
          }
        })
      }
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
      this.secondTabOut()
    },
    moveLine(index) {
      /* 如果移入了 */
      this.currentIndex = index
      this.judgeIndex(index)
    },
    moveOutLine(index) {
      index = this.currentIndex
      this.judgeIndex(index)
    },
    judgeIndex(i) {
      /* 根据i调整每个下标对应的移动距离 */
      this.line_move = (i - 1) * 80
    },
    changeRouter(index) {
      this.routerIndex = index
      this.moveLine(index)
    }
  }
}
</script>

<style scoped lang="scss">
@import './HeadTab.scss';
</style>
