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
        class="edit-container animate__animated animate__jackInTheBox"
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
import { essayCreate, essayQuerySave, essaySave, essayQuery, essayUpdate } from '@/api/essayapi'

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
      file: {},
      newTags: [],
      options: [{
        label: 'html',
        value: 'html'
      }, {
        label: 'css',
        value: 'css'
      }, {
        label: 'js',
        value: 'js'
      }, {
        label: 'vue',
        value: 'vue'
      }],
      selected: {
        label: 'html',
        value: '1'
      },
      headers: {
        Authorization: ''
      }
    }
  },
  watch: {
    '$route.path': function(to, from) {
      this.initEssay()
    }
  },
  async mounted () {
    var _this = this
    this.headers.Authorization = Cookie.get('token')
    document.documentElement.scrollTop = 0
    this.initEssay()
  },
  created () {

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
          this.imgurl = process.env.VUE_APP_BASE_API + res.data.rows[0].coverUrl
          that.Essay = res.data.rows[0]
          that.newTags = that.Essay.tags.split(',')
        })
      }
    },
    uploadCallback(file, res) {
      this.Essay.coverUrl = res.data.data.url
      this.imgurl = process.env.VUE_APP_BASE_API + res.data.data.url
    },
    deleteCallback() {
      this.imgurl = ''
      this.Essay.url = ''
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
      if (this.Essay.tags.length > 0) {
        this.Essay.tags = this.newTags.join(',')
      }
      essaySave(this.Essay).then(res => {
        this.$msg({
          content: '保存成功',
          type: 'success'
        })
        _this.initEssay()
      })
    },
    publish() {
      var _this = this
      this.Essay.tags = this.newTags.join(',')
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
    edit() {
      var _this = this
      this.Essay.tags = this.newTags.join(',')
      essayUpdate(this.Essay).then(res => {
        this.$msg({
          content: '更新成功',
          type: 'success'
        })
        this.$router.push('/')
      })
    },
    deleted() {

    },
    backToEssayControl() {
      this.$router.push('/essay/control')
    },
    changeSelect(label, value) {
      console.log(label, value)
      this.selected.label = label
      this.selected.value = value
      this.Essay.domain = value
    }

  }
}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped>
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
  z-index: 999;
  border-top: 2px solid #f0f5fb;
}
.foot-box{
  width: 24%;
  position: fixed;
  right: 300px;
  height: 100%;
  line-height: 50px;
  display: flex;
  justify-content: space-around;
}
  .back-to-essay-control{
    width: 35px;
    height: 35px;
    position: fixed;
    left: 250px;
    top: 150px;
    z-index: 99999;
  }
</style>
