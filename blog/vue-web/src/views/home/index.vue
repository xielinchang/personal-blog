<template>
  <div
    v-cloak
    class="home"
  >
    <img
      v-lazy="bgshadow"
      class="bg-shadow"
      alt=""
    />
    <div
      class="banner"
      @mouseenter="bannerIn"
      @mouseleave="bannerOut"
    >

      <div
        v-for="(item,index) in bannerList"
        :key="item.id"
        class="banner-mark"
        :style="{opacity:index===bannerIndex?1:0,zIndex:index===bannerIndex?3:0}"
      >
        <router-link :to="'/note/essay?id='+item.id">
          <div class="mark-shadow"></div>

          <img
            v-lazy="item.coverUrl"
            class="mark"
          >

          <img
            v-lazy="item.coverUrl"
            :style="{zIndex:index===bannerIndex?3:0}"
            alt=""
          >

          <div class="banner-tit-box">
            <div class="banner-title">{{ item.title }}</div>
            <div class="banner-line"></div>
            <div class="banner-subtitle">{{ item.subtitle }}</div>
          </div>
        </router-link>
      </div>
      <div
        class="banner-btn left"
        @click="bannerPre"
      >
        <svg-icon
          size="25px"
          color="#F39800"
          class="banner-svg"
          right-title="上一页"
          icon-name="left"
        ></svg-icon>
      </div>

      <div
        class="banner-btn right"
        @click="bannerNext"
      >
        <svg-icon
          size="25px"
          color="#00B753"
          class="banner-svg"
          left-title="下一页"
          icon-name="right"
        ></svg-icon>
      </div>
      <ul
        class="banner-dot"
        style="z-index: 4;"
      >
        <li
          v-for="(item,index) of 5"
          :key="index"
          :style="{boxShadow:index===bannerIndex?'0 0 5px .1px #fff':''}"
          @click="bannerJump(index)"
        ></li>
      </ul>
    </div>
    <!-- 文章 -->
    <div
      class="main"
    >
      <essayList class="essay-list"></essayList>
      <right-tab
        id="right-tab"
        class="right-tab"
        width="23"
        height="500"
      ></right-tab>
    </div>

  </div>
</template>

<script>
import { homeBg } from '@/api/default/index'
import { essayQuery } from '@/api/main/essay'
import { shuffleArray } from '@/utils/tool'
export default {
  name: 'HomePage',
  data() {
    return {
      CurrentIndex: 0,
      bgimg: '',
      mainimg: '',
      bgshadow: '',
      topShow: true,
      bannerList: [],
      bannerIndex: 0,
      bannerPause: null,
      bannerTime: 4000
    }
  },

  computed: {},
  watch: {

  },
  async mounted() {
    this.initBg()
    this.initBanner()
    this.bannerTimer()
  },
  methods: {

    initBanner() {
      essayQuery({
        limit: 999,
        offset: 1,
        query: {
          title: undefined,
          domain: undefined,
          tags: undefined
        }
      }).then(res => {
        var data = res.data.rows
        var bannerList = shuffleArray(data)
        bannerList.forEach((item, index) => {
          if (index < 5) {
            item.coverUrl = process.env.VUE_APP_BASE_API + item.coverUrl
            this.bannerList.push(item)
          }
        })
      })
    },
    initBg() {
      homeBg().then((res) => {
        this.bgshadow = process.env.VUE_APP_BASE_API + res.data[0].url
      })
    },
    bannerPre() {
      if (this.bannerIndex === 0) {
        this.bannerIndex = this.bannerList.length - 1
      } else {
        this.bannerIndex--
      }
    },
    bannerNext() {
      if (this.bannerIndex === this.bannerList.length - 1) {
        this.bannerIndex = 0
      } else {
        this.bannerIndex++
      }
    },
    bannerTimer() {
      var _this = this
      this.bannerPause = setInterval(() => {
        _this.bannerNext()
      }, this.bannerTime)
    },
    bannerIn() {
      clearInterval(this.bannerPause)
    },
    bannerOut() {
      this.bannerTimer()
    },
    bannerJump(index) {
      this.bannerIndex = index
    }
  }
}
</script>
/* 公共配置 */
<style scoped>
* {
  font-family: YouYuan;
  font-weight: 600;
}
.block {
  border-radius: 20px;
  background: -webkit-linear-gradient(
      right,
      rgb(253, 241, 255),
      rgb(220, 255, 253)
  );
}
</style>
/* 背景框架 */
<style scoped lang="scss">
@import './index.scss';
</style>
