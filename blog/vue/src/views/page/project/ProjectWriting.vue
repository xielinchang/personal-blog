<template>
  <div class="writing">
    <TemplatePage></TemplatePage>
    <my-loading :load-show="loading"></my-loading>
    <div class="write-main">
      <div
        class="edit-container"
      >
        <div class="edit-shadow block2">
          <div class="edit-main">
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editor"
              :default-config="toolbarConfig"
              :mode="mode"
            />
            <Editor
              v-model="Project.html"
              style="height: 500px; overflow-y: hidden"
              :default-config="editorConfig"
              :mode="mode"
              @onCreated="onCreated"
            />
          </div>
        </div>
        <div class="form-container block2">
          <div class="form-main">
            封面：
            <my-upload
              v-model="file"
              :action="uploadApi"
              :image="imgurl"
              :preview="true"
              @delete-img="deleteCallback"
              @upload-success="uploadCallback"
            >
            </my-upload>
            标题：
            <my-input
              v-model="Project.title"
              :width="inputSize"
              placeholder="请输入标题"
              icon-title="edit"
            >
            </my-input>
            链接：
            <my-textarea
              v-model="Project.link"
              height="80"
              :width="inputSize"
              placeholder="(选填)项目演示链接"
              maxlength="340"
            ></my-textarea>
          </div>
        </div>
      </div>
    </div>
    <div
      class="edit-foot"
      style="z-index: 9;"
    >
      <div class="foot-box">
        <div
          v-if="isSave"
          class="btns"
        >
          <my-button
            @click="reset"
          >重置</my-button>
          <my-button
            plain
            type="info"
            @click="save"
          >保存草稿</my-button>
          <my-button
            type="danger"
            @click="publish"
          >发布</my-button>
        </div>
        <div
          v-else
          class="btns"
        >
          <my-button
            @click="reset"
          >重置</my-button>
          <my-button
            type="warning"
            @click="edit"
          >修改</my-button>
          <my-button
            type="danger"
            @click="deleted"
          >删除</my-button>
        </div>

      </div>
    </div>
    <router-link :to="'/note/project?id='+Project.id">
      <icon-button
        v-if="$route.query.id!=='undefined'"
        class="icon-button"
        icon="back"
        left-title="回到对应文章"
      ></icon-button>
    </router-link>
  </div>
