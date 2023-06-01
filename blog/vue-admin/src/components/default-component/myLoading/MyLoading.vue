<template>
  <div v-if="loadShow">
    <div class="loading-shadow" @touchmove.prevent @mousewheel.prevent></div>
    <div
      class="loading"
      :style="{ width: size, height: size }"
      @touchmove.prevent
      @mousewheel.prevent
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
