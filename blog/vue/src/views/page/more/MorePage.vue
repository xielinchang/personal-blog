<template>
  <div class="note-main">
    <TemplatePage></TemplatePage>
    <div class="more-container">
      <svg-icon
        icon-name="aim"
        color="red"
        size="66px"
      ></svg-icon>
      <!-- <div class="nothing"> 啥 也 没 有 ~ </div> -->
    </div>
  </div>
</template>

<script>

import 'animate.css'
export default {
  name: 'NotePage',
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
<style>
</style>
<style scoped>

.note-main{
    width: 100%;
    min-height: calc(100vh);
}
.head-tab{
    margin: auto;
}
.more-container {
  width: 60%;
  height: 1200px;
  position: absolute;
  margin-left: 50%;
  transform: translateX(-50%);
  top: 100px;
  border-radius: 8px;
  background: rgb(255,255,255 ,0.6);
  box-shadow: 0 0 0 1px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
}
.nothing{
  width: 100%;
  height: 100px;
  font-size: 60px;
  font-weight: 900;
  text-align: center;
  line-height: 100px;
  margin-top: 10%;
  color: rgba(116, 116, 116, 0.6);
}
</style>
