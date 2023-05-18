<template>
  <div class="projectControl">
    <TemplatePage></TemplatePage>
    <div class="project block">
      <ul class="project-list">
        <li
          v-for="item in projectList"
          :key="item.id"
          class="block"
        >
          <router-link
            style="color:#333"
            :to="'/control/project/writing?id=' + item.id"
          >
            <div class="p-item">
              <div class="cover">
                <img
                  :src="prefix+item.coverUrl"
                  alt=""
                >
              </div>
              <div class="project-msg">
                <div class="p-title">
                  {{ item.title }}
                </div>
                <div class="p-create">
                  {{ item.created_at }}
                </div>

              </div>
            </div>

          </router-link>
        </li>
        <li>
          <router-link to="/control/project/writing?id=undefined">
            <div class="add-project-container block">
              <div class="add-project">
                <svg-icon
                  class="add"
                  icon-name="add"
                  size="70px"
                  color="#F1DA4E"
                  right-title="添加新项目"
                />
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <router-link to="/control/project/writing?id=undefined">
      <icon-button
        icon="add"
        class="icon-button"
        left-title="添加新项目"
      ></icon-button>
    </router-link>
  </div>
</template>
<script>
import { queryProject } from '@/api/main/project'
export default {
  data () {
    return {
      prefix: process.env.VUE_APP_BASE_API,
      projectList: []
    }
  },
  mounted () {
    this.initProject()
  },
  methods: {
    initProject() {
      queryProject({
        limit: 999,
        offset: 1,
        query: {
          id: undefined,
          html: undefined,
          title: undefined
        }}).then(res => {
        console.log(res)
        this.projectList = res.data.rows
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import './scss/ProjectControl.scss'
</style>
