<template>
  <div
    class="right-btn"
  >
    <router-link to="/register">
      <IconButton
        left-title="注册"
        icon="register"
      ></IconButton>
    </router-link>
    <IconButton
      :left-title="$store.state.clickShow?'关闭点击特效' : '打开点击特效'"
      icon="click"
      @click.native="clickShow()"
    ></IconButton>
    <back-top
      icon-name="rocket"
      left-title="返回顶部"
    ></back-top>
  </div>
</template>

<script>
export default {
  name: 'RightButton',
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    clickShow() {
      if (this.$store.state.clickShow) {
        this.$msg({
          content: '你已取消了点击特效',
          type: 'success'
        })
      } else {
        this.$msg({
          content: '你已开启了点击特效',
          type: 'success'
        })
      }
      this.$store.state.clickShow = !this.$store.state.clickShow
    }
  }
}
</script>
<style lang="scss" scoped>
.right-btn{
  z-index: 999;
  width: 40px;
  height: calc(40px * 2 + 1 * 10px);
  display: flex;
  position: fixed;
  flex-direction: column;
  bottom: 80px;
  right: 50px;
  justify-content: space-between;
}
</style>
