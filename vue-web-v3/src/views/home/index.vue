<template>
  <div v-cloak class="home">
 
    <TemplatePage :search-show="true" height="250"></TemplatePage>
   
    <div class="start-page" :class="{ 'start-page-hidden': isStarted }">
      <h1 data-text="Hello World!">Hello World!</h1>  
      <img :src="anime1" alt="">
      <div class="begin hover_active" @click="begin">
        <span>start</span>
      </div>
    </div>
    <div class="home-content wow animate__bounceInUp">
      <div class="main-wrap">
        <div class="span">
          <span>Recommend</span>
          <j-icon name="bell-filled" color="var(--theme0)" size="20px"></j-icon>
        </div>
        <n-spin :show="loading" size="large">
          <div class="banner" @mouseenter="bannerIn" @mouseleave="bannerOut">

            <div v-for="(item, index) in bannerList" :key="item.id" class="banner-mark" :style="{
              opacity: index === bannerIndex ? 1 : 0,
              zIndex: index === bannerIndex ? 3 : 0,
            }">

              <div @click="jumpToEssay(item.id)">
                <div class="mark-shadow"></div>
                <img v-lazy="prefix + item.coverUrl" class="mark" />
                <img v-lazy="prefix + item.coverUrl" class="banner-right-img"
                  :style="{ zIndex: index === bannerIndex ? 3 : 0 }" alt="" />
                <div class="banner-tit-box">
                  <div class="banner-title"><a>{{ item.title }}</a></div>
                  <div class="banner-line"></div>
                  <div class="banner-subtitle">{{ item.subtitle }}</div>
                </div>
              </div>
            </div>
            <div class="banner-btn left" @click="bannerPre">
              <j-icon name="arrow-left" color="var(--theme0)" size="25px" class="banner-svg"></j-icon>
            </div>

            <div class="banner-btn right" @click="bannerNext">
              <j-icon name="arrow-right" color="var(--theme0)" size="25px" class="banner-svg"></j-icon>
            </div>
            <ul class="banner-dot" style="z-index: 4">
              <li v-for="(item, index) of bannerList.length" :key="index" :style="{
                backgroundColor: index === bannerIndex ? 'var(--theme0)' : '',
                boxShadow:
                  index === bannerIndex ? '0 0 5px .1px var(--theme0)' : '',
              }" @click="bannerJump(index)"></li>
            </ul>
          </div>
        </n-spin>
        <!-- 文章 -->
        <div class="main">
          <div class="span">
            <span>Latest</span>
            <j-icon name="list" color="var(--theme0)" size="20px"></j-icon>
          </div>
          <EssayList class="essay-list"></EssayList>
        </div>

      </div>
      <HomeRight id="right-tab" class="right-tab" width="20"></HomeRight>
    </div>
    <div class="margin"></div>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useMainStore } from '@/store'
import { NSpin } from 'naive-ui'
import { bannerQuery } from '@/api/main/essay'
import HomeRight from './HomeRight/index.vue'
import EssayList from './EssayList/index.vue'
import anime1 from '../../assets/images/动漫1.jpg'
const router = useRouter()
const store = useMainStore()

// 响应式数据
const CurrentIndex = ref(0)
const bgimg = ref('')
const bannerList = ref([])
const bannerIndex = ref(0)
const bannerPause = ref(null)
const bannerTime = ref(4000)
const tabShow = ref(false)
const prefix = import.meta.env.VITE_APP_BASE_API
const isStarted = ref(false)
const loading = ref(false)

// 生命周期
onMounted(() => {
  isStarted.value = sessionStorage.getItem('isStarted') === 'true'
  window.addEventListener('scroll', beginScroll)
  initBanner()
  bannerTimer()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', beginScroll)
  if (bannerPause.value) {
    clearInterval(bannerPause.value)
  }
})

// 方法
const beginScroll = () => {
  const flag = 50
  if (window.scrollY > flag && !isStarted.value) {
    begin()
    window.removeEventListener('scroll', beginScroll)
  }
}

const begin = () => {
  isStarted.value = true
  wowInit()
  document.documentElement.scrollTop = 0

  setTimeout(() => {
    sessionStorage.setItem('isStarted', true)
  }, 600)
}

const imageLoaded = () => {
  store.imageIsLoaded = true
}

const wowInit = () => {
  nextTick(() => {
    tabShow.value = true
    new window.$wow({ live: false }).init()
  })
}

const initBanner = () => {
  loading.value = true
  bannerQuery({
    limit: 999,
    offset: 1
  }).then((res) => {
    res.data.rows.forEach(element => {
      bannerList.value.push(element.blog_essay)
      loading.value = false
    })
  })
}

const bannerPre = () => {
  if (bannerIndex.value === 0) {
    bannerIndex.value = bannerList.value.length - 1
  } else {
    bannerIndex.value--
  }
}

const bannerNext = () => {
  if (bannerIndex.value === bannerList.value.length - 1) {
    bannerIndex.value = 0
  } else {
    bannerIndex.value++
  }
}

const bannerTimer = () => {
  bannerPause.value = setInterval(() => {
    bannerNext()
  }, bannerTime.value)
}

const bannerIn = () => {
  clearInterval(bannerPause.value)
}

const bannerOut = () => {
  bannerTimer()
}

const bannerJump = (index) => {
  bannerIndex.value = index
}

const jumpToEssay = (id) => {
  router.push('/note/essay?id=' + id)
}
</script>
/* 公共配置 */
<style scoped>
* {
  font-weight: 600;
}

.block {
  border-radius: 20px;
  background: -webkit-linear-gradient(right,
      rgb(253, 241, 255),
      rgb(220, 255, 253));
}
</style>
/* 背景框架 */
<style scoped lang="scss">
@import "./index.scss";
</style>
