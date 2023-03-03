<template>
  <div class="note-main">
    <TemplatePage></TemplatePage>
    <div class="more-container">
      <j-button type="primary">编辑</j-button>
      <!-- <div class="nothing"> 啥 也 没 有 ~ </div> -->
    </div>
  </div>
</template>

<script setup lang='ts' name=''>
import TemplatePage from '../../component/page-component/TemplatePage.vue'
import 'animate.css'
import jButton from '../../component/joy-design/components/button'
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
