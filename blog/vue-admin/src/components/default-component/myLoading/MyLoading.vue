<template>
  <div class="loading-container">
    <!-- 显示 loading -->
    <div class="overlay" v-if="loadShow">
      <!-- loading图标高度看看能否通过clientHeight让他处于当前的可视高度中间 -->
      <div
        id="icon"
        :style="{ width: size, height: size, top: iconTop + 'px' }"
      >
        <svg-icon :size="size" name="loading" color="#3B8EEA"></svg-icon>
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
  name: "MyLoading",
  props: {
    loadShow: {
      type: Boolean,
      default: true,
    },
    size: {
      type: [String, Number],
      default: "50px",
    },
    // 自定义图标高度
    iconTop: {
      type: [String, Number],
      default: null,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scpoed lang="scss">
@import "./MyLoading.scss";
</style>
