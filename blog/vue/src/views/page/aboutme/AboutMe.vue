<template>
  <div class="note-main">
    <TemplatePage></TemplatePage>
    <div class="about-container">
      <div class="about-me">
        <div
          v-for="(item,index) in introduce_list"
          :key="index"
          class="introduce-me"
        >
          <div class="introduce-me-tit">{{ item.title }}</div>
          <div class="introduce-me-main">
            <span
              v-for="(item,index) in item.message"
              :key="index"
              class="introduce-me-line"
            >
              {{ item }}
              <br>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import 'animate.css'
export default {
  name: 'NotePage',
  data () {
    return {
      introduce_list: [{
        title: '个人简介',
        message: ['零零后', '前端开发']
      }, {
        title: '擅长技术',
        message: ['JQ', 'vue', 'node', 'egg']
      }, {
        title: '项目经验',
        message: ['码上学生管理系统', '欧美特卫浴官网', '个人博客']
      }, {
        title: '一起成长',
        message: ['好好学习', '天天向上']
      }]
    }
  },
  mounted () {
    document.documentElement.scrollTop = 0
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
@import './scss/AboutMe.scss';
</style>
