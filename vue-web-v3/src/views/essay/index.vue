<template>
  <div class="body">
    <TemplatePage
      height="300"
      :default-bg="prefix + essayForm.coverUrl"
      :content="essayForm.title"
      :display-delay="0"
    > </TemplatePage>
    <div class="main-body">
      <n-spin :show="loading" size="large">
        <div v-if="bannerShow"
          class="banner"
          :style="{ position: bannerPosition, top: bannerTop + 'px', opacity: opacity, }"
        >
          <div class="banner-tit-box">
            <div class="banner-subtitle">{{ essayForm.subtitle }}</div>
            <div class="updated-time">最近更新：{{ essayForm.updated_at }}</div>
          </div>
          <div class="operation">
            <div class="good-icon" @click="addGood">
              <j-icon
                v-if="isGood"
                name="circle-check-filled"
                size="20px"
                color="#ffa109"
              ></j-icon>
              <j-icon
                v-else
                name="circle-check"
                size="20px"
                color="var(--same0)"
              ></j-icon>
              <span>{{ essayData.good }}</span>
            </div>
            <div class="collect-icon" @click="addCollect">
              <j-icon
                v-if="isCollect === true"
                name="star-filled"
                size="20px"
                color="#ffa109"
              ></j-icon>
              <j-icon
                v-else
                color="var(--same0)"
                name="star"
                size="20px"
              ></j-icon>
              <span>{{ essayData.collect }}</span>
            </div>
            <div class="comment-icon" @click="jumpToComment">
              <span>
              <j-icon
                color="var(--same0)"
                name="comment"
                size="20px"
              ></j-icon>
              </span>
              <span>{{ commentNum }}</span>
            </div>
            <div class="view-icon">
              <span><j-icon
                color="var(--same0)"
                name="view"
                size="20px"
              ></j-icon></span>
              <span>{{ essayForm.reading_num }}</span>
            </div>
          </div>
        </div>
        <div class="main-container">
          <Catalog
            v-show="catalog.length > 0 && catalogShow"
            :catalog="catalog"
            :over="overHeight"
            @jump-catalog="jumpToCatalog"
          ></Catalog>
          <div
            class="main-page wow animate__fadeIn"
            :style="{
              width: catalog.length > 0 && catalogShow ? '78%' : '100%',
            }"
          >
            <div v-if="essayForm.digest !== ''" id="digest" class="digest">
              <div class="digest-content">
                <div class="digest-head">
                  <j-icon
                    class="digest-icon"
                    color="#1DA9E0"
                    size="20px"
                    name="digest"
                    right-title="摘要"
                  ></j-icon>
                </div>
                {{ essayForm.digest }}
              </div>
            </div>
            <div
              class="gap-line"
              @mouseover="moveGapLine"
              @mouseleave="moveGapLineBack"
            >
              <svg width="100%" height="2">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  style="stroke: var(--success11); stroke-dasharray: 10, 10"
                />
              </svg>
              <j-icon
                name="snow"
                :style="snowStyle"
                size="2rem"
                color="var(--success11)"
                class="snow"
              ></j-icon>
            </div>
            <div class="essay">
              <div
                class="essay-content"
                :class="
                  skinType === 'day' ? 'day-essay' : 'night-essay'
                "
              >
                <div ref="editorRef" style="border-radius: 4px;"></div>
              </div>
            </div>
            <div class="comment">
              <div
                :class="publishShow ? '' : 'c-publish-close'"
                class="c-publish"
              >
                <PublishBox :user-id="userDetail.user_id" @publish-message="publishComment"></PublishBox>
              </div>
              <ul v-if="commentList.length > 0" class="comment-list block">
                <li v-for="(item, index) in commentList" :key="index">
                  <div class="c-portrait">
                    <img v-lazy="prefix + item.users[0].portrait" alt="" />
                  </div>
                  <div class="c-right">
                    <div class="c-top">
                      <div class="c-name">{{ item.users[0].name }}</div>
                      <div class="c-address">{{ item.address }}</div>
                    </div>

                    <div class="c-publish-time">{{ item.created_at }}</div>
                    <div class="c-msg">
                      {{ item.message }}
                    </div>
                    <div
                      v-if="item.users[0].id === userDetail.user_id"
                      class="c-del"
                    >
                      <j-icon
                        name="delete"
                        size="20px"
                        color="var(--rose5)"
                        @click="delcomment(item)"
                      />
                    </div>
                  </div>
                </li>
              </ul>
              <div v-else class="comment-list no-comments">暂 无 评 论</div>
            </div>
          </div>
        </div>
      </n-spin>
      <div class="icon-buttons">
        <j-button
          class="btn-item"
          icon="magic-stick"
          @click="changeSkin"
          type="success"
          circle
        ></j-button>
        <j-button
        class="btn-item"
        type="success"
          v-show="catalog.length > 0"
          icon="hide"
          circle
          @click="catalogShow = !catalogShow"
        ></j-button>
        <j-button
        class="btn-item"
          icon="top-left"
          type="success"
          circle
          @click="preEssay()"
        ></j-button>
        <j-button
          class="btn-item"
          icon="top-right"
          type="success"
          circle
          @click="nextEssay()"
        ></j-button>
      </div>
      <div class="button-left">
        <j-button
          circle
          class="btn-item"
          icon="notebook"
          type="success"
          @click.stop="openNote()"
        ></j-button>
        <j-button
          circle
          type="success"
          class="btn-item"
          icon="comment"
          @click="jumpToComment()"
        ></j-button>
        <j-button
          type="success"
          class="btn-item"
          circle
          :icon="isGood === true ? 'circle-check-filled' : 'circle-check'"
          @click="addGood"
        ></j-button>
        <j-button
          circle
          type="success"
          class="btn-item"
          :icon="isCollect === true ? 'star-filled' : 'star'"
          @click="addCollect"
        ></j-button>
      </div>
      <n-modal
        v-model:show="noteShow"
        preset="card"
        style="width: 800px;"
        title="笔记"
      >
        <div class="note-main">
          <div ref="toolbarRef" style="border-bottom: 1px solid #ccc; width: 100%; top: 10px; z-index: 99;"></div>
          <div ref="noteEditorRef" style="transform: translateY(10px); height: 300px;"></div>
        </div>
        <template #footer>
          <div style="display: flex; justify-content: flex-end; gap: 8px;">
            <n-button @click="closeNote">取消</n-button>
            <n-button type="primary" @click="saveNote">保存</n-button>
          </div>
        </template>
      </n-modal>
    </div>
    <n-back-top :right="10" :bottom="40" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMainStore } from '@/store'
