<template>
  <div class="note-main">
    <TemplatePage></TemplatePage>
    <div class="about-me">
      <div class="person introduce block">
        <div class="label">
          个人信息
        </div>
        <div class="introduce-main">
          <div class="my-portrait">
            <img
              :src="detail.portrait"
              alt=""
            >
          </div>
          <div class="user-msg">
            <div class="my-qq"><span>
              qq: &nbsp;&nbsp;&nbsp;
            </span>{{ detail.qq }}</div>
            <div class="my-email"><span>
              邮箱 :
            </span>{{ detail.email }}</div>
            <div class="my-phone"><span>
              电话 :
            </span>{{ detail.phone }}</div>
          </div>
        </div>

      </div>
      <div class="person techniques block">
        <div class="label">
          技术栈
        </div>
        <ul class="techniques-tags">
          <li
            v-for="item in detail.techniques"
            :key="item"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="person web-intro block">
        <div class="label">
          网站申明
        </div>
        <div class="web-intro-main">
          {{ detail.web_declare }}
        </div>
      </div>
      <div class="project block">
        <div class="label">
          有点东西但不多
        </div>
        <ul class="project-list">
          <li
            v-for="item in projectList"
            :key="item.id"
            class="block"
            @click="jumpToProject(item)"
          >
            {{ item.name }}

          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { queryAboutme } from '@/api/main/aboutme'
import { projectQuery } from '@/api/main/project'
import { queryUser } from '@/api/default/user'
export default {
  name: 'NotePage',
  data () {
    return {
      detail: {},
      projectList: []
    }
  },
  mounted () {
    document.documentElement.scrollTop = 0
    this.initAboutme()
  },
  methods: {
    initAboutme() {
      queryAboutme().then(res => {
        res.data[0].techniques = res.data[0].techniques.split(',')
        this.detail = { ...res.data[0] }
        this.initUser()
        this.initProject()
      })
    },
    initUser() {
      queryUser({ id: localStorage.getItem('userid') }).then(res => {
        this.detail = { ...this.detail, portrait: process.env.VUE_APP_BASE_API + res.data.user.rows[0].portrait }
      })
    },
    initProject() {
      projectQuery({
        limit: 999,
        offset: 1,
        query: {
          id: undefined,
          html: undefined,
          name: undefined
        }
      }).then(res => {
        this.projectList = res.data.rows
        console.log(res)
      }
      )
    }
  }
}
</script>
<style lang="scss" scoped>
@import './AboutMe';
</style>
