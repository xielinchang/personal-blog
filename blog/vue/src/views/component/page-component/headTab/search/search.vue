<template>
  <div class="search-box">
    <div class="search-main">
      <input
        v-model="message"
        placeholder="输入搜索内容，更多搜索在右下角点击搜索按钮"
        type="text"
      >
    </div>
    <router-link :to="'/home?html='+message">
      <div class="search-btn">
        <svg-icon
          icon-name="search"
          color="#fff"
        ></svg-icon>
        <span>搜索</span>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'SearchBox',
  data () {
    return {
      message: ''
    }
  }
}
</script>
<style lang='scss' scoped>
@import './search.scss'
</style>
