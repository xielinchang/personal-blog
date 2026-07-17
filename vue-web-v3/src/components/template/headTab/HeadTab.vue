<template>
  <div class="header-container">
    <div 
      v-if="showTabBg"
      class="bg-container"
      style="width: 100%;height: 100%;position: absolute;"
    >
      <img
        :src="imageReady ? bgimg : ''"
        class="bg-img"
        :class="{ 'bg-img-loading': !imageReady && !imageError, 'bg-img-error': imageError }"
        :fetchpriority="imageReady ? 'high' : 'auto'"
        @load="imageLoaded"
        @error="imageLoadError"
      />
    </div>
    <header
      v-show="mainStore.isHead"
      class="header"
    >
      <TextLogo class="text-logo"></TextLogo>
      <div class="header-box" :style="{ background:showTabBg ? 'var(--opacity1)': 'transparent' }">
          <div class="header-left">
            <div class="header-tab"> 
              <ul class="item-list">
                <li
                  v-for="(item, index) in contract_list"
                  :key="index"
                  @click="routerChange(item.router)"
                  @mouseenter="moveOn(index)"
                  @mouseleave="moveOut"
                >
                  <j-icon
                    class="head-icon"
                    :name="item.menuicon"
                    :color="item.color"
                    :right-title="item.title"
                    size="26px"
                    alt=""
                  >
                  </j-icon>
                  <a style="z-index: 998; position: absolute;opacity: 0;"><span>{{ item.title }}</span></a>
                  <div class="line" :class="{ 'tab-active': isActiveTab(index) }"></div>
                </li>
              </ul>
            </div>
          </div>
          <div class="header-right">
            <div class="user-center">
              <template v-if="userInfo.name">
                <div class="user-info">
                  <div class="user-portrait" right-title="open user page">
                    <router-link to="/user">
                      <img
                        v-lazy="prefix + userInfo.portrait"
                        @contextmenu.prevent="show()"
                      />
                      <span style="display: none;">User page</span>
                    </router-link>
                  </div>
                </div>
                <div class="user-name">
                  {{ userInfo.name }}
                </div>
              </template>
              <router-link v-else to="/login">
                <span class="user-name-login" :style="{ color: showTabBg ? 'var(--text0)' : '#000' }">Login</span>
              </router-link>
            </div>
            <ul class="third-center">
              <li>
                <a target="blank" :href="joydUrl">
                <img src="@/assets/images/joyd.png" alt="">
                </a>
              </li>
              <li>
                <a target="blank" :href="gameUrl" >
                <img src="@/assets/images/game.png" alt="">
                </a>
              </li>
              <li>
                <a target="blank" :href="v2Url">
                <img src="@/assets/images/v2.png" alt="">
                </a>
              </li>
              <li class="writing-center">
                <a target="blank" :href="controllerUrl" :style="{ color: showTabBg ? 'var(--text0)' : 'green' }">Writing Center</a>
              </li>
            </ul>
          </div>
        </div>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMainStore, useDictionaryStore } from '@/store'
import { getToken, removeToken } from '@/utils/author'
import TextLogo from './textLogo/index.vue'

const props = defineProps({
  bgimg: {
    default: '',
    type: [String]
  },
  showTabBg: {
    type: [Boolean, String],
    default: true
  }
})

const route = useRoute()
const router = useRouter()
const mainStore = useMainStore()
const dictionaryStore = useDictionaryStore()

const contract_list = ref([])
const currentIndex = ref('')
const routerIndex = ref('')
const line_move = ref(0)
const path = ref('')
const userInfo = ref({})
const prefix = ref(import.meta.env.VITE_APP_BASE_API)
const controllerUrl = ref(import.meta.env.VITE_APP_BASE_API_ADMIN)
const joydUrl = ref(import.meta.env.VITE_APP_BASE_API_JOYD)
const gameUrl = ref(import.meta.env.VITE_APP_BASE_API_GAME)
const v2Url = ref(import.meta.env.VITE_APP_BASE_API_V2)
const logoutShow = ref(false)
const hoveredIndex = ref(null)
const imageReady = ref(false)
const imageError = ref(false)

const initUser = () => {
  mainStore.getUserInfo().then((res) => {
    var userInfoData = res
    userInfo.value = userInfoData
  })
}

const moveOn = (index) => {
  hoveredIndex.value = index
}

const moveOut = () => {
  hoveredIndex.value = null
}

const isActiveTab = (index) => {
  if (hoveredIndex.value !== null) {
    return index === hoveredIndex.value
  } else {
    return contract_list.value[index].router === path.value
  }
}

const show = () => {
  logoutShow.value = true
}

const routerChange = (routePath) => {
  router.push(routePath)
}

const logoutUser = () => {
  logoutShow.value = false
  removeToken('token')
  location.reload()
}

const imageLoaded = () => {
  imageReady.value = true
  imageError.value = false
  mainStore.imageIsLoaded = true
}

const imageLoadError = () => {
  imageReady.value = true
  imageError.value = true
  console.error('Background image failed to load:', props.bgimg)
}

const preloadImage = () => {
  if (!props.bgimg) return
  const img = new Image()
  img.onload = () => {
    imageReady.value = true
    imageError.value = false
  }
  img.onerror = () => {
    imageReady.value = true
    imageError.value = true
    console.error('Preload failed for:', props.bgimg)
  }
  img.src = props.bgimg
}

watch(() => route.path, () => {
  initUser()
})

watch(() => props.bgimg, (newImg) => {
  if (newImg) {
    imageReady.value = false
    imageError.value = false
    preloadImage()
  }
})

onMounted(() => {
  path.value = route.path
  contract_list.value = dictionaryStore.menu
  initUser()
  preloadImage()
})
</script>

<style lang="scss" scoped>
@import "./HeadTab.scss";
</style>
