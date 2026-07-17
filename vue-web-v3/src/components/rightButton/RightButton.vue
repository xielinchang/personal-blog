<template>
  <div v-if="exceptRoute" class="right-btn">
    <j-button
      icon="magic-stick"
      @click="changeSkin"
      type="success"
      circle
    >
    </j-button>
    <n-back-top :right="10" :bottom="40"></n-back-top>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMainStore } from '@/store'
import { useMessage } from 'naive-ui'
import { NButton, NBackTop, NSelect, NInput } from 'naive-ui'

const router = useRouter()
const route = useRoute()
const store = useMainStore()
const message = useMessage()

const exceptRouteList = ['/note/essay', '/note/project']

// 计算属性
const exceptRoute = computed(() => {
  return !exceptRouteList.includes(route.path.toLocaleLowerCase())
})

// 方法
const changeSkin = () => {
  store.changeSkin()
  nextTick(() => {
    if (window.$wow) {
      new window.$wow({ live: false }).init()
    }
  })
}

</script>

<style lang="scss" scoped>
@import './RightButton.scss'
</style>