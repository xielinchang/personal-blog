<template>
  <div class="writing">
    <TemplatePage class="write-template"></TemplatePage>
    <div class="back-to-essay-control">
      <svg-icon
        icon-name="back"
        color="#FC9709"
        size="40px"
        @click="backToEssayControl()"
      />
    </div>
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
              v-model="Essay.html"
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
              v-model="Essay.title"
              :width="inputSize"
              placeholder="请输入标题"
              icon-name="edit"
            >
            </my-input>
            副标题：
            <my-input
              v-model="Essay.subtitle"
              placeholder="请输入副标题"
              :width="inputSize"
              icon-name="edit"
            >
            </my-input>
            摘要：
            <my-input
              v-model="Essay.digest"
              :width="inputSize"
              placeholder="（选填）简要的摘要能帮助读者更好的了解内容"
              icon-name="edit"
            >
            </my-input>
            标签：
            <my-tags
              :value="newTags"
              @update-tags="update"
            ></my-tags>
            领域：
            <my-select
              :options="options"
              :selected="selected"
              @change-select="changeSelect"
            >
            </my-select>
            类型：
            <div>
              <my-radio
                v-model="Essay.radio"
                label="1"
              >原创</my-radio>
              <my-radio
                v-model="Essay.radio"
                label="2"
              >转载</my-radio>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="edit-foot">
      <div class="foot-box">
        <my-button
          @click="reset"
        >重置</my-button>
        <my-button
          :style="{'display':publishdis}"
          plain
          type="info"
          @click="save"
        >保存草稿</my-button>
        <my-button
          :style="{'display':publishdis}"
          type="danger"
          @click="publish"
        >发布</my-button>
        <my-button
          :style="{'display':editdis}"
          type="warning"
          @click="edit"
        >修改</my-button>
        <my-button
          :style="{'display':editdis}"
          type="danger"
          @click="deleted"
        >删除</my-button>
      </div>
    </div>
  </div>
</template>

