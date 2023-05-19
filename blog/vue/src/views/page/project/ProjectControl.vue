<template>
  <div class="projectControl">
    <TemplatePage></TemplatePage>

    <div class="project block">
      <div class="label">详细信息:</div>
      <div class="aboutme">
        <div class="inputs">
          <my-input
            v-model="aboutmeForm.qq"
            class="my-input"
            label="qq"
            :width="inputSize"
          ></my-input>
          <my-input
            v-model="aboutmeForm.email"
            class="my-input"
            label="email"
            :width="inputSize"
          ></my-input>
          <my-input
            v-model="aboutmeForm.phone"
            class="my-input"
            label="phone"
            :width="inputSize"
          ></my-input>
        </div>
        <div class="web-declare">
          <my-textarea
            v-model="aboutmeForm.web_declare"
            style="margin-top: 10px;"
            label="网站申明:"
            width="400"
            placeholder="请输入内容"
            maxlength="200"
            height="100"
          ></my-textarea>
        </div>
        <div class="techniques">
          <span>技术栈:</span>
          <my-tags
            :value="techniques"
          ></my-tags>
        </div>
        <my-button
          class="edit-btn"
          @click="edit"
        >确认修改</my-button>
      </div>

      <div class="label">项目管理:</div>
      <ul class="project-list block">
        <li
          v-for="item in projectList"
          :key="item.id"
          class="block"
        >
          <div
            class="delete-icon"
            @click="deleted(item.id)"
          >
            <svg-icon
              icon-name="close"

              color="#999"
            ></svg-icon>
          </div>
          <router-link
            style="color:#333;text-decoration: none;"
            :to="'/control/project/writing?id=' + item.id"
          >
            <div class="p-item">
              <div class="cover">
                <img
                  v-lazy="prefix+item.coverUrl"
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
import { queryAboutme, updateAboutme } from '@/api/main/aboutme'
import { queryProject, deleteProject } from '@/api/main/project'
export default {
  data () {
    return {
      prefix: process.env.VUE_APP_BASE_API,
      projectList: [],
      inputSize: 350,
      aboutmeForm: {
        qq: '',
        email: '',
        phone: '',
        techniques: '',
        web_declare: ''
      },
      techniques: []
    }
  },
  watch: {
    '$route.path': {
      // 监听参数变化重新初始化，比直接location.href刷新页面更加顺滑
      handler(value, oldValue) {
        this.initProject()
        this.initAboutme()
      },
      deep: true
    }
  },
  mounted () {
    this.initProject()
    this.initAboutme()
  },
  methods: {
    edit() {
      this.aboutmeForm.techniques = this.techniques.join(',')
      updateAboutme(this.aboutmeForm).then(res => {
        console.log(res)
        this.initAboutme()
        this.$msg({
          content: '修改成功',
          type: 'success'
        })
      })
    },
    initAboutme() {
      queryAboutme().then(res => {
        this.aboutmeForm = res.data[0]
        this.techniques = res.data[0].techniques.split(',')
        console.log(res)
      })
    },
    deleted(id) {
      this.$msgBox.confirm({
        title: '提醒',
        content: '要删除名为' + this.Project.title + '的文章吗？一旦删除将不可恢复',
        type: 'warning',
        onOK: () => {
          deleteProject({ id: id }).then(() => {
            this.$msg({
              content: '删除成功',
              type: 'success'
            })
            this.initProject()
            this.$router.push('/control/project')
          })
        },
        onCancel: () => {
          this.$msg({
            type: 'info',
            content: '已取消删除'
          })
        }
      })
    },
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
