<template>
  <div class="essay-list">
    <div class="essay-body" :style="{ width: width + '%' }">
      <n-spin :show="loading" size="large" class="loading">
        <ul class="essay-list-main">
          <li
            v-for="(item, index) in essay_list"
            :key="index" class="essay-item" @mousemove="moveIn($event,index)" @mouseleave="moveOut($event,index)"
            @click="jumpToEssay(item)"
          >
            <img v-lazy="item.coverUrl" class="item-main" />
            <div class="item-bottom">
              <div class="item-time"><j-icon
                size="12px" class="update-icon" name="calendar" color="var(--theme0)"
              ></j-icon> {{ item.updated_at }}</div>
              <div class="permission">
                {{ item.radio * 1 === 2 ? "Reprint" : "" }}
              </div>
              <div class="item-title"><a>{{ item.title }}</a></div>
              <ul class="item-type">
                <li v-for="(item, index) in essay_list[index].tags" :key="index">
                  {{ item }}
                </li>
              </ul>
              <div class="item-reading"><j-icon
                name="view" size="12px"
                class="view-icon"
                color="var(--text7)"
              ></j-icon>{{ item.reading_num }}</div>
            </div>
          </li>
          <div v-show="essay_list.length === 0" class="nothing">No data matches</div>
        </ul>
        <div v-show="essay_list.length > 0" class="query-page-box">
          <n-pagination
            class="query-page"
            :page="currentPage"
            :page-size="pageSize"
            :page-sizes="[6, 12, 18]"
            :item-count="total"
            show-size-picker
            @update:page="changePage"
            @update:page-size="changeSize"
          />
        </div>
      </n-spin>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NSpin, NPagination } from 'naive-ui'
import { essayQuery } from '@/api/main/essay'

const props = defineProps({
  width: {
    type: String,
    default: null
  }
})

const route = useRoute()
const router = useRouter()

const essay_list = ref([])
const currentPage = ref(1)
const total = ref(0)
const pageCount = ref(5)
const pageSize = ref(6)
const sizeOptions = ref([
  { label: '6 items/page', value: 6 },
  { label: '12 items/page', value: 12 },
  { label: '18 items/page', value: 18 }
])
const loading = ref(false)

const moveIn = (e, i) => {
  const el = document.getElementsByClassName('essay-item')[i]
  const Range = [-10, 10]
  function getRoateDeg(range, value, length) {
    return ((value / length) * (range[1] - range[0])) + range[0]
  }
  const { clientX, clientY } = e
  const { left, top, width, height } = el.getBoundingClientRect()
  const offsetX = clientX - left
  const offsetY = clientY - top
  const ry = -getRoateDeg(Range, offsetX, width)
  const rx = getRoateDeg(Range, offsetY, height)
  el.style.setProperty('--rx', `${rx}deg`)
  el.style.setProperty('--ry', `${ry}deg`)
}

const moveOut = (e, i) => {
  const el = document.getElementsByClassName('essay-item')[i]
  el.style.setProperty('--rx', `0deg`)
  el.style.setProperty('--ry', `0deg`)
}

const foreachEssay = (item) => {
  essay_list.value = []
  for (let i = 0; i < item.length; i++) {
    item[i].tags = item[i].tags.split(',')
    item[i].coverUrl = import.meta.env.VITE_APP_BASE_API + item[i].coverUrl
    essay_list.value.push(item[i])
  }
}

const initEssayList = () => {
  loading.value = true
  const params = route.query

  const query = {
    id: undefined,
    domain: undefined,
    html: undefined,
    tags: undefined,
    keyword: undefined
  }
  Object.assign(query, params)
  essayQuery({
    limit: pageSize.value,
    offset: currentPage.value,
    query
  }).then((res) => {
    total.value = res?.data.count || res?.data.rows.length || 0
    foreachEssay(res?.data?.rows || [])
    loading.value = false
  })
}

const jumpToEssay = (item) => {
  if (route.path === '/control/essay') {
    router.push('/control/essay/writing?id=' + item.id)
  } else {
    router.push('/note/essay?id=' + item.id)
  }
}

const changePage = (val) => {
  currentPage.value = val
  initEssayList()
}

const changeSize = (val) => {
  pageSize.value = val
}

onMounted(() => {
  initEssayList()
})

watch(() => route.path, () => {
  initEssayList()
})

watch(() => route.params, () => {
  // 参数变化，搜索时自动跳转第一页
  changePage(1)
})
</script>

<style scoped lang="scss">
@import "index.scss";
</style>

