<template>
  <div
    v-cloak
    class="home"
  >
    <img
      class="bg-shadow"
      width="100%"
      :src="bgshadow"
      alt=""
    />
    <div class="top-main">
      <div class="top-shadow">
        <ul class="banner-wrap">
          <li
            v-for="(item, index) in imglist"
            :key="index"
            :style="{ opacity: item.opacity, backgroundColor: item.bodercolor }"
            class="wrap-btn"
            @click="wrap(index)"
          >
            <div class="wrap-btn-box">
              <img
                :src="item.wrapurl"
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
      <my-switch
        style="position: absolute; top: -60px; left: -40px;"
        @change="wrapType"
      >
      </my-switch>
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
  </div>
</template>

<script>
import { bgGif } from '@/api/api'
export default {
  name: 'HomePage',
  data() {
    return {
      loadingshow: 'block',
      lockshow: 'none',
      unlockshow: 'block',
      CurrentIndex: 0,
      blogName: 'C o i s í n í',
      bgimg: '',
      mainimg: '',
      bgshadow: '',
      imglist: [
        {
          wrapurl: '',
          opacity: 1
        },
        {
          wrapurl: '',
          opacity: 0.6
        },
        {
          wrapurl: '',
          opacity: 0.6 }
      ],
      imglist_2: [],
      wrapValue: true
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
          this.imglist[i].wrapurl = item[i].url
        }
        this.bgimg = res.data[0].url
        this.mainimg = res.data[0].url
        this.bgshadow = res.data[0].url
      })
    },
    wrap(index) {
      this.bgimg = this.imglist[index].wrapurl
      for (var i = 0; i < this.imglist.length; i++) {
        this.imglist[i].opacity = 0.6
      }
      this.imglist[index].opacity = 1
      this.mainimg = this.bgimg
      this.bgshadow = this.bgimg
    },
    wrapType(v) {
      console.log(v)
      this.wrapValue = v
    },
    prospectstab(index) {
      this.CurrentIndex = index
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
