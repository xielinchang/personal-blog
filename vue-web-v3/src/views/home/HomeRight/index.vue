<template>
  <div
    class="r-tab-box"
    :style="{ width: width + '%' }"
  >
    <BaiduWhether class="my-whether"></BaiduWhether>
    <div class="essay-types">
      <div class="span">
        <span>classification</span>
        <j-icon name="book" color="var(--theme0)" size="20px"></j-icon>
      </div>
      <ul>
        <li
          v-for="item in essayType"
          v-show="item.count > 0"
          :key="item.value"
          @click="type(item.label)"
        >
          {{ item.value }}
          <span style="font-size: 12px">{{ item.count }}</span>
        </li>
      </ul>
    </div>
    <div id="r-tab" class="r-tab">
      <!-- 页面太花了，暂时隐藏 -->
      <!-- <div class="tab-author">
        <div class="tab-author-img">
          <img :src="prefix + record_default?.img" alt="" />
        </div>
        <div class="tab-author-name">{{ record_default.title }}</div>
        <div class="tab-author-saying">
          {{ record_default.content }}
        </div>
      </div> -->
      <div class="tit-line-name">blog log</div>
      <div class="tit-line"></div>
      <div class="tit-line-active"></div>
      <div class="record">
        <ul class="record-msg">
          <li
            v-for="(item, index) in record_list"
            :key="index"
            class="record-msg-item"
          >
            <div class="record-time">{{ item.created_at }}</div>
            <div class="arrow"></div>
            <div class="shadow-hide"></div>
            <div class="record-shadow"></div>
            <div class="record-shadow-two"></div>
            <div class="record-content">{{ item.message }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDictionaryStore } from '@/store'
import { essayQuery } from '@/api/main/essay'
import { recordQuery, recordDefaultQuery } from '@/api/main/record'
import BaiduWhether from './Whether/BaiduWhether.vue';

const props = defineProps({
  width: {
    type: [Number, String],
    default: 100
  },
})

const router = useRouter()
const dictionaryStore = useDictionaryStore()

const record_list = ref([])
const record_default = ref({})
const essayType = ref([])
const prefix = import.meta.env.VITE_APP_BASE_API

const init = () => {
  recordDefaultQuery().then((res) => {
    record_default.value = res.data[0]
  })
  initEssayType()
}

const initEssayType = async () => {
  essayType.value = dictionaryStore.domain
  const requests = essayType.value.map(type => {
    return essayQuery({ limit: 999, offset: 1, query: { domain: type.label }}).then(res => {
      return { ...type, count: res?.data?.count || 0 }
    })
  })
  const results = await Promise.all(requests)
  essayType.value = results
}

const type = (label) => {
  router.push('/home?domain=' + label)
}

onMounted(() => {
  recordQuery({
    limit: 999,
    offset: 1
  }).then((res) => {
    for (let i = 0; i < res.data.rows.length; i++) {
      record_list.value.push(res.data.rows[i])
    }
  })

  init()
})
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
