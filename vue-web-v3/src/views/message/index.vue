<template>
  <div>
    <TemplatePage
      height="300"
    ></TemplatePage>
    <div class="message-container animated animate__fadeInUp">
      <n-spin :show="loading" size="large">
        <div class="all-message">
          <ul v-if="message_list.length > 0" class="message-list">
            <li v-for="(item, index) in message_list" :key="index">
              <div class="c-portrait">
                <img
                  v-lazy="prefix + item.users[0].portrait"
                  alt=""
                />
              </div>
              <div class="c-name">
                <span> {{ item.users[0].name }}</span>&nbsp;
                <span>{{ item.address }}</span>
              </div>
              <div class="c-create-time">
                {{ item.created_at }}
              </div>
              <div class="c-message">{{ item.content }}</div>
              <div
                v-if="item.users[0].id === user_id"
                class="c-del"
              >
                <j-icon
                  name="delete"
                  size="20px"
                  color="var(--rose5)"
                  style="font-weight: 800"
                  @click="delmessage(item)"
                />
              </div>
              <!-- 用v-show时不管符不符合都会将其渲染，
              而有的为null时因不能渲染时会报错，
              用v-if时不会将其渲染 -->
              <div
                v-if="item.message_reply !== null"
                class="reply-container"
              >
                <div class="author-name">
                  <div class="author-border">Blogger</div>
                </div>
                <div class="author-update-time">
                  {{ item.message_reply.updated_at }}
                </div>
                <div class="author-message">
                  {{ item.message_reply.reply }}
                </div>
              </div>
            </li>
            <div class="query-page-box">
              <n-pagination
                class="message-page"
                :page="currentPage"
                :page-size="pageSize"
                :page-sizes="[5, 10, 15]"
                :item-count="total"
                show-size-picker
                @update:page="changePage"
                @update:page-size="changeSize"
              />
            </div>
          </ul>
          <div v-else class="nothing">No data now</div>
          <!-- 方法名不能加括号 -->
        </div>
        <div class="message-body">
          <PublishBox :user-id="user_id" @publish-message="publishMessage"></PublishBox>
        </div>
      </n-spin>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMainStore } from '@/store'
import { NSpin, NPagination } from 'naive-ui'
import { getToken, removeToken } from '@/utils/author'
import { casualQuery } from '@/api/main/casual'
import { messageQuery, messageCreate, messageDelete } from '@/api/main/message'
import PublishBox from '@/components/publishBox/index.vue'

const route = useRoute()
const router = useRouter()
const store = useMainStore()

// 响应式数据
const randomBg = ref('')
const message_list = ref([])
const showDialog = ref(false)
const text = ref('')
const authorPortrait = ref('')
const currentPage = ref(1)
const total = ref(0)
const pageCount = ref(5)
const pageSize = ref(5)
const ip = ref('')
const address = ref('中国')
const sizeOptions = ref([
  { label: '5条/页', value: 5 },
  { label: '10条/页', value: 10 },
  { label: '15条/页', value: 15 }
])
const prefix = import.meta.env.VITE_APP_BASE_API
const loading = ref(false)
const user_id = ref('')

// 监听路由变化
watch(() => route.path, (to) => {
  if (to === '/message') {
    initUser()
  }
})

// 生命周期
onMounted(() => {
  document.documentElement.scrollTop = 0
  initmessage()
  initUser()
})

// 方法
const initUser = () => {
  if (getToken('token')) {
    store.getUserInfo().then((user) => {
      user_id.value = user.id
    })
  } else {
    removeToken('token')
    store.reSetUserInfo()
  }
}

const initmessage = () => {
  loading.value = true
  messageQuery({
    limit: pageSize.value,
    offset: currentPage.value
  }).then((res) => {
    total.value = res.data.count || res.data.rows.length
    message_list.value = res.data.rows
    loading.value = false
  })
}

const publishMessage = (newmessage) => {
  if (getToken('token')) {
    if (
      newmessage.content !== ''
    ) {
      messageCreate(newmessage).then((res) => {
        initmessage()
        changePage(1)
      })
    } else if (newmessage.content === '') {
      window.$msg({
        content: '不能发送空的消息',
        type: 'info'
      })
    }
    document.documentElement.scrollTop = 0
  } else {
    router.push('/login')
    window.$msg({
      type: 'warning',
      content: '请先登录!'
    })
  }
}

const delmessage = (item) => {
  window.$msgBox.confirm({
    title: '提醒',
    content: '要删除吗？一旦删除将不可恢复',
    type: 'info',
    onOK: () => {
      messageDelete({ id: item.id }).then((res) => {
        console.log(res)
        window.$msg({
          type: 'info',
          content: '删除成功'
        })
        initmessage()
      })
    },
    onCancel: () => {}
  })
}

const changePage = (val) => {
  currentPage.value = val
  initmessage()
}

const changeSize = (val) => {
  pageSize.value = val
}

const emojiPickerOff = () => {
  showDialog.value = false
}
</script>

<style lang="scss" scoped>
@import "./scss/index.scss";
</style>
