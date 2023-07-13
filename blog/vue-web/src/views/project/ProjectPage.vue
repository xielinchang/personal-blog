<template>
  <div>
    <TemplatePage></TemplatePage>
    <my-loading
      :load-show="loading"
      icon-top="400"
    >
      <div class="project">
        <div class="project-top">
          <div class="banner">
            <div class="baner-mark">
              <div
                class="mark"
                :style="{ 'backgroundImage': `url(${prefix + projectForm.coverUrl})` }"
              ></div>
              <div class="shadow-mark"></div>
              <div
                class="banner-img"
                :style="{ 'backgroundImage': `url(${prefix + projectForm.coverUrl})` }"
              >
              </div>
            </div>
          </div>
          <div class="title block">
            <div class="label">
              项目名称:
            </div>
            <span>
              {{ projectForm.title }}
            </span>
          </div>
          <div class="link block">
            <div class="label">
              相关链接:
            </div>
            <my-textarea
              v-model="projectForm.link"
              :width="500"
              :is-resize="false"
              :height="100"
              border-width="0"
              disabled
            >
            </my-textarea>
          </div>
        </div>

        <div class="project-content block">
          <div class="label">项目介绍</div>
          <div v-html="projectForm.html"></div>
        </div>
      </div>
      <div class="icon-buttons">
        <router-link :to="'/control/project/writing?id=' + $route.query.id">
          <icon-button
            v-if="hasPermi"
            class="icon-button"
            icon="edit"
            left-title="编辑"
          ></icon-button>
        </router-link>
        <icon-button
          class="icon-button"
          icon="left"
          left-title="上一篇"
          @click.native="preProject()"
        ></icon-button>
        <icon-button
          class="icon-button"
          icon="right"
          left-title="下一篇"
          @click.native="nextProject()"
        ></icon-button>
      </div>
    </my-loading>
  </div>
</template>
<script>
import store from '@/store'
import { queryProject } from '@/api/main/project'
export default {
  name: 'ProjectPage',
  data() {
    return {
      projectForm: {},
      loading: false,
      prefix: process.env.VUE_APP_BASE_API

    }
  },
  computed: {
    hasPermi() {
      return store.state.hasPermi
    }
  },
  watch: {
    '$route.query': {
      // 监听参数变化重新初始化
      handler(value, oldValue) {
        var _this = this
        this.initProject()
      },
      deep: true
    }
  },
  mounted() {
    this.initProject()
  },
  methods: {
    initProject() {
      queryProject({
        limit: 1,
        offset: 1,
        query: {
          id: this.$route.query.id
        }
      }).then(res => {
        console.log(res)
        this.projectForm = res.data.rows[0]
      })
    },
    preProject() {
      this.changeProject('pre')
    },
    nextProject() {
      this.changeProject('next')
    },
    changeProject(type) {
      queryProject({
        limit: 999,
        offset: 1,
        query: {
          id: undefined,
          title: undefined,
          html: undefined
        }
      }).then(res => {
        const arr = res.data.rows
        const idIndex = arr.findIndex(item => item.id * 1 === this.$route.query.id * 1)
        if (idIndex * 1 === arr.length - 1 && type === 'next') {
          this.$msg({
            content: '已经是最后一篇了',
            type: 'info'
          })
        } else if (idIndex * 1 === 0 && type === 'pre') {
          this.$msg({
            content: '已经是第一篇了',
            type: 'info'
          })
        } else {
          if (type === 'next') {
            // 直接跳转路由再初始化并不会生效，因为只改变了参数的值
            // 可以直接使用location.href刷新页面来重新初始化
            // 通过监听参数变化来重新初始化可以避免刷新
            this.$router.push('/note/Project?id=' + arr[idIndex + 1].id)
          } else if (type === 'pre') {
            this.$router.push('/note/Project?id=' + arr[idIndex - 1].id)
          }
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import './scss/ProjectPage.scss';
</style>
