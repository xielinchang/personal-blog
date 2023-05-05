<template>
  <div
    v-cloak
    class="home"
  >
    <img
      class="bg-shadow"
      :src="bgshadow"
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
        @click="jummpEssay(item.id)"
      >
        <div class="mark-shadow"></div>
        <div
          class="mark"
          :style="{'backgroundImage':`url(${item.coverUrl})`}"
        >
        </div>
        <img
          :src="item.coverUrl"
          :style="{zIndex:index===bannerIndex?3:0}"
          alt=""
        >
        <div class="banner-tit-box">
          <div class="banner-title">{{ item.title }}</div>
          <div class="banner-line"></div>
          <div class="banner-subtitle">{{ item.subtitle }}</div>
        </div>
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
      <essayList
        v-if="wrapValue"
        width="74"
      ></essayList>
      <ShareList
        v-else
        width="74"
      ></ShareList>
      <right-tab
        id="right-tab"
        class="right-tab"
        width="23"
        height="500"
      ></right-tab>
    </div>
    <div class="right-btn">
      <!-- native可以在子组件上自定义事件 -->
      <IconButton
        v-if="wrapValue"
        :left-title="wrapValue ? '随笔' : '文章' "
        icon="pen"
        @click.native="wrapValue =!wrapValue"
      >
      </IconButton>
      <IconButton
        v-else
        :left-title="wrapValue ? '随笔' : '文章' "
        icon="book"
        @click.native="wrapValue =!wrapValue"
      >
      </IconButton>
    </div>

  </div>
</template>

<script>
import { bgGif } from '@/api/api'
import { essayQuery } from '@/api/essayapi'
export default {
  name: 'HomePage',
  data() {
    return {
      CurrentIndex: 0,
      blogName: 'C o i s í n í',
      bgimg: '',
      mainimg: '',
      bgshadow: '',
      wrapValue: true,
      topShow: true,
      bannerList: [],
      bannerIndex: 0,
      bannerPause: null,
      bannerTime: 4000
    }
  },
  computed: {},
  async mounted() {
    this.initBgGif()
    this.initBanner()
    this.bannerTimer()
  },
  methods: {
    initBanner() {
      essayQuery({
        limit: 5,
        offset: 1,
        query: {
          title: undefined,
          domain: undefined,
          tags: undefined
        }
      }).then(res => {
        res.data.rows.forEach(item => {
          item.coverUrl = process.env.VUE_APP_BASE_API + item.coverUrl
          this.bannerList.push(item)
        })
      })
    },
    initBgGif() {
      bgGif().then((res) => {
        var item = res.data
        var randomNum = Math.floor(Math.random() * item.length)
        this.bgshadow = process.env.VUE_APP_BASE_API + res.data[randomNum].url
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
    },
    jummpEssay(id) {
      this.$router.push('/note/essay?id=' + id)
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

ul {
  list-style: none;
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
@import './Home.scss';
</style>