<script>
/* import getToken from '../utils/author' */
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { essayCreate, essayQuerySave, essaySave, essayQuery, essayUpdate, essayDelete } from '@/api/essayapi'
import axios from 'axios'
import Cookie from 'js-cookie'
import 'animate.css'
export default {
  name: 'WritingPage',
  components: {
    Editor,
    Toolbar
  },
  data() {
    return {
      editor: null,
      toolbarConfig: {},
      html: '',
      editdis: '',
      publishdis: '',
      editorConfig: {
        placeholder: '请输入文章内容...',
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
      Essay: {
        id: '',
        html: '',
        coverUrl: '',
        title: '',
        subtitle: '',
        digest: '',
        tags: '',
        domain: null,
        radio: '1'
      },
      inputSize: 600,
      imgurl: '',
      customImageFile: null,
      changeImg: false,
      file: {},
      newTags: [],
      options: [{
        label: 'HTML',
        value: 'html'
      }, {
        label: 'CSS',
        value: 'css'
      }, {
        label: 'JS',
        value: 'js'
      }, {
        label: 'VUE',
        value: 'vue'
      }, {
        label: '其他',
        value: 'other'
      }],
      selected: {
        label: 'HTML',
        value: 'html'
      },
      headers: {
        Authorization: ''
      }
    }
  },
  // watch: {
  //   '$route.path': function(to, from) {
  //     this.initEssay()
  //   }
  // },
  async mounted () {
    var _this = this
    this.headers.Authorization = Cookie.get('token')
    document.documentElement.scrollTop = 0
    this.initEssay()
  },
  created () {
    this.initEssay()
  },
  beforeUnmount() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  methods: {
    initEssay() {
      var that = this
      var id = this.$route.query.id
      this.imgurl = null
      if (id === 'undefined') {
        this.publishdis = 'block'
        this.editdis = 'none'
        essayQuerySave().then(res => {
          this.selected.label = res.data.rows[0].domain
          if (res.data.rows[0].coverUrl !== '') {
            this.imgurl = process.env.VUE_APP_BASE_API + res.data.rows[0].coverUrl
          }
          this.Essay = res.data.rows[0]
          if (this.Essay.tags !== '') {
            this.newTags = this.Essay.tags.split(',')
          } else {
            this.newTags = []
          }
        })
      } else {
        this.publishdis = 'none'
        this.editdis = 'block'
        essayQuery({
          limit: 1,
          offset: 1,
          query: {
            id: id * 1,
            title: undefined,
            subtitle: undefined,
            domain: undefined
          }
        }).then(res => {
          this.selected.label = res.data.rows[0].domain
          this.imgurl = process.env.VUE_APP_BASE_API + res.data.rows[0].coverUrl
          that.Essay = res.data.rows[0]
          that.newTags = that.Essay.tags.split(',')
          console.log(this.Essay.html)
        })
      }
    },
    initDomain() {
      this.Essay.domain = this.selected.label
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
      this.Essay.coverUrl = ''
    },
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    reset() {
      this.Essay = {
        id: 0,
        html: ' ',
        coverUrl: '',
        title: '',
        subtitle: '',
        digest: '',
        tags: '',
        domain: null,
        radio: null
      }
      this.newTags = []
      this.imgurl = ''
    },
    save() {
      /* join=>数组转字符串，split=>字符串转数组 */
      var _this = this
      this.initDomain()
      if (this.Essay.tags.length > 0) {
        this.Essay.tags = this.newTags.join(',')
      }
      console.log(this.Essay)
      // 如果有上传图片，则先调用上传接口，再保存
      if (this.customImageFile) {
        const data = new FormData()
        data.append('file', this.customImageFile)
        axios.post(this.uploadApi, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          console.log(res)
          this.Essay.coverUrl = res.data.data.url
          this.essaySaveApi()
        }).catch(err => {
          this.$msg({
            content: err,
            type: 'danger'
          })
          console.log(err)
        })
      } else {
        this.essaySaveApi()
      }
    },
    essaySaveApi() {
      essaySave(this.Essay).then(res => {
        this.$msg({
          content: '保存成功',
          type: 'success'
        })
        this.initEssay()
      })
    },
    publish() {
      var _this = this
      this.initDomain()
      this.Essay.tags = this.newTags.join(',')
      if (this.customImageFile) {
        const data = new FormData()
        data.append('file', this.customImageFile)
        axios.post(this.uploadApi, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          this.Essay.coverUrl = res.data.data.url
          this.essayCreateApi()
        }).catch(err => {
          this.$msg({
            content: err,
            type: 'danger'
          })
          console.log(err)
        })
      } else {
        this.essayCreateApi()
      }
    },
    essayCreateApi() {
      essayCreate(this.Essay).then(res => {
        this.$msg({
          content: '创建成功',
          type: 'success'
        })
        this.reset()
        this.save()
        this.$router.push('/')
      })
    },
    update(e) {
      this.newTags = e
    },
    edit() {
      var _this = this
      this.initDomain()
      this.Essay.tags = this.newTags.join(',')
      essayUpdate(this.Essay).then(res => {
        this.$msg({
          content: '更新成功',
          type: 'success'
        })
        this.initEssay()
      })
    },
    deleted() {
      this.$msgBox.confirm({
        title: '提醒',
        content: '要删除名为' + this.Essay.title + '的文章吗？一旦删除将不可恢复',
        type: 'warning',
        onOK: () => {
          essayDelete({ id: this.Essay.id }).then((res) => {
            console.log(res)
            this.$msg({
              type: 'success',
              content: '删除成功!'
            })
            this.initEssay()
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
    backToEssayControl() {
      this.$router.push('/control/essay')
    },
    changeSelect(label, value) {
      this.selected.label = label
      this.selected.value = value
      this.Essay.domain = label
    }

  }
}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped lang="scss">
.writing{
  width: 100%;
  height: auto;
}
.write-template{
  width: 100%;
  height: calc(100vh);
  position: fixed;
  top: 0;
  left: 0;
}
.write-main {
  width: 1260px;
  min-width: 1260px;
  margin-left: 50%;
  margin-top: 100px;
  transform: translateX(-50%);
  height: 2000px;
  overflow: hidden;
  z-index: 1;
}
.edit-container{
  width: 65%;
  height: 2000px;
  position: relative;
  margin: auto;
  top: 30px;
  border-radius: 8px;
  box-shadow: 0 0 0 1px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
}
.edit-main {
  width: 96%;
  margin-left: 2%;
  position: absolute;
}
.block2 {
  border-radius: 12px;
  margin-top: 25px;
  background: rgb(255, 255, 255);
}
.edit-shadow {
  width: 90%;
  min-height: 600px;
  position: absolute;
  margin-left: 5%;
}
.form-container{
  position: absolute;
  top: 600px;
  width: 90%;
  padding-bottom: 30px;
  min-height: 800px;
  height: auto;
  margin-left: 5%;
  margin-top: 50px;
}
.form-main {
  position: absolute;
  width: 90%;
  height: 70%;
  margin-left: 5%;
  top: 20px;
  display: flex;
  color: #666;
  flex-direction: column;
  justify-content: space-around;
}
.btns {
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
}
.edit-foot{
  width: 100%;
  height: 65px;
  position: fixed;
  bottom: 0;
  box-shadow: 1px 1px #d3e6fe, 0 0 transparent, 2px 2px rgb(252, 214, 245);
  background: -webkit-linear-gradient(right, rgb(252,233,253,0.5), rgb(211, 242, 252,0.5));
  z-index: 2;
  border-top: 2px solid #f0f5fb;
}
.foot-box{
  width: 24%;
  position: fixed;
  right: 300px;
  height: 100%;
  line-height: 50px;
  z-index: 2;
  display: flex;
  justify-content: space-around;
}
  .back-to-essay-control{
    width: 35px;
    height: 35px;
    position: fixed;
    left: 250px;
    top: 150px;
    z-index: 999;
  }
</style>
