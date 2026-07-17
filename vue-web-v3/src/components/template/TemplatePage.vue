<template>
  <div class="template">
   <Wave v-if="wave"></Wave>
    <div
      id="head"
      style="overflow: hidden"
      :style="{
        position: position,
        top: top + 'px',
        height: processedHeight,
        opacity: opacity,
      }"
    >
     <input-modal
        :content="content ? content : defaultContent "
        :display-delay="displayDelay"
        style="
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    top: 100px;
                "
      ></input-modal>
      <head-tab :bgimg="bgimg" :show-tab-bg="!wave"></head-tab>
      <!-- <SearchBox v-if="searchShow" class="search-box"></SearchBox> -->
    </div>
    <img
      v-if="showBg"
      :src="bgimg"
      class="bg-img"
      :class="{ 'img-loaded': imageLoadedFlag }"
      @load="onImageLoad"
      @error="onImageError"
    />
    <div v-if="showBg" class="bg-placeholder" :class="{ 'placeholder-hidden': imageLoadedFlag }">
      <div class="placeholder-shimmer"></div>
    </div>
    <div class="mark"></div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import Wave from '../wave/index.vue'
import { useRoute } from 'vue-router'
import { useMainStore } from '@/store'
import { homeBg, homeBgNight } from '@/api/default/index'
import { casualQuery } from '@/api/main/casual'
// import SearchBox from './search/search.vue'
import HeadTab from './headTab/HeadTab.vue'

const props = defineProps({
  searchShow: {
    type: [Boolean],
    default: true
  },
  height: {
    type: [Number, String],
    default: 60
  },
  wave: {
    type: [Boolean, String],
    default: false
  },
  // true则默认背景，否则传图片的路径
  defaultBg: {
    type: [Boolean, String],
    default: true
  },
  showTabBg: {
    type: [Boolean, String],
    default: true
  },
  content: {
    type: [String],
    default: ''
  },
  // 是否显示背景图
  showBg: {
    type: [Boolean, String],
    default: true
  },
  displayDelay: {
    type: [Number, String],
    default: 100
  }
})

const route = useRoute()
const mainStore = useMainStore()

const bgimg = ref('')
const position = ref('fixed')
const top = ref(0)
const prefix = ref(import.meta.env.VITE_APP_BASE_API)
const opacity = ref(1)
const casualList = ref([])
const defaultContent = ref('')
const bgVisible = ref(false)
const imageLoadedFlag = ref(false)
const imageError = ref(false)

const processedHeight = computed(() => {
  function isPureNumber(str) {
    return /^\d+$/.test(str)
  }
  const value = props.height
  if (isPureNumber(value)) {
    return value + 'px'
  }
  return value
})

const initCasual = () => {
  casualQuery({ limit: 999, offset: 1 }).then(res => {
    casualList.value = res.data.rows
    const randomNum = Math.floor(Math.random() * casualList.value.length)
    defaultContent.value = casualList.value[randomNum].content
  })
}

const handleScroll = () => {
  const flag = 300
  if (window.scrollY > flag) {
    position.value = 'absolute'
    opacity.value = 0
  } else {
    position.value = 'fixed'
    opacity.value = (flag - window.scrollY) / flag
  }

  if (opacity.value < 0) {
    opacity.value = 0
  } else if (opacity.value > 1) {
    opacity.value = 1
  }
}

const initBg = () => {
  imageLoadedFlag.value = false
  imageError.value = false

  if (props.defaultBg === true) {
    if (mainStore.skinType === 'day') {
      homeBg().then((res) => {
        const randomNum = res.data.length > 1 ? Math.floor(Math.random() * res.data.length) : 0
        bgimg.value =
                        import.meta.env.VITE_APP_BASE_API + res.data[randomNum].url
      })
    } else {
      homeBgNight().then((res) => {
        const randomNum = res.data.length > 1 ? Math.floor(Math.random() * res.data.length) : 0
        bgimg.value =
                        import.meta.env.VITE_APP_BASE_API + res.data[randomNum].url
      })
    }
  } else {
    bgimg.value = props.defaultBg
  }
}

const onImageLoad = () => {
  imageLoadedFlag.value = true
  imageError.value = false
}

const onImageError = () => {
  imageError.value = true
  console.error('Background image failed to load')
}

watch(() => route.path, () => {
  initBg()
  initCasual()
})
watch(() => mainStore.skinType, () => {
  initBg()
})

watch(() => props.defaultBg, () => {
  initBg()
})

onMounted(() => {
  initBg()
  initCasual()
  // 使用箭头函数绑定this，确保在handleScroll方法中可以访问组件的数据和方法
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
@import './TemplatePage.scss';
</style>
