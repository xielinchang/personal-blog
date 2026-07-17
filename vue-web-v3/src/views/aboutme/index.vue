<template>
  <div>
    <TemplatePage height="300"></TemplatePage>
    <div class="note-main">
      <n-spin :show="loading" size="large">
        <div class="about-me">
          <div class="banner">
            <!-- <div class="introduce-main">
              <div class="user-msg">
                <div class="my-qq">
                  <span> qq: &nbsp;&nbsp;&nbsp; {{ detail.qq }}</span>
                </div>
                <div class="my-email">
                  <span> 邮箱 : {{ detail.email }}</span>
                </div>
              </div>
            </div> -->
          </div>
          <div class="techniques block">
            <ul class="techniques-tags">
              <li
                v-for="item in detail.techniques"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="project wow animate__bounceInUp">
            <ul class="project-list">
              <li
                v-for="item in projectList"
                :key="item.id"
                @click="jumpToProject(item.id)"
              >
                <div class="p-item block">
                  <div class="cover">
                    <img
                      v-lazy="prefix + item.coverUrl"
                      alt=""
                    />
                  </div>
                  <div class="project-msg">
                    <div class="p-time">
                      <div class="p-create flex">
                        <j-icon name="flag" size="14px" color="var(--success11)"></j-icon>
                        <span style="margin: 0 10px;">发布于 </span>
                        {{ item.created_at }}
                      </div>
                    </div>
                    <div class="p-name">
                      <a> {{ item.title }}</a>
                    </div>
                    <div class="p-link">
                      {{ item.link }}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </n-spin>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { NSpin } from 'naive-ui'
import { queryAboutme } from '@/api/main/aboutme'
import { queryProject } from '@/api/main/project'

const router = useRouter()
const detail = ref({})
const projectList = ref([])
const prefix = import.meta.env.VITE_APP_BASE_API
const loading = ref(false)
const casualList = ref([])
const tabShow = ref(false)

onMounted(() => {
  document.documentElement.scrollTop = 0
  initAboutme()
  wowInit()
})

const wowInit = () => {
  nextTick(() => {
    tabShow.value = true
    new window.$wow({ live: false }).init()
  })
}

const initAboutme = () => {
  queryAboutme().then((res) => {
    res.data[0].techniques = res.data[0].techniques.split(',')
    detail.value = { ...res.data[0] }
    initProject()
  })
}

const initProject = () => {
  loading.value = true
  queryProject({
    limit: 999,
    offset: 1,
    query: {
      id: undefined,
      html: undefined,
      name: undefined
    }
  }).then((res) => {
    loading.value = false
    projectList.value = res.data.rows
  })
}

const jumpToProject = (id) => {
  router.push('/note/project?id=' + id)
}
</script>
<style lang="scss" scoped>
@import "./index";
</style>