import PublishBox from '@/components/publishBox/index.vue'
import { createEditor, createToolbar } from '@wangeditor/editor'
import { NSpin, NModal, NButton, NBackTop, useMessage, useDialog } from 'naive-ui'
import { userDetailUpdate } from '@/api/default/user'
import Catalog from '@/components/catalog/index.vue'
import {
  essayQuery,
  essayDetailUpdate,
  essayAddReading
} from '@/api/main/essay'
import {
  essayCommentsQuery,
  essayCommentsCreate,
  essayCommentsDelete
} from '@/api/main/essayComments'
import { essayNoteQuery, essayNoteUpdate } from '@/api/main/essayNote'
import { getToken } from '@/utils/author'

const route = useRoute()
const router = useRouter()
const store = useMainStore()
const message = useMessage()
const dialog = useDialog()

// 响应式数据
const essayForm = ref({
  essay_id: '',
  coverUrl: '',
  title: '',
  subtitle: '',
  digest: '',
  html: ''
})

const noteForm = ref({
  user_id: '',
  essay_id: '',
  html: ''
})

const isGood = ref(false)
const isCollect = ref(false)
const essayData = ref({
  id: route.query,
  essay_id: null,
  good: 0,
  collect: 0
})

const query = ref(route.query)
const commentNum = ref(0)
const publishShow = ref(false)
const showDialog = ref(false)
const commentList = ref([])
const userDetail = ref({})
const collectIds = ref([])
const goodIds = ref([])
const loading = ref(false)
const catalog = ref([])
const catalogShow = ref(true)
const prefix = import.meta.env.VITE_APP_BASE_API
const overHeight = ref(50)
const noteShow = ref(false)
const editor = ref(null)
const noteEditor = ref(null)
const editorRef = ref(null)
const toolbarRef = ref(null)
const noteEditorRef = ref(null)
const snowPosition = ref(0)
const bannerPosition = ref('fixed')
const bannerTop = ref(50)
const opacity = ref(1)
const bannerShow = ref(true)
const tabShow = ref(false)

