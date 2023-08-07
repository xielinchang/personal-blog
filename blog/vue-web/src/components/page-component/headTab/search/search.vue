<template>
  <div class="search-box">
    <div class="search-main">
      <input
        v-model="message"
        readonly
        onfocus="this.removeAttribute('readonly');"
        placeholder="输入搜索关键字，更多搜索方式点击右下角搜索"
        type="text"
        @keyup.enter="search"
      >
    </div>
    <a
      class="search-btn"
      @click="search"
    >
      <svg-icon
        icon-name="search"
        color="#fff"
      ></svg-icon>
      <span>搜索</span>
    </a>
  </div>
</template>
<script>
export default {
  name: 'SearchBox',
  data () {
    return {
      message: ''
    }
  },
  methods: {
    search() {
      this.$router.push('/home?html=' + this.message)
      this.message = ''
    }
  }
}
</script>
<style lang='scss' scoped>
@import './search.scss';
</style>
