<template>
  <div
    class="more-main"
  >
    <TemplatePage></TemplatePage>
    <div class="more-container">
      <router-link
        to="/more/component"
        class="more-part"
      >
        自定义组件测试
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MorePage',
  data () {
    return {

    }
  },
  mounted() {
    document.documentElement.scrollTop = 0
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
@import "./MorePage.scss";
</style>
