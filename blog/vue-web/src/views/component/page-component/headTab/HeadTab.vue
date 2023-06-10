<template>
  <div>
    <header
      class="header"
    >
      <div class="header-box">
        <div
          class="back"
        >
          <svg-icon
            color="#F39800"
            icon-name="back"
            size="35px"
            right-title="返回"
            @click="back()"
          />
        </div>
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
      </div>
      <div v-show="haspermi">
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

    </header>
  </div>
</template>

<script>
import SearchBox from './search/search.vue'
import store from '@/store'
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
      stShow: false,
      stIndex: 3
    }
  },
  computed: {
    haspermi() {
      return store.state.hasPermi
    }
  },
  watch: {
    /* 监听路由变化 */
    '$route.path': function (to, from) {
      this.path = this.$router.history.current.path
      this.contract_list.find((item) => {
        if (item.router === this.path) {
          return this.moveLine(item.id)
        }
      })
    }
  },
  created () {
    this.contract_list = this.$store.state.dictionary.menu
    this.secondTab = this.$store.state.dictionary.secondMenu
  },
  async mounted() {
    this.lineMoveIndex()
  },
  methods: {
    back() {
      this.$router.go(-1)
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
          if (item.router === _this.path) {
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
      /* 移出时 */
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
