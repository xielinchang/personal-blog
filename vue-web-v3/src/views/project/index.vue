<template>
  <div class="body">
    <TemplatePage height="300" :default-bg="prefix + projectForm.coverUrl" :content="projectForm.title"></TemplatePage>
    <div class="project">
      <n-spin :show="loading" size="large">
        <div class="main-container">
          <catalog
            v-show="catalog.length > 0 && catalogShow"
            :catalog="catalog"
            :over="overHeight"
            @jump-catalog="jumpToCatalog"
          ></catalog>
          <div
            class="main-page"
            :style="{
              width: catalog.length > 0 && catalogShow ? '78%' : '100%',
            }"
          >
            <div class="link block">
              <div class="label flex">
                <j-icon name="lollipop" color="var(--rainbow5)"></j-icon>
                <span>Related Links:</span>
              </div>
              <div class="link-msg" v-html="projectForm.link" />
            </div>
            <div
              class="project-content block"
            >
              <div class="label"><span>Project Introduction</span></div>
              <div :class="skinType === 'day'?'day-project':'night-project'">
                <div ref="editorRef" style="border-radius: 4px; height: 500px;"></div>
              </div>
            </div>
          </div>
        </div>
      </n-spin>
      <div class="icon-buttons">
        <icon-button
          class="btn-item"
          :left-title="skinType === 'day' ? 'change dark' : 'change day'"
          :icon="skinType === 'day' ? '晴' : '夜间晴天'" @click="changeSkin"
        ></icon-button>
        <icon-button
          v-show="catalog.length > 0"
          icon="hide-filled"
          class="btn-item"
          :left-title="catalogShow ? 'hide catalog' : 'open catalog'"
          @click="catalogShow = !catalogShow"
        ></icon-button>
        <icon-button
          class="btn-item"
          icon="left"
          left-title="previous"
          @click="preProject()"
        ></icon-button>
        <icon-button
          class="btn-item"
          icon="right"
          left-title="next"
          @click="nextProject()"
        ></icon-button>
        <back-top
          class="back-top"
          position="relative"
          icon-name="rocket"
          left-title="back to top"
        ></back-top>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMainStore } from '@/store'
import { NSpin } from 'naive-ui'
import { queryProject } from '@/api/main/project'
import { createEditor, createToolbar } from '@wangeditor/editor'

const route = useRoute()
const router = useRouter()
const store = useMainStore()

// 响应式数据
const projectForm = ref({})
const loading = ref(false)
const prefix = import.meta.env.VITE_APP_BASE_API
const readConfig = ref({
  readOnly: true
})
const mode = ref('default')
const catalog = ref([])
const catalogShow = ref(true)
const overHeight = ref(50)
const editorRef = ref(null)
let editor = null

// 计算属性
const skinType = computed(() => store.skinType)

// 监听路由变化
watch(() => route.query, () => {
  initProject()
}, { deep: true })

// 生命周期
onMounted(() => {
  initProject()
})

// 销毁编辑器
onUnmounted(() => {
  if (editor) {
    editor.destroy()
  }
})

// 方法
const changeSkin = () => {
  store.changeSkin()
}

const initProject = () => {
  loading.value = true
  queryProject({
    limit: 1,
    offset: 1,
    query: {
      id: route.query.id
    }
  }).then(res => {
    console.log(res)
    loading.value = false
    projectForm.value = res.data.rows[0]
    setTimeout(() => {
      // 初始化目录
      initCatalog()
      // 初始化编辑器
      if (editorRef.value) {
        editor = createEditor({
          selector: editorRef.value,
          html: projectForm.value.html,
          config: {
            readOnly: true
          }
        })
      }
      // 等加载完背景图片后再显示页面
      loading.value = false
    }, 1000)
  })
}

const initCatalog = () => {
  // 优化跳转目录=> 根据h1 - h3生成目录树有层级关系，h4以后的不生成目录
  catalog.value = []
  let id = 1
  const titleList = document.querySelectorAll('h1, h2, h3, h4, h5, h6, h7')
  for (let i = 0; i < titleList.length; i++) {
    if (titleList[i].innerText.length) {
      const element = titleList[i]
      element.id = 'h-' + id++ * 1
      catalog.value.push({
        key: element.innerText,
        id: element.id,
        offset: element.offsetTop
      })
    }
  }
  if (projectForm.value.link !== '') {
    const link = document.querySelector('.link')
    if (link) {
      const height = link.offsetHeight
      overHeight.value = height + 200
    }
  } else {
    overHeight.value = 200
  }
}

const jumpToCatalog = (item) => {
  const el = document.documentElement
  const record = document.getElementById(item.id).offsetTop
  let cur = el.scrollTop
  // 相距越远，step应该越大
  const step = (record - cur) / 40
  let flag = false
  const over = overHeight.value
  if (record < cur) {
    flag = true
  } else if (record === cur) {
    return
  }
  const timer = setInterval(() => {
    disableScroll()
    if (flag) {
      //  说明小于0
      if (cur < record) {
        el.scrollTop = record + over
        enableScroll()
        clearInterval(timer)
      } else {
        el.scrollTop = cur + step + over
      }
    } else {
      if (cur > record) {
        el.scrollTop = record + over
        enableScroll()
        clearInterval(timer)
      } else {
        el.scrollTop = cur + step + over
      }
    }
    cur += step
  }, 1)
}

// 阻止滚动事件
const disableScroll = () => {
  document.addEventListener('wheel', preventDefault, {
    passive: false
  })
}

// 开启滚动事件
const enableScroll = () => {
  document.removeEventListener('wheel', preventDefault, {
    passive: false
  })
}

const preventDefault = (e) => {
  e.preventDefault()
}

const preProject = () => {
  changeProject('pre')
}

const nextProject = () => {
  changeProject('next')
}

const changeProject = (type) => {
  queryProject({
    limit: 999,
    offset: 1,
    query: {
      id: undefined,
      title: undefined,
      html: undefined
    }
  }).then(res => {
    const arr = res.data.rows
    const idIndex = arr.findIndex(item => item.id * 1 === route.query.id * 1)
    if (idIndex * 1 === arr.length - 1 && type === 'next') {
      window.$msg({
        content: 'last one',
        type: 'info'
      })
    } else if (idIndex * 1 === 0 && type === 'pre') {
      window.$msg({
        content: 'first one already',
        type: 'info'
      })
    } else {
      if (type === 'next') {
        // 直接跳转路由再初始化并不会生效，因为只改变了参数的值
        // 可以直接使用location.href刷新页面来重新初始化
        // 通过监听参数变化来重新初始化可以避免刷新
        router.push('/note/Project?id=' + arr[idIndex + 1].id)
      } else if (type === 'pre') {
        router.push('/note/Project?id=' + arr[idIndex - 1].id)
      }
    }
  })
}
</script>
<style lang='scss' scoped>
@import './scss/index.scss';
</style>
