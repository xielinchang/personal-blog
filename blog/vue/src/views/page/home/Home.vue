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
                :src="item.url"
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
    <!-- 文章 -->
    <div class="main">
      <essayList
        v-if="wrapValue"
        width="74"
        style="margin-bottom: 100px;"
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

      <router-link to="/register">
        <IconButton
          left-title="注册"
          icon="register"
        ></IconButton>
      </router-link>
      <!-- native可以在子组件上自定义事件 -->
      <IconButton
        icon="hide-filled"
        :left-title="topShow?'隐藏顶部' : '打开顶部'"
        @click.native="topShow =!topShow"
      ></IconButton>
      <IconButton
        :left-title="$store.state.clickShow?'关闭点击特效' : '打开点击特效'"
        icon="click"
        @click.native="clickShow()"
      ></IconButton>
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

export default {
  name: 'HomePage',
  data() {
    return {
      CurrentIndex: 0,
      blogName: 'C o i s í n í',
      bgimg: '',
      mainimg: '',
      bgshadow: '',
      imglist: [],
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
        }
        this.imglist = item
        this.bgimg = res.data[0].url
        this.mainimg = res.data[0].url
        this.bgshadow = res.data[0].url
      })
    },
    wrap(index) {
      this.bgimg = this.imglist[index].url
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