// 计算属性
const skinType = computed(() => store.skinType)
const snowStyle = computed(() => {
  return {
    transform: `translateX(${snowPosition.value}px) rotate(${snowPosition.value}deg)`
  }
})

// 配置
const editorConfig = ref({
  MENU_CONF: {
    uploadImage: {
      server: import.meta.env.VITE_APP_BASE_API + '/api/file',
      async customInsert(res, insertFn) {
        await insertFn(import.meta.env.VITE_APP_BASE_API + res.data.url)
      }
    }
  }
})

const readConfig = ref({
  readOnly: true
})

const toolbarConfig = ref({})
const mode = ref('default')

// 监听路由变化
watch(() => route.query, (value) => {
  query.value.id = value.id
  init()
}, { deep: true })

// 生命周期
onMounted(() => {
  init()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  // 销毁编辑器
  if (editor.value) {
    editor.value.destroy()
  }
  if (noteEditor.value) {
    noteEditor.value.destroy()
  }
})

// 方法
const handleScroll = () => {
  const flag = 300
  bannerShow.value = true
  if (window.scrollY > flag) {
    bannerPosition.value = 'absolute'
    bannerTop.value = flag
    opacity.value = 0
    bannerShow.value = false
  } else {
    bannerPosition.value = 'fixed'
    bannerTop.value = 50
    opacity.value = (flag - window.scrollY) / flag
  }
  if (opacity.value < 0) {
    opacity.value = 0
    bannerShow.value = false
  } else if (opacity.value > 1) {
    opacity.value = 1
    bannerShow.value = true
  }
}

const init = async () => {
  noteShow.value = false
  await essayAddReading({ id: route.query.id * 1 })
  initUser()
  initComments()
  wowInit()
  initEssay()
}

const wowInit = () => {
  nextTick(() => {
    tabShow.value = true
    new window.$wow({ live: false }).init()
  })
}

const onCreated = (editorInstance) => {
  editor.value = Object.seal(editorInstance)
}

const moveGapLine = (event) => {
  snowPosition.value = event.clientX - 200
}

const moveGapLineBack = () => {
  snowPosition.value = 0
}

const openNote = () => {
  noteShow.value = true
  setTimeout(() => {
    if (toolbarRef.value && noteEditorRef.value) {
      // 销毁之前的编辑器
      if (noteEditor.value) {
        noteEditor.value.destroy()
      }
      // 创建新的编辑器
      noteEditor.value = createEditor({
        selector: noteEditorRef.value,
        html: noteForm.value.html,
        config: editorConfig.value
      })
      // 创建工具栏
      createToolbar({
        editor: noteEditor.value,
        selector: toolbarRef.value,
        config: toolbarConfig.value
      })
    }
  }, 100)
}

const closeNote = () => {
  noteShow.value = false
  // 销毁笔记编辑器
  if (noteEditor.value) {
    noteEditor.value.destroy()
    noteEditor.value = null
  }
  initNote()
}

const delcomment = (item) => {
  dialog.warning({
    title: '提醒',
    content: '要删除吗？一旦删除将不可恢复',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      essayCommentsDelete({ id: item.id }).then((res) => {
        message.success('删除成功')
        initComments()
      })
    }
  })
}

