<template>
  <div class="search-box">
    <div class="search-main">
      <input
        v-model="message"
        readonly
        onfocus="this.removeAttribute('readonly');"
        placeholder="search essay"
        type="text"
        @keyup.enter="search"
      >
    </div>
    <a class="search-btn" @click="search">
      <j-icon v-if="message === ''" name="close" color="var(--success11)"></j-icon>
      <j-icon v-else name="search" color="var(--success11)"></j-icon>
    </a>
  </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import * as JoydDesign from 'joyd-demo';
const { jIcon, jMessage } = JoydDesign;


const router = useRouter()
const message = ref('')

const search = () => {
  if (message.value.length > 1) {
    router.push('/home?keyword=' + message.value)
    message.value = ''
  } else {
    jMessage.default['warning']({
      content: 'please input at least two keywords',
     duration: 1000,
    })
  }
}
</script>
<style lang='scss' scoped>
@import './search.scss';
</style>
