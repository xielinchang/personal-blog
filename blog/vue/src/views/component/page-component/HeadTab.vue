<template>
  <div>
    <div
      v-show="headshow"
      class="header"
    >
      <div class="header-box">
        <div class="header-tab">
          <ul class="top-r-tab-item">
            <li
              v-for="(item,index) in contract_list"
              :key="index"
              @click="moveLine(index)"
            >
              <router-link :to="item.router">
                <img
                  :src="item.url"
                  :data-title="item.title"
                  alt=""
                >
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
  data () {
    return {
      contract_list: [
        {
          // url: require('../../../assets/icon/menu/首页.png'),
          title: '首页',
          router: '/',
          id: 0
        }, {
          // url: require('../../../assets/icon/menu/关于.png'),
          title: '关于我',
          router: '/aboutme',
          id: 1
        }, {
          // url: require('../../../assets/icon/menu/pinglun.png'),
          title: '评论',
          router: '/comments',
          id: 2
        }, {
          // url: require('../../../assets/icon/menu/管理.png'),
          title: '管理',
          router: '/essay/control',
          id: 3
        }, {
          // url: require('../../../assets/icon/menu/更多.png'),
          title: '更多',
          router: '/more',
          id: 4
        }
      ],
      tabIndex: '',
      line_move: 0,
      headshow: false
    }
  },
  watch: {
    /* 监听路由变化 */
    '$route.path': function(to, from) {
      var path = this.$router.history.current.path
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
        this.contract_list.find(item => {
          if (item.router === path && (item.id !== 0)) {
            return this.moveLine(item.id)
          }
        })
      }
    }
  },
  async mounted () {
    document.onmousewheel = function () {
      var header = document.querySelector('.header')
      var foot = document.querySelector('.edit-foot')
      if (document.documentElement.scrollTop < 100) {
        header.style.boxShadow = ' 0 1px #d8e0ea, 0 0 transparent, 0 2px rgb(255 255 255)'
      } else {
        header.style.boxShadow = '0 1px rgb(64 79 93 / 5%), 0 4px 6px rgb(31 45 61 / 8%), 0 -10px rgb(255 255 255 / 0%)'
      }
    }

    this.lineMoveIndex()
  },
  methods: {
    lineMoveIndex() {
      var _this = this
      var tab = document.querySelectorAll('.top-r-tab-item li')
      for (let i = 0; i < this.contract_list.length; i++) {
        tab[i].onmouseover = function() {
          _this.judgeIndex(i)
        }
        tab[i].onmouseout = function() {
          _this.moveOutLine(i)
        }
      }
    },
    moveLine(index) {
      /* 如果移入了 */
      this.tabIndex = index
      this.judgeIndex(index)
    },
    moveOutLine(index) {
      index = this.tabIndex
      this.judgeIndex(index)
    },
    judgeIndex(i) {
      /* 根据i调整每个下标对应的移动距离 */
      this.line_move = (i - 1) * 70
    },
    save() {
      this.$message({
        message: '保存成功',
        type: 'success'
      })
    }
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
.header{
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  box-shadow: 0 1px #d8e0ea, 0 0 transparent, 0 2px rgb(255 255 255);
  background: -webkit-linear-gradient(left, rgb(250,250,250 ,0.6), rgb(211, 242, 252,0.6));
  z-index: 999;
}
.header-box{
  width: 100%;
  position: relative;
  left: 0;
}
.header-tab{
  width: 400px;
  height: 55px;
  position: absolute;
  right: 180px;
  top: 10px;
}
.header-tab-main{
  padding: 0;
  margin: 0;
  width: 100%;
  height: 45px;
  position: absolute;
  top: 0;
  list-style: none;
  display: flex;
  justify-content: left;
}
.tab-item div{
  width: 100%;
  height: 40px;
  color: rgb(148, 148, 148);
  transform: skew(20deg);
  font-family: YouYuan;
}
.tab-item div:hover{
  color: rgb(255, 154, 225);
}
.tab-item{
  width: 20%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  margin:0 10px;
  margin-top: 10px;
  font-size: 16px;
  background: -webkit-linear-gradient(right, rgb(252,233,253), rgb(211, 242, 252));
  transform: skew(-20deg);
  border-radius: 30px;
  opacity: 0.95;
  font-weight: 600;
  box-shadow:0 0 0 1px rgb(255 255 255 / 40%) inset, 0 13px 15px rgb(31 45 61 / 15%);
}
.top-r-tab-item{
  width: 80%;
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  list-style: none;
}
.top-r-tab-item li{
  width: 30px;
  height: 30px;
  padding: 15px 20px;
}
.top-r-tab-item li img{
  width: 30px;
  height: 30px;
}
.top-r-tab-item li img:hover{
  transform: scale(1.2);
  transition: 400ms;
}

  .line {
  width: 32px;
  height: 4px;
  background: #7eb12d;
  box-shadow: 0 0 1px 1px #7eb12d;
  border-radius: 2px;
  position: absolute;
  left: 90px;
  top: 54px;
  pointer-events:none;
  transition: 500ms;
}
</style>
