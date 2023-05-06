<template>
  <div class="writing">
    <TemplatePage></TemplatePage>
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
              v-model="Share.html"
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
              @delete-img="deleteCallback"
              @upload-success="uploadCallback"
            >
            </my-upload>
            标题：
            <my-input
              v-model="Share.title"
              :width="inputSize"
              placeholder="请输入标题"
              icon-name="edit"
            >
            </my-input>
            标签：
            <my-tags
              :value="newTags"
              @update-tags="update"
            ></my-tags>
          </div>
        </div>
      </div>
    </div>
    <div class="edit-foot">
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
    <router-link :to="'/note/share?id='+Share.id">
      <icon-button
        class="icon-button"
        icon="back"
        left-title="回到对应文章"
      ></icon-button>
    </router-link>
  </div>
</template>

<script>
/* import getToken from '../utils/author' */
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { shareCreate, shareUpdate, shareQuery, shareQuerySave, shareSave, shareDelete } from '../../../api/shareapi'
import Cookie from 'js-cookie'
import axios from 'axios'
import 'animate.css'
export default {
  name: 'WritingPage',
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
  data() {
    return {
      editor: null,
      toolbarConfig: {},
      html: '',
      isSave: true,
      editorConfig: {
        placeholder: '请输入随笔内容...',
        MENU_CONF: {
          uploadImage: {
            server: process.env.VUE_APP_BASE_API + '/api/file'
          }
        }
      },
      uploadApi: process.env.VUE_APP_BASE_API + '/api/file',
      mode: 'default', // or 'simple'
      inputVisible: false,
      inputValue: '',
      Share: {
        html: '',
        url: '',
        title: '',
        tags: '',
        id: ''
      },
      newTags: [],
      headers: {
        Authorization: ''
      },
      inputSize: 500,
      imgurl: '',
      customImageFile: null,
      changeImg: false,
      file: {},
      // 数据是否被修改
      isModified: false,
      editNum: 0
    }
  },
  watch: {
    '$route.path': function(to, from) {
      this.initShare()
    },
    Share: {
      handler(newval, oldval) {
        var _this = this
        // 第一次修改为初始化，所以要避开
        this.editNum = this.editNum + 1
        if (this.editNum > 1) {
          _this.isModified = true
        }
        if (_this.isModified) {
          window.addEventListener('beforeunload', _this.beforeClose)
        } else {
          window.removeEventListener('beforeunload', _this.beforeClose)
        }
      },
      deep: true
    }
  },
  async mounted () {
    var _this = this
    document.documentElement.scrollTop = 0
    this.headers.Authorization = Cookie.get('token')
    this.initShare()
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.beforeClose)
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  methods: {
    initShare() {
      var _this = this
      var id = this.$route.query.id
      this.imgurl = ''
      if (id === 'undefined') {
        this.isSave = true
        /* 查询接口 */
        shareQuerySave().then(res => {
          this.Share = res.data.rows[0]
          if (res.data.rows[0].url !== null) {
            _this.imgurl = process.env.VUE_APP_BASE_API + res.data.rows[0].url
          } else {
            _this.imgurl = ''
          }
          if (this.Share.tags !== '') {
            this.newTags = this.Share.tags.split(',')
          } else {
            this.newTags = []
          }
          _this.editNum = 0
          _this.isModified = false
        })
      } else {
        this.isSave = false
        /* 查询接口 */
        shareQuery({
          limit: 1,
          offset: 1,
          query: {
            id: id * 1,
            title: undefined
          }
        }).then(res => {
          _this.Share = res.data.rows[0]
          _this.newTags = _this.Share.tags.split(',')
          if (res.data.rows[0].url === null) {
            this.imgurl = ''
          } else {
            this.imgurl = process.env.VUE_APP_BASE_API + res.data.rows[0].url
          }
          _this.editNum = 0
          _this.isModified = false
        })
      }
    },
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    uploadCallback(file, res) {
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
      this.Essay.coverUrl = ''
      this.customImageFile = ''
    },
    reset() {
      this.Share = {
        html: ' ',
        url: null,
        title: '',
        tags: '',
        id: 0
      }
      this.newTags = []
      this.imgurl = null
    },
    save() {
      /* join=>数组转字符串，split=>字符串转数组 */
      var _this = this
      if (this.newTags.length > 0) {
        this.Share.tags = this.newTags.join(',')
      }
      /* 如果是空数组，直接转换 */
      /* 保存接口 */
      if (this.customImageFile) {
        const data = new FormData()
        data.append('file', this.customImageFile)
        axios.post(this.uploadApi, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          this.Share.coverUrl = res.data.data.url
          this.shareSaveApi()
        }).catch(err => {
          this.$msg({
            content: err,
            type: 'danger'
          })
        })
      } else {
        this.shareSaveApi()
      }
    },
    shareSaveApi() {
      shareSave(this.Share).then(res => {
        this.$msg({
          content: '保存成功',
          type: 'success'
        })
        this.initShare()
      })
    },
    publish() {
      var _this = this
      /* 创建接口 */
      if (this.newTags.length) {
        this.Share.tags = this.newTags.join(',')
      }
      this.Share.id = undefined
      if (this.customImageFile) {
        const data = new FormData()
        data.append('file', this.customImageFile)
        axios.post(this.uploadApi, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          this.Share.coverUrl = res.data.data.url
          this.shareCreateApi()
        }).catch(err => {
          this.$msg({
            content: err,
            type: 'danger'
          })
        })
      } else {
        this.shareCreateApi()
      }
    },
    shareCreateApi() {
      shareCreate(this.Share).then(res => {
        this.$msg({
          content: '创建成功',
          type: 'success'
        })
        this.reset()
        this.save()
        this.$router.push('/')
      })
    },
    shareUpdateApi() {
      var _this = this
      /* 更新接口 */
      if (this.newTags.length) {
        this.Share.tags = this.newTags.join(',')
      }

      shareUpdate(this.Share).then(res => {
        this.initShare()
        this.$msg({
          content: '更新成功',
          type: 'success'
        })
        this.$router.push('/')
      })
    },
    update(e) {
      this.newTags = e
    },
    edit() {
      if (this.customImageFile) {
        const data = new FormData()
        data.append('file', this.customImageFile)
        axios.post(this.uploadApi, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          this.Share.coverUrl = res.data.data.url
          this.shareUpdateApi()
        }).catch(err => {
          this.$msg({
            content: err,
            type: 'danger'
          })
        })
      } else {
        this.shareUpdateApi()
      }
    },
    deleted() {
      this.$msgBox.confirm({
        title: '提醒',
        content: '要删除名为' + this.Share.title + '的随笔吗？一旦删除将不可恢复',
        type: 'warning',
        onOK: () => {
          shareDelete({ id: this.Share.id }).then(res => {
            this.$msg({
              type: 'success',
              content: '删除成功!'
            })
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
<style scoped lang="scss">
@import "./scss/ShareWriting.scss";
</style>
