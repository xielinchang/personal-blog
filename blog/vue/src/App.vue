<template>
  <div
    id="app"
    @click="offclick"
  >
    <HeadTab></HeadTab>
    <Backtop></Backtop>
    <LeftMenu></LeftMenu>
    <WaveItem></WaveItem>
    <myloading :isshow="loadingshow"></myloading>
    <!-- 点击xxb出现文字 -->
    <div
      class="text"
      :style="{
        opacity: textshow,
        display: textdisplay,
        transform: `translateY(${textY}px)`,
      }"
    >
      {{ text[textindex] }}
    </div>
    <!-- 由于xxb的点击功能没用，自己写了透明背景当作点击触发条件 -->
    <div
      class="live2d-shadow"
      :style="{ display: shadowdisplay }"
      @click="tap()"
    ></div>
    <!-- xxb的显示隐藏 -->
    <div
      class="showxxb"
      @click="showxxb"
    >
      {{ btnName }}
    </div>
    <!-- xxb的声音 -->
    <audio
      id="resource"
      ref="up"
      :src="audioSrc"
      controls
      style="display: none"
    ></audio>
    <router-view></router-view>
  </div>
</template>

<script>
import myloading from './views/component/element/Loading.vue'
import LeftMenu from './views/component/MyComponents/LeftMenu.vue'
import HeadTab from './views/component/MyComponents/HeadTab.vue'
import WaveItem from './views/component/element/click.vue'
import Backtop from './views/component/element/Back-Top.vue'
import '../public/css/main.css'
import { getUserIp } from '@/api/api'

export default {
  name: 'App',
  components: {
    HeadTab,
    LeftMenu,
    myloading,
    WaveItem,
    Backtop
  },
  data() {
    return {
      // 文字出现判断条件
      textflag: true,
      // 文字的索引
      textindex: 1,
      // 文字的透明度
      textshow: 0,
      // 文字的初始位置
      textY: '0',
      // 文字的display
      textdisplay: 'none',
      // 触发条件的display
      shadowdisplay: 'block',
      // 所以文字合集
      text: [
        '不 要 碰 我 ~',
        '梦里能说话的人是醒来见不到的人',
        '如果事与愿违 就相信命运自有安排',
        '你真好看,我不是夸你,我是提醒你',
        '大家都躲着雨 雨也很孤独吧',
        '今天，是天赐的礼物，祝你好运',
        '生气是拿别人的错误惩罚自己',
        '每一天都要爱对人'
      ],
      audioSrc: require('../public/live2dw/xxban/touchBody.mp3'),
      btnName: '隐藏',
      clicksize: Math.random() * 30 + 10,
      loadingshow: 'block'
    }
  },
  created() {
    this.initlive2d()
    // 存取用户ip
    getUserIp().then((res) => {
      sessionStorage.setItem('ip', res.data.ip)
    })
  },
  mounted() {
    var that = this
    // loading组件
    setTimeout(function () {
      that.loadingshow = 'none'
    }, 0)
    // 定时出现文字
    setInterval(function () {
      if (that.textflag === true) {
        that.allText()
      }
      var randomtext = Math.ceil(Math.random() * (that.text.length - 1))
      that.textindex = randomtext
    }, 15000)
  },
  methods: {
    // 取消退出登录框
    offclick() {
      this.$store.state.logout.display = 'none'
      this.$store.state.logout.opacity = 0
    },
    // 定时出现文字
    allText() {
      var that = this
      this.textshow = 1
      this.textdisplay = 'block'
      this.textY = 0
      var randomtext = Math.ceil(Math.random() * (that.text.length - 1))
      setTimeout(() => {
        that.textshow = 0
        that.textY = -200
      }, 4000)
      setTimeout(() => {
        that.textY = 0
      }, 4601)
      setTimeout(() => {
        that.textdisplay = 'none'
        that.textindex = randomtext
      }, 5000)
    },
    // 点击xxb
    tap() {
      var that = this
      var dom = this.$refs.up
      dom.play()
      this.textshow = 1
      this.textdisplay = 'block'
      this.textY = 0
      this.textindex = 0
      setTimeout(() => {
        that.textshow = 0
        that.textY = -200
      }, 2000)
      setTimeout(() => {
        that.textY = 0
      }, 2501)
      setTimeout(() => {
        that.textdisplay = 'none'
      }, 3000)
    },
    // xxb初始化
    initlive2d() {
      setTimeout(() => {
        window.L2Dwidget.init({
          pluginRootPath: 'live2dw/',
          pluginJsPath: 'lib/',
          pluginModelPath: 'xxban/',
          tagMode: true,
          debug: false,
          model: {
            jsonPath:
              process.env.VUE_APP_BASE_API_XXB + '/live2dw/xxban/model.json'
          },
          display: {
            position: 'right',
            width: 300,
            height: 500
          },
          mobile: { show: true },
          log: false
        })
      }, 1000)
    },
    // 显示隐藏
    showxxb() {
      var canvaslist = document.querySelectorAll('canvas')
      if (this.btnName === '隐藏') {
        console.log(canvaslist)
        this.btnName = '显示'
        this.shadowdisplay = 'none'
        this.textflag = false
        canvaslist[canvaslist.length - 1].style.display = 'none'
      } else {
        this.btnName = '隐藏'
        this.shadowdisplay = 'block'
        this.textflag = true
        canvaslist[canvaslist.length - 1].style.display = 'block'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
body {
  padding: 0;
  margin: 0;
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #72d0eb;
  }
  &::-webkit-scrollbar-track {
    border-radius: 6px;
    background: rgba(253, 129, 245, 1);
  }
  .live2d-widget-container {
  margin-left: 30px;
  transform: scale(1);
  opacity: 1;
  z-index: 9999;
}
.live2d-shadow {
  width: 180px;
  height: 270px;
  position: fixed;
  right: 50px;
  bottom: 80px;
  z-index: 999;
  border-radius: 50%;
}
.text {
  min-width: 100px;
  width: auto;
  padding: 5px 10px;
  max-width: 200px;
  min-height: 30px;
  height: auto;
  background: rgb(255, 148, 242);
  position: fixed;
  right: 210px;
  bottom: 350px;
  z-index: 9999;
  text-align: left;
  line-height: 30px;
  border-radius: 15px 15px 0 15px;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 1px 1px 10px 5px #f990ff;
  color: white;
  transition: 500ms;
}
.showlive2d {
  width: 60px;
  height: 24px;
  border: none;
  position: fixed;
  left: 250px;
  bottom: 94px;
  z-index: 9999;
  background: #f990ff;
  box-shadow: 1px 1px 10px 5px #fad4fc;
  text-align: center;
  line-height: 24px;
  color: rgb(0, 255, 255);
  border-radius: 30px;
  cursor: url(http://qkongtao.cn/wp-content/uploads/2021/08/arr41-1.png),
    pointer !important;
  font-size: 14px;
}
canvas {
  display: block;
}
.showxxb {
  position: fixed;
  bottom: 80px;
  right: 10px;
  width: 60px;
  height: 30px;
  border-radius: 30px;
  background: #f990ff;
  box-shadow: 1px 1px 10px 5px #fad4fc;
  color: white;
  text-align: center;
  line-height: 30px;
  z-index: 99999;
  cursor: url(http://qkongtao.cn/wp-content/uploads/2021/08/arr41-1.png),
    pointer !important;
}
}

</style>