const changeSkin = () => {
  store.changeSkin()
  wowInit()
}

const changeEssay = (type) => {
  essayQuery({
    limit: 999,
    offset: 1,
    query: {
      id: undefined,
      title: undefined,
      subtitle: undefined,
      domain: undefined
    }
  }).then((res) => {
    const arr = res.data.rows
    const idIndex = arr.findIndex(
      (item) => item.id * 1 === query.value.id * 1
    )
    if (idIndex * 1 === arr.length - 1 && type === 'next') {
      message.info('已经是最后一篇了')
    } else if (idIndex * 1 === 0 && type === 'pre') {
      message.info('已经是第一篇了')
    } else {
      if (type === 'next') {
        router.push('/note/essay?id=' + arr[idIndex + 1].id)
      } else if (type === 'pre') {
        router.push('/note/essay?id=' + arr[idIndex - 1].id)
      }
    }
  })
}

const preEssay = () => {
  changeEssay('pre')
}

const nextEssay = () => {
  changeEssay('next')
}

const disableScroll = () => {
  document.addEventListener('wheel', preventDefault, {
    passive: false
  })
}

const enableScroll = () => {
  document.removeEventListener('wheel', preventDefault, {
    passive: false
  })
}

const preventDefault = (e) => {
  e.preventDefault()
}

const initEssay = () => {
  loading.value = true
  essayQuery({
    limit: 1,
    offset: 1,
    query: {
      id: query.value.id * 1,
      title: undefined,
      subtitle: undefined,
      domain: undefined
    }
  }).then((res) => {
    if (route.path === '/note/essay') {
      document.title = res.data.rows[0].title
    }
    const essayDetail = res.data.rows[0]?.essay_detail
    console.log(essayDetail)
    essayData.value = {
      id: null,
      essay_id: query.value.id,
      good: 0,
      collect: 0,
      ...essayDetail
    }
    essayForm.value = res.data.rows[0]
    setTimeout(() => {
      // 初始化编辑器
      if (editorRef.value) {
        editor.value = createEditor({
          selector: editorRef.value,
          html: essayForm.value.html,
          config: {
            readOnly: true
          }
        })
      }
      setTimeout(() => {
        initCatalog()
      }, 300)
      loading.value = false
    }, 1000)
  })
}

const initCatalog = () => {
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
  console.log(titleList);
  if (essayForm.value.digest !== '') {
    const digest = document.getElementById('digest')
    if (digest) {
      const height = digest.offsetHeight
      overHeight.value = height + 400
    }
  } else {
    overHeight.value = 400
  }
}

