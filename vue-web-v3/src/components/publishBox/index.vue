<template>
  <div class="publish-box">
    <textarea
      id="input"
      v-model="newmessage.content"
      placeholder="saying something..."
      class="message-msg"
      rows="6"
      maxlength="400"
      @click="emojiPickerOff()"
    ></textarea>
    <div class="btns">
      <!-- <div class="emoji-btn" @click="emojiShow">Emoji</div> -->
      <div class="message-publish-btn" @click="publishmessage">Publish</div>
    </div>
    <VEmojiPicker
      v-show="showDialog"
      class="emoji-picker"
      @select="selectEmoji"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
const props = defineProps({
  userId: {
    type: Number || null,
    default: null
  }
})

const emit = defineEmits(['publish-message'])

const showDialog = ref(false)
const publishAgain = ref(true)
const newmessage = ref({
  content: '',
  user_id: null,
  address: ''
})

watch(() => props.userId, (newVal) => {
  newmessage.value.user_id = newVal
})

onMounted(() => {
  newmessage.value.user_id = props.userId
})

const selectEmoji = (emoji) => {
  // 选择emoji后调用的函数
  const input = document.getElementById('input')
  const startPos = input.selectionStart
  const endPos = input.selectionEnd
  const resultText =
            input.value.substring(0, startPos) +
            emoji.data +
            input.value.substring(endPos)
  input.value = resultText
  setTimeout(function () {
    input.focus()
  }, 200)
  input.selectionStart = startPos + emoji.data.length
  input.selectionEnd = endPos + emoji.data.length
  newmessage.value.content = resultText
}

const emojiShow = () => {
  showDialog.value = !showDialog.value
  const input = document.getElementById('input')
  input.value = input.value.substring(0, input.length)
}

const emojiPickerOff = () => {
  showDialog.value = false
}

const reset = () => {
  newmessage.value.content = ''
  publishAgain.value = false
  showDialog.value = false
  setTimeout(function () {
    publishAgain.value = true
  }, 5000)
}

const publishmessage = () => {
  newmessage.value.address = localStorage.getItem('address')
  if (publishAgain.value) {
    emit('publish-message', newmessage.value)
    reset()
  } else {
    window.$msg({
      content: 'too quick, try again later~',
      type: 'info'
    })
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
