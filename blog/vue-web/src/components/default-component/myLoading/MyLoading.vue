<template>
  <div class="loading-container">
    <!-- 显示 loading -->
    <div
      v-if="loadShow"
      class="overlay"
    >
    <!--@touchmove.prevent
      @mousewheel.prevent -->
      <div
        class="loading-icon"
        :style="{ width: size, height: size, top: fixedTop + 'px',position:fixedTop?'fixed':'' }"
      >
        <svg-icon
          :size="size"
          icon-name="loading"
          color="#3B8EEA"
        ></svg-icon>
      </div>
    </div>
    <!-- 内部内容 -->
    <div class="content">
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
    },
    // 自定义图标高度
    fixedTop: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scpoed lang="scss">
@import './MyLoading.scss';
</style>