const jumpToCatalog = (item) => {
  const el = document.documentElement
  const record = document.getElementById(item.id).offsetTop
  let cur = el.scrollTop
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

const initComments = () => {
  essayCommentsQuery({
    limit: 999,
    offset: 1,
    query: {
      essay_id: query.value.id
    }
  }).then((res) => {
    commentList.value = []
    res.data.rows.map((item) => {
      if (item.users[0]) {
        commentList.value.push(item)
      }
    })
    commentNum.value = commentList.value.length
  })
}

const initUser = () => {
  if (getToken('token')) {
    store.getUserInfo().then((user) => {
      if (user.user_detail !== null) {
        userDetail.value = { ...user.user_detail }
        console.log(userDetail.value)

        if (userDetail.value.collect) {
          collectIds.value = userDetail.value.collect.split(',')
        } else {
          collectIds.value = []
        }
        if (collectIds.value.length > 0) {
          isCollect.value = false
          collectIds.value.find((item) => {
            if (item * 1 === query.value.id * 1) {
              isCollect.value = true
            }
          })
        }
        if (userDetail.value.good) {
          goodIds.value = userDetail.value.good.split(',')
        } else {
          goodIds.value = []
        }
        if (goodIds.value.length > 0) {
          isGood.value = false
          goodIds.value.find((item) => {
            if (item * 1 === query.value.id * 1) {
              isGood.value = true
            }
          })
        }
      } else {
        userDetail.value = {
          id: null,
          user_id: user.id,
          collect: '',
          good: ''
        }
      }
      initNote()

      noteForm.value.user_id = user.id
      noteForm.value.essay_id = route.query.id * 1
    })
  }
}

const initNote = () => {
  essayNoteQuery({
    query: {
      essay_id: query.value.id * 1
    }
  }).then((res) => {
    if (res.data.rows.length > 0) {
      const note = res.data.rows
      note.map((item) => {
        if (item.users[0].id === userDetail.value.user_id) {
          noteForm.value.id = item.id
          noteForm.value.html = item.html
        }
      })
    } else {
      noteForm.value.html = ''
    }
  })
}

const saveNote = () => {
  if (getToken('token')) {
    // 获取编辑器内容
    if (noteEditor.value) {
      noteForm.value.html = noteEditor.value.getHtml()
    }
    essayNoteUpdate(noteForm.value).then((res) => {
      if (res) {
        initNote()
        message.success('保存成功，可前往管理中心查看')
      }
    })
  } else {
    message.warning('请先登录')
  }
}

const publishComment = (res) => {
  if (getToken('token')) {
    essayCommentsCreate({ ...res, message: res?.content, essay_id: route.query.id * 1 }).then((res) => {
      initComments()
    })
  } else {
    message.warning('请先登录')
  }
}

const jumpToComment = () => {
  const comment = document.getElementsByClassName('comment-list')
  const height = comment[0].offsetTop + 150
  if (!getToken('token')) {
    message.warning('请先登录')
  }
  const timer = setInterval(function () {
    const offset = document.documentElement.scrollTop
    const speed = height / 35
    publishShow.value = true
    if (offset <= height) {
      document.documentElement.scrollTop = offset + speed
      if (offset * 1 >= height + speed * 1.5) {
        document.documentElement.scrollTop = offset + 200
        clearInterval(timer)
      }
    } else {
      document.documentElement.scrollTop = offset - speed
      if (offset * 1 <= height + speed * 1.5) {
        document.documentElement.scrollTop = offset - 200
        clearInterval(timer)
      }
    }
  }, 1)
}

const addCollect = () => {
  if (getToken('token')) {
    isCollect.value = !isCollect.value
    if (isCollect.value) {
      essayData.value.collect++
      collectIds.value.push(query.value.id)
    } else {
      essayData.value.collect--
      collectIds.value.splice(
        collectIds.value.indexOf(String(query.value.id)),
        1
      )
    }
    if (collectIds.value.length > 1) {
      userDetail.value.collect = collectIds.value.join(',')
    } else {
      userDetail.value.collect = collectIds.value.join('')
    }

    essayDetailUpdate(essayData.value).then((res) => {
      userDetailUpdate(userDetail.value).then((res) => {
        if (isCollect.value === true) {
          message.success('收藏成功，前往个人管理查看')
          initEssay()
        } else {
          message.info('已取消收藏，前往个人管理查看')
          initEssay()
        }
      })
    })
  } else {
    message.warning('用户尚未登录')
  }
}

const addGood = () => {
  if (getToken('token')) {
    isGood.value = !isGood.value
    if (isGood.value) {
      essayData.value.good++
      goodIds.value.push(query.value.id)
    } else {
      essayData.value.good--
      goodIds.value.splice(goodIds.value.indexOf(String(query.value.id)), 1)
    }
    if (goodIds.value.length > 1) {
      userDetail.value.good = goodIds.value.join(',')
    } else {
      userDetail.value.good = goodIds.value.join('')
    }

    essayDetailUpdate(essayData.value).then((res) => {
      userDetailUpdate(userDetail.value).then((res) => {
        if (isGood.value === true) {
          message.success('点赞成功')
          initEssay()
        } else {
          message.info('已取消点赞')
          initEssay()
        }
      })
    })
  } else {
    message.warning('用户尚未登录')
  }
}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped lang="scss">
@import "./scss/index.scss";
</style>
