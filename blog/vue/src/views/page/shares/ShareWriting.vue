<template>
  <div class="writing">
    <TemplatePage></TemplatePage>
    <div class="back-to-share-control">
      <svg-icon
        icon-name="back"
        size="40px"
        color="#FC9709"
        @click="backToShareControl()"
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
  data() {
    return {
      editor: null,
      toolbarConfig: {},
      html: '',
      editdis: '',
      publishdis: '',
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
      file: {}
    }
  },
  watch: {
    '$route.path': function(to, from) {
      this.initShare()
    }
  },
  async mounted () {
    var _this = this
    document.documentElement.scrollTop = 0
    this.headers.Authorization = Cookie.get('token')
    this.initShare()
  },
  beforeUnmount() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  methods: {
    initShare() {
      var that = this
      var id = this.$route.query.id
      this.imgurl = ''
      if (id === 'undefined') {
        this.publishdis = 'block'
        this.editdis = 'none'
        /* 查询接口 */
        shareQuerySave().then(res => {
          this.Share = res.data.rows[0]
          if (res.data.rows[0].url !== null) {
            that.imgurl = process.env.VUE_APP_BASE_API + res.data.rows[0].url
          } else {
            that.imgurl = ''
          }
          if (this.Share.tags !== '') {
            this.newTags = this.Share.tags.split(',')
          } else {
            this.newTags = []
          }
        })
      } else {
        this.publishdis = 'none'
        this.editdis = 'block'
        /* 查询接口 */
        shareQuery({
          limit: 1,
          offset: 1,
          query: {
            id: id * 1,
            title: undefined
          }
        }).then(res => {
          that.Share = res.data.rows[0]
          that.newTags = that.Share.tags.split(',')
          if (res.data.rows[0].url === null) {
            this.imgurl = ''
          } else {
            this.imgurl = process.env.VUE_APP_BASE_API + res.data.rows[0].url
          }
        })
      }
    },
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    uploadCallback(file, res) {
      console.log(res)
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
      if (this.Share.tags.length > 0) {
        this.Share.tags = this.newTags.join(',')
      }
      /* 如果是空数组，直接转换 */
      /* 保存接口 */
      const data = new FormData()
      data.append('file', this.customImageFile)
      axios.post(this.uploadApi, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        this.Share.coverUrl = res.data.data.url
        shareSave(this.Share).then(res => {
          this.$msg({
            content: '保存成功',
            type: 'success'
          })
          this.initShare()
        })
      }).catch(err => {
        this.$msg({
          content: err,
          type: 'danger'
        })
        console.log(err)
      })
    },
    publish() {
      var _this = this
      /* 创建接口 */
      this.Share.tags = this.newTags.join(',')
      this.Share.id = undefined
      const data = new FormData()
      data.append('file', this.customImageFile)
      axios.post(this.uploadApi, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        this.Share.coverUrl = res.data.data.url
        shareCreate(this.Share).then(res => {
          this.$msg({
            content: '创建成功',
            type: 'success'
          })
          this.reset()
          this.save()
          this.$router.push('/')
        })
      }).catch(err => {
        this.$msg({
          content: err,
          type: 'danger'
        })
        console.log(err)
      })
    },
    update(e) {
      this.newTags = e
    },
    edit() {
      var _this = this
      /* 更新接口 */
      this.Share.tags = this.newTags.join(',')
      shareUpdate(this.Share).then(res => {
        console.log(res)
        this.initShare()
        this.$msg({
          content: '更新成功',
          type: 'success'
        })
        this.$router.push('/')
      })
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
    },
    backToShareControl() {
      this.$router.push('/control/share')
    }
  }
}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped>
.back-to-share-control{
  width: 35px;
  height: 35px;
  position: fixed;
  left: 250px;
  top: 150px;
  z-index: 999;
}
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
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
}
.edit-main {
  width: 96%;
  margin-left: 2%;

  position: absolute;
}
.block2 {
  border-radius: 4px;
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
  min-height: 400px;
  height: auto;
  margin-left: 5%;
  margin-top: 50px;
}
.form-main {
  position: absolute;
  width: 90%;
  height: 70%;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  top: 20px;
  color: #666;
}
.btns {
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
}
.bubbles{
  position: fixed;
  bottom: 0;
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

</style>
