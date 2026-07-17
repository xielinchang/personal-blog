<template>
  <div id="app">
    <n-dialog-provider>
    <n-message-provider>
        <right-button></right-button>
        <keep-alive>
          <router-view v-slot="{ Component }">
            <component :is="Component" />
          </router-view>
        </keep-alive>
    </n-message-provider>
</n-dialog-provider>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMainStore, useSkinStore } from '@/store'
import { NMessageProvider, NDialogProvider } from 'naive-ui'
import { getUserIp, createVisit } from '@/api/default/index'
import { baiduLocation } from '@/api/baidu/baiduapi'
// 设置肤色
import { colors_dark } from '@/style/colors_dark.js'
import { colors_light } from '@/style/colors_light.js'

const route = useRoute()
const store = useMainStore()
const skinStore = useSkinStore()
const visitId = ref('')
const ip = ref('')

// 存取用户ip
onMounted(() => {
  const preloader = document.getElementById('preloader')
  if (preloader) {
    preloader.classList.add('hidden')
    setTimeout(() => {
      preloader.remove()
    }, 500)
  }

  getUserIp().then((res) => {
    sessionStorage.setItem('ip', res.data.ip)
    ip.value = res.data.ip
  })
  getIp()
  initTitle()
  setSkin()
})

// 监听路由变化
watch(() => route.path, (newPath) => {
  initTitle()
  getIp(newPath)
}, { deep: true })

// 监听皮肤类型变化
watch(() => store.skinType, () => {
  setSkin()
}, { deep: true })

// 设置皮肤
const setSkin = () => {
  // 默认使用亮色
  const defaultList = []
  let skin = []
  store.skinType === 'day'
    ? (skin = colors_light)
    : (skin = colors_dark)
  for (const key in skin) {
    const item = skin[key]
    defaultList.push(`--${key}:${item}`)
  }
  const defaultStyle = defaultList.join(';')
  // 全局色系
  skinStore.skin = defaultStyle
  const data = skinStore.skin
  // 将数据转换为CSS变量
  const dataArray = data
    .split(';')
    .filter((item) => item.trim() !== '')
  dataArray.forEach((item) => {
    const [key, value] = item.split(':')
    document.documentElement.style.setProperty(key, value)
  })
}

// 获取IP地址
const getIp = (routePath) => {
  getUserIp().then((res) => {
    ip.value = res.data.ip
    initAddressAndCreateVisit(routePath)
  })
}

// 初始化标题
const initTitle = () => {
  // 判断是否有用户信息，有则显示用户信息的标题
  if (route.path !== '/note/essay') {
    store
      .getUserInfo()
      .then((user) => {
        document.title = user.name + ' の blog'
      })
      .catch((_) => {
        document.title = route.meta.name || 'Blog'
      })
  }
}

// 初始化地址并创建访问记录
const initAddressAndCreateVisit = async (routePath) => {
  if (ip.value === '127.0.0.1') {
    ip.value = ''
  }
  try {
    const res = await baiduLocation(String(ip.value))
    if (res && res.data && res.data.content) {
      localStorage.setItem('address', res.data.content.address)
    }
  } catch (error) {
    console.error('Failed to get location:', error)
  }

  // if (!sessionStorage.getItem('sessionId')) {
  createVisit({ visit_address: '', visit_page: routePath }).then(res => {
    if (res && res.data && res.data.success) {
      // sessionStorage.setItem('sessionId', res?.data?.sessionCreated?.id)
      visitId.value = res?.data?.sessionCreated?.id
    }
  }).catch(error => {
    console.error('Failed to create visit:', error)
  })
  // }
}
</script>
<style>
* {
    padding: 0;
    margin: 0px;
}
</style>
<style lang="scss" scoped>

body {
    padding: 0;
    margin: 0;

    &::-webkit-scrollbar {
        width: 12px;
    }
}
@media screen and (max-width: 600px) {
    html {
        width: 100vw;
        height: auto;
    }
}

</style>
