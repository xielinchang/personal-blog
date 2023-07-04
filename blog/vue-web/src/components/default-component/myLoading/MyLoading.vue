<template>
  <div class="loading-container">
    <!-- 显示 loading -->
    <div class="overlay" v-if="loadShow">
      <div class="loading-icon" :style="{ width: size, height: size }" @touchmove.prevent @mousewheel.prevent>
        <svg-icon :size="size" icon-name="loading" color="#3B8EEA"></svg-icon>
      </div>
    </div>
    <!-- 内部内容 -->
    <div class="content" >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyLoading',
  props: {
    loadShow: {
      type: Boolean,
      default: false
    },
    size: {
      type: [String, Number],
      default: '50px'
    }
  },
  data() {
    return {

    }
  },
  mounted() {

  }
}
</script>

<style scpoed lang="scss">
@import './MyLoading.scss';
</style>
