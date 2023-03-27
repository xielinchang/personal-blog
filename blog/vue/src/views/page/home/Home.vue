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
      v-show="topShow"
      class="top-main"
    >
      <div class="top-shadow">
        <ul class="banner-wrap">
          <li
            v-for="(item, index) in imglist"
            :key="index"
            class="wrap-btn"
            @click="wrap(index)"
          >
            <div class="wrap-btn-box">
              <img
                :src="item.wrapUrl"
                alt=""
              />
            </div>
          </li>
        </ul>
        <div class="top-round-1">
          <div class="top-round-2">
            <div class="top-round-3">
              <div class="background">
                <img
                  :src="bgimg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 切换随笔按钮 -->
    <div class="main">
      <essayList
        v-if="wrapValue"
        width="74"
      > </essayList>
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
      <div
        class="btn-item"
        left-title="注册"
      >
        <router-link to="/register">
          <div style="width: 100%;height: 100%">
            <svg-icon
              icon-name="register"
              size="22px"
              class="btn-icon"
            ></svg-icon>
          </div>
        </router-link>
      </div>
      <div
        class="btn-item"
        left-title="隐藏顶部"
        @click="topShow =!topShow"
      >
        <svg-icon
          icon-name="hide-filled"
          size="20px"
          color="#409EFF"
          class="btn-icon"
        ></svg-icon>
      </div>
      <div
        class="btn-item"
        left-title="关闭点击特效"
        @click="clickShow()"
      >
        <svg-icon
          icon-name="click"
          size="20px"
          color="#409EFF"
          class="btn-icon"
        ></svg-icon>
      </div>
      <div
        class="btn-item"
        :left-title="wrapValue?'随笔':'文章'"
        @click="wrapValue =!wrapValue"
      >
        <svg-icon
          v-if="wrapValue"
          icon-name="pen"
          size="20px"
          color="#409EFF"
          class="btn-icon"
        ></svg-icon>
        <svg-icon
          v-else
          icon-name="book"
          size="20px"
          color="#409EFF"
          class="btn-icon"
        ></svg-icon>
      </div>
    </div>

  </div>
</template>

<script>
import { bgGif } from '@/api/api'

export default {
  name: 'HomePage',
  data() {
    return {
      CurrentIndex: 0,
      blogName: 'C o i s í n í',
      bgimg: '',
      mainimg: '',
      bgshadow: '',
      imglist: [
        {
          wrapUrl: '',
          opacity: 1
        },
        {
          wrapUrl: '',
          opacity: 0.6
        },
        {
          wrapUrl: '',
          opacity: 0.6 }
      ],
      imglist_2: [],
      wrapValue: true,
      topShow: true
    }
  },
  computed: {},
  async mounted() {
    this.initBgGif()
  },
  methods: {

    initBgGif() {
      bgGif().then((res) => {
        var item = res.data
        for (let i = 0; i < item.length; i++) {
          item[i].url = process.env.VUE_APP_BASE_API + item[i].url
          this.imglist_2.push(item.data)
          this.imglist[i].wrapUrl = item[i].url
        }
        this.bgimg = res.data[0].url
        this.mainimg = res.data[0].url
        this.bgshadow = res.data[0].url
      })
    },
    wrap(index) {
      this.bgimg = this.imglist[index].wrapUrl
      for (var i = 0; i < this.imglist.length; i++) {
        this.imglist[i].opacity = 0.6
      }
      this.imglist[index].opacity = 1
      this.mainimg = this.bgimg
      this.bgshadow = this.bgimg
    },
    clickShow() {
      if (this.$store.state.clickShow) {
        this.$msg({
          content: '你已取消了点击特效',
          type: 'success'
        })
      } else {
        this.$msg({
          content: '你已开启了点击特效',
          type: 'success'
        })
      }
      this.$store.state.clickShow = !this.$store.state.clickShow
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
@import './scss/Home.scss';
</style>