</template>
<script>
import { createProject, queryProjectSave, saveProject, queryProject, updateProject, deleteProject } from '@/api/main/project'
import { getToken } from '@/utils/author'
import axios from 'axios'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
  title: 'ProjectWriting',
  components: {
    Editor,
    Toolbar
  },
  beforeRouteLeave(to, from, next) {
    var _this = this
    if (this.isModified) {
      this.$msgBox.confirm({
        title: '提醒',
        content: '您还没有保存哦，需要保存吗',
        type: 'danger',
        onOK: () => {
          this.edit()
          next()
        },
        onCancel: () => {
          next()
          this.$msg({
            type: 'warning',
            content: '您取消了保存'
          })
        }
      })
    } else {
      next()
    }
  },
  data () {
    return {
      loading: true,
      editor: null,
      toolbarConfig: {},
      html: '',
      // 当前页面是保存草稿还是修改
      isSave: true,
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {
            server: process.env.VUE_APP_BASE_API + '/api/file',
            // 自定义插入图片，修改地址
            async customInsert(res, insertFn) {
              await insertFn(process.env.VUE_APP_BASE_API + res.data.url)
            }
          }

        }
      },
      uploadApi: process.env.VUE_APP_BASE_API + '/api/file',
      mode: 'default', // or 'simple'
      inputVisible: false,
      inputValue: '',
      Project: {
        id: '',
        html: '',
        coverUrl: '',
        title: ''
      },
      prefix: process.env.VUE_APP_BASE_API,
      inputSize: 600,
      imgurl: '',
      customImageFile: null,
      changeImg: false,
      file: {},
      headers: {
        Authorization: ''
      },
      // 文章数据是否被修改
      isModified: false,
      editNum: 0
    }
  },
  watch: {
    'route.path': function () {
      var _this = this
      setTimeout(() => {
        _this.initProject()
      }, 100)
    },
    '$route.query': {
      // 监听参数变化重新初始化，比直接location.href刷新页面更加顺滑
      handler(value, oldValue) {
        var _this = this
        setTimeout(() => {
          _this.initProject()
        }, 100)
      },
      deep: true
    },
    Project: {
      handler(newval, oldval) {
        console.log(this.editNum)
        // 存在修改痕迹时再判断
        if (this.editNum > 2) {
          this.isModified = true
        }
        if (this.isModified) {
          window.addEventListener('beforeunload', this.beforeClose)
        } else {
          window.removeEventListener('beforeunload', this.beforeClose)
        }
      },
      deep: true
    }
  },
  beforeUpdate() {
    // 页面发生修改时
    this.editNum = this.editNum + 1
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.beforeClose)
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
    location.reload()
  },
  mounted () {
    // 关闭浏览器时确认是否保存
    var _this = this
    this.headers.Authorization = getToken('token')
    document.documentElement.scrollTop = 0
  },

  methods: {
    async initProject() {
      this.loading = true
      this.imgurl = null
      this.isModified = false
      if (this.$route.query.id === 'undefined') {
        this.querySaveProject()
      } else {
        this.queryProject()
      }
    },
    querySaveProject() {
      var _this = this
      this.isSave = true
      queryProjectSave().then(res => {
        _this.imgurl = process.env.VUE_APP_BASE_API + res.data.coverUrl
        _this.Project = res.data
        _this.loading = false
        _this.editNum = 0
      })
    },
    queryProject() {
      var _this = this
      var id = this.$route.query.id
      this.isSave = false
      queryProject({
        limit: 1,
        offset: 1,
        query: {
          id: id * 1,
          title: undefined,
          html: undefined
        }
      }).then(res => {
        _this.imgurl = process.env.VUE_APP_BASE_API + res.data.rows[0].coverUrl
        _this.Project = res.data.rows[0]
        _this.loading = false
        _this.editNum = 0
      })
    },
    uploadCallback(file) {
      this.changeImg = true
      this.customImageFile = file
      // // 创建一个读取对象
      var reader = new FileReader()
      // // 将文件转化为一个二进制字符串
      reader.readAsArrayBuffer(file)
      // 监听文件读取完成
      reader.onload = (e) => {
      // 监听完成后，将二进制字符串转化为Blob对象，并且通过URL.createObjectURL创建一个url，指向该Blob对象
        const data = window.URL.createObjectURL(new Blob([e.target.result]))
        // 将生成的url赋值给需要预览的url
        this.imgurl = data
      }
    },
    deleteCallback() {
      this.imgurl = ''
      this.Project.coverUrl = ''
      this.customImageFile = ''
    },
    async onCreated(editor) {
      var _this = this
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
      // 初始化富文本后初始化文章
      if (this.editor) {
        await this.initProject()
      }
    },
    reset() {
      this.Project = {
        id: '',
        html: ' ',
        coverUrl: '',
        title: '',
        link: ''
      }
      this.imgurl = ''
    },
    save() {
      var _this = this
      // 如果有上传图片，则先调用上传接口，再保存
      if (this.customImageFile) {
        const data = new FormData()
        data.append('file', this.customImageFile)
        axios.post(this.uploadApi, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          this.Project.coverUrl = res.data.data.url
          this.projectSaveApi()
        }).catch(err => {
          this.$msg({
            content: err,
            type: 'danger'
          })
        })
      } else {
        this.projectSaveApi()
      }
    },
    projectSaveApi() {
      var _this = this
      this.Project.id = 1
      saveProject(this.Project).then(res => {
        this.$msg({
          content: '保存成功',
          type: 'success'
        })
        setTimeout(() => {
          _this.initProject()
        }, 100)
      })
    },
    publish() {
      var _this = this
      if (this.customImageFile) {
        const data = new FormData()
        data.append('file', this.customImageFile)
        axios.post(this.uploadApi, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          this.Project.coverUrl = res.data.data.url
          this.ProjectCreateApi()
        }).catch(err => {
          this.$msg({
            content: err,
            type: 'danger'
          })
        })
      } else {
        this.ProjectCreateApi()
      }
    },
    ProjectCreateApi() {
      this.Project.id = undefined
      console.log(this.Project)
      createProject(this.Project).then(res => {
        this.$msg({
          content: '创建成功',
          type: 'success'
        })
        this.reset()
        this.save()
      })
    },
    projectUpdateApi() {
      updateProject(this.Project).then(res => {
        this.$msg({
          content: '更新成功',
          type: 'success'
        })
        this.initProject()
      })
    },
    edit() {
      var _this = this
      if (this.customImageFile) {
        const data = new FormData()
        data.append('file', this.customImageFile)
        axios.post(this.uploadApi, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          this.Project.coverUrl = res.data.data.url
          this.projectUpdateApi()
        }).catch(err => {
          this.$msg({
            content: err,
            type: 'danger'
          })
        })
      } else {
        this.projectUpdateApi()
      }
    },
    deleted() {
      this.$msgBox.confirm({
        title: '提醒',
        content: '要删除名为' + this.Project.title + '的文章吗？一旦删除将不可恢复',
        type: 'warning',
        onOK: () => {
          console.log(1)
          deleteProject({ id: this.$route.query.id }).then((res) => {
            this.$msg({
              type: 'success',
              content: '删除成功!'
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
    }
  }

}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang='scss' scoped>
@import './scss/ProjectWriting.scss'
</style>
