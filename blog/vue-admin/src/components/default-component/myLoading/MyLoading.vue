<template>
  <div v-if="loadShow">
    <div class="loading-shadow" @wheel.prevent></div>
    <div
      class="loading"
      :style="{ width: size, height: size }"
    >
      <svg-icon  
        :size="size"
        :name="icon"
        color="#3B8EEA"
      ></svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyLoading",
  props: {
    loadShow: {
      type: Boolean,
      default: false,
    },
    size: {
      type: [String, Number],
      default: "50px",
    },
  },
  data() {
    return {
      icon: "loading",
    };
  },
  mounted() {},
};
</script>

<style scpoed lang="scss">
@import "./MyLoading.scss";
</style>
