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
            :class="{ rotate360: item.showAnimate }"
            @click="wrap(index)"
            @mouseenter="wrapHover(index)"
            @mouseleave="wrapHoverOff(index)"
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
    <div
      class="wrap-main-type"
      :style="{ backgroundColor: wraptype.bgcolor }"
      @click="wrapanothertype"
    >
      <div
        class="wrap-main-btn"
        :style="{
          backgroundColor: wraptype.btncolor,
          transform: `translateX(${wraptype.btnlocation}px)`,
        }"
      >
        <img
          :src="wraptype.wrap_main_url"
          alt=""
        />
      </div>
      <div
        class="wrap-main-name"
        :style="{
          transform: `translateX(${wraptype.namelocation}px)`,
          color: wraptype.color,
        }"
      >
        {{ wraptype.wrap_main_name }}
      </div>
    </div>
    <div class="main">
      <!-- 随笔 -->
      <div
        class="main-a"
        :style="{ display: wraptype.main_a_show }"
      >
        <ShareList
          width="74"
          @click="Essay"
        ></ShareList>
      </div>
      <!-- 文章 -->
      <div
        class="main-b"
        :style="{ display: wraptype.main_b_show }"
      >
        <MyEssay width="74"> </MyEssay>
      </div>
      <RightTab
        id="right-tab"
        class="right-tab"
        width="23"
        height="500"
      ></RightTab>
      <myBubble class="bubbles"></myBubble>
    </div>
  </div>
</template>

<script>
import myBubble from '../../component/element/my-bubble.vue'
import { bgGif } from '@/api/api'
import '../../../../public/css/main.css'
import ShareList from '../../component/MyComponents/ShareList.vue'
import RightTab from '../../component/MyComponents/RightTab.vue'
import MyEssay from '../../component/MyComponents/EssayList.vue'
import 'animate.css'
export default {
  name: 'HomePage',
  components: {
    ShareList,
    RightTab,
    myBubble,
    MyEssay
  },
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
      stablist: [
        {
          tabname: 'First'
        },
        {
          tabname: 'Second'
        }
      ],
      contract_list: [
        {
          url: require('../../../assets/icon/menu/QQ.png')
        },
        {
          url: require('../../../assets/icon/menu/weixin.png')
        },
        {
          url: require('../../../assets/icon/menu/github.png')
        }
      ],
      wraptype: {
        bgcolor: '',
        btncolor: '',
        wrap_main_url: require('../../../assets/icon/myicons/矿泉水.png'),
        wrap_main_name: '文 章',
        btnlocation: 0,
        namelocation: 0,
        color: '#fff',
        main_a_show: 'none',
        main_b_show: 'block',
        time: 800
      }
    }
  },
  computed: {},
  async mounted() {
    this.initBgGif()
    this.judgeWrapType()
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
    prospectstab(index) {
      this.CurrentIndex = index
    },
    judgeWrapType() {
      var that = this
      var wraptypenum = this.$store.state.wraptypenum
      if (wraptypenum === 2) {
        this.wraptype.bgcolor = '#fff'
        this.wraptype.btncolor = '#03c0f4'
        this.wraptype.color = '#03c0f9'
        this.wraptype.wrap_main_url = require('../../../assets/icon/myicons/美式咖啡.png')
        this.wraptype.wrap_main_name = '随 笔'
        this.wraptype.btnlocation = 60
        this.wraptype.namelocation = -30
        setTimeout(function () {
          that.wraptype.main_b_show = 'none'
          that.wraptype.main_a_show = 'block'
        }, 10)
      } else {
        this.wraptype.bgcolor = '#03c0f4'
        this.wraptype.btncolor = '#fff'
        this.wraptype.color = '#fff'
        this.wraptype.wrap_main_url = require('../../../assets/icon/myicons/矿泉水.png')
        this.wraptype.wrap_main_name = '文 章'
        this.wraptype.btnlocation = 0
        this.wraptype.namelocation = 0
        setTimeout(function () {
          that.wraptype.main_b_show = 'block'
          that.wraptype.main_a_show = 'none'
        }, 10)
      }
    },
    wrapanothertype() {
      if (this.$store.state.wraptypenum === 1 || this.$store.state.wraptypenum === undefined) {
        this.$store.state.wraptypenum = 2
      } else {
        this.$store.state.wraptypenum = 1
      }
      console.log(this.$store.state.wraptypenum)
      this.judgeWrapType()
    },
    Essay() {
      this.$refs.child.jumpToEssay()
    },
    wrapHover(index) {
      this.imglist[index].showAnimate = true
    },
    wrapHoverOff(index) {
      this.imglist[index].showAnimate = false
    }
  }
}
</script>
/* 公共配置 */
<style src="../../../../public/css/main.css"></style>
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
