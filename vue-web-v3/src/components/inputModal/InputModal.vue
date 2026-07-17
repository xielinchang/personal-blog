<template>
  <div
    class="input-modal"
    :style="{ width: width, height: height, lineHeight: height }"
  >
    <div ref="textInput" class="content">
      <span>{{ inputText }}</span><span v-if="inputText.length > 0" class="cursor">|</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  width: {
    default: '',
    type: [String]
  },
  height: {
    default: 'auto',
    type: [String]
  },
  content: {
    default: '',
    type: [String]
  },
  displayDelay: {
    default: 100,
    type: [Number]
  }
})

const inputText = ref('')
const typingInProgress = ref(false)
const textInput = ref(null)

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const simulateTyping = async () => {
  // 如果正在进行直接返回
  if (typingInProgress.value) {
    return
  }
  typingInProgress.value = true
  const text = props.content
  let index = 0
  // 输入字符

  nextTick(() => {
    textInput.value.style.width = 28 * text.length + 'px'
  })
  while (index < text.length) {
    inputText.value = text.slice(0, index + 1)
    nextTick(() => {
      textInput.value.style.width = 28 * index + 'px'
    })
    index++
    if (props.displayDelay) {
      await delay(props.displayDelay) // 等待一段时间
    }
  }
  typingInProgress.value = false
}

watch(() => props.content, () => {
  simulateTyping()
})
</script>
<style lang="scss" scoped>
@import "./inputModal.scss";
</style>
