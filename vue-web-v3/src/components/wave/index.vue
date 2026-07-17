<template>
  <div class="wave">
    <div class="mask"></div>
    <div class="wave-cover">
      <!-- <j-icon :size="size" color="var(--same0)" name="valley-white"></j-icon> -->
      <img src="@/assets/svg/valley-white.svg" alt="">
    </div>
    <!-- <div class="wave-container">
      <div class="wave-bg">
        <j-icon :size="size" name="wave-bg"></j-icon>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const size = ref(window.innerWidth)

onMounted(() => {
  // 可以在这里添加窗口大小变化的监听
  window.addEventListener('resize', () => {
    size.value = window.innerWidth
  })
})
</script>

<style>
@import url('./index.scss');
</style>
