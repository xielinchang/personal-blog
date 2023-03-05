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
              @click="moveLine(index)"
            >
              <router-link :to="item.router">
                <svg-icon
                  class="head-icon"
                  :icon-name="item.menuicon"
                  :color="item.color"
                  :data-title="item.title"
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
    </div>
  </div>
</template>

<script>
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
          menuicon: 'comment',
          color: '#1DA9E0',
          title: '评论',
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
      currentIndex: '',
      line_move: 0,
      headshow: false
    }
  },
  watch: {
    /* 监听路由变化 */
    '$route.path': function (to, from) {
      var path = this.$router.history.current.path
      console.log(path)
      if (path === '/') {
        this.headshow = false
      } else {
        /* 处理特殊路径 */
        if (path === '/writing') {
          path = '/writing?id=undefined'
        }
        if (path === '/writing/login') {
          path = '/writing?id=undefined'
        }
        this.headshow = true
        this.contract_list.find((item) => {
          if (item.router === path && item.id !== 0) {
            return this.moveLine(item.id)
          }
        })
      }
    }
  },
  async mounted() {
    document.onmousewheel = function () {
      var header = document.querySelector('.header')
      var foot = document.querySelector('.edit-foot')
      if (document.documentElement.scrollTop < 100) {
        header.style.boxShadow =
          ' 0 1px #d8e0ea, 0 0 transparent, 0 2px rgb(255 255 255)'
      } else {
        header.style.boxShadow =
          '0 1px rgb(64 79 93 / 5%), 0 4px 6px rgb(31 45 61 / 8%), 0 -10px rgb(255 255 255 / 0%)'
      }
    }
    this.lineMoveIndex()
  },
  methods: {
    lineMoveIndex() {
      var _this = this
      var tab = document.querySelectorAll('.item li')
      for (let i = 0; i < this.contract_list.length; i++) {
        tab[i].onmouseover = function () {
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
      index = this.currentIndex
      this.judgeIndex(index)
    },
    judgeIndex(i) {
      /* 根据i调整每个下标对应的移动距离 */
      this.line_move = (i - 1) * 80
    }
  }
}
</script>

<style scoped lang="scss">
@import './HeadTab.scss';
</style>
