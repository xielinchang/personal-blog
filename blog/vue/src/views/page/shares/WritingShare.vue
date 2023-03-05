<template>
  <div class="writing">
    <ControlTabVue default-name="随笔"></ControlTabVue>
    <TemplatePage></TemplatePage>
    <div class="back-to-share-control">
      <img
        src="@/assets/icon/左箭头.png"
        alt=""
        @click="backToShareControl()"
      >
    </div>
    <div class="write-main">
      <div
        class="edit-container animate__animated animate__fadeInUp"
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
            <el-form
              ref="Share"
              :model="Share"
              label-width="80px"
            >
              <el-form-item label="封面：">
                <!-- 上传图片需要token时要加headers -->
                <el-upload
                  class="avatar-uploader"
                  :auto-upload="true"
                  :action="uploadApi"
                  :headers="headers"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img
                    v-if="imgurl"
                    :src="imgurl"
                    class="avatar"
                  />
                  <el-button
                    class="upload-btn"
                    type="primary"
                    plain
                  >上传<i class="el-icon-upload el-icon--right" />
                  </el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="标题：">
                <el-input
                  v-model="Share.title"
                  placeholder="请输入标题"
                  prefix-icon="el-icon-edit"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="标签：">
                <el-tag
                  v-for="tag in newTags"
                  :key="tag"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  v-if="inputVisible"
                  ref="saveTagInput"
                  v-model="inputValue"
                  class="input-new-tag"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput"
                >+ New Tag</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div class="edit-foot">
      <div class="foot-box">
        <div
          class="reset-btn"
          @click="reset"
        >重置</div>
        <div
          class="save-btn"
          :style="{'display':publishdis}"
          @click="save"
        >保存草稿</div>
        <div
          class="publish-btn"
          :style="{'display':publishdis}"
          @click="publish"
        >发布</div>
        <div
          class="edit-btn"
          :style="{'display':editdis}"
          @click="edit"
        >修改</div>
        <div
          class="del-btn"
          :style="{'display':editdis}"
          @click="deleted"
        >删除</div>
      </div>
    </div>
  </div>
</template>

<script>
/* import getToken from '../utils/author' */
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { shareCreate, shareUpdate, shareQuery, shareQuerySave, shareSave } from '../../../api/shareapi'
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
      rules: {
        url: [
          { required: true, message: '请放入封面图片', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        tags: [
          { required: true, message: '请输入标签', trigger: 'blur' }
        ]
      },
      headers: {
        Authorization: ''
      },
      imgurl: ''
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
      if (id === 'undefined') {
        this.publishdis = 'block'
        this.editdis = 'none'
        /* 查询接口 */
        shareQuerySave().then(res => {
          console.log(res)
          this.Share = res.data.rows[0]
          this.newTags = this.Share.tags.split(',')
          console.log(res.data.rows[0].url)
          if (res.data.rows[0].url !== null) {
            that.imgurl = process.env.VUE_APP_BASE_API + res.data.rows[0].url
          } else {
            that.imgurl = ''
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
    handleAvatarSuccess(res) {
      this.Share.url = res.data
      this.imgurl = process.env.VUE_APP_BASE_API + res.data
    },
    beforeAvatarUpload(file) {
      const isJPGorPNG = file.type === 'image/jpeg' || 'image/png'
      const isLt3M = file.size / 1024 / 1024 < 3

      if (!isJPGorPNG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 3MB!')
      }
      return isJPGorPNG && isLt3M
    },
    handleClose(tag) {
      this.newTags.splice(
        this.newTags.indexOf(tag),
        1
      )
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
      this.Share.tags = this.newTags.join(',')
      /* 如果是空数组，直接转换 */
      /* 保存接口 */
      console.log(this.Share)
      shareSave(this.Share).then(res => {
        console.log(res)
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.initShare()
      })
    },
    publish() {
      var _this = this
      /* 创建接口 */
      this.Share.tags = this.newTags.join(',')
      this.Share.tags = this.newTags.join(',')
      this.Share.id = undefined
      shareCreate(this.Share).then(res => {
        this.$message({
          message: '创建成功',
          type: 'success'
        })
        this.reset()
        this.save()
        this.$router.push('/')
      })
    },
    edit() {
      var _this = this
      /* 更新接口 */
      this.Share.tags = this.newTags.join(',')
      shareUpdate(this.Share).then(res => {
        this.$message({
          message: '更新成功',
          type: 'success'
        })
        this.$router.push('/')
      })
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.newTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    deleted() {

    },
    backToShareControl() {
      this.$router.push('/share/control')
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
  height: auto;
  margin-left: 5%;
  top: 20px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
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
  width: 33%;
  position: fixed;
  right: 300px;
  height: 100%;
}
.save-btn,.publish-btn,.reset-btn,.edit-btn,.del-btn{
  width: 100px;
  height: 36px;
  border-radius: 20px;
  border: 1px solid #aaa;
  margin-top: 15px;
  font-size: 16px;
  color: rgb(117, 117, 117);
  text-align: center;
  line-height: 36px;
  float: left;
  margin-left: 20px;
  cursor: pointer;
}
.save-btn:hover{
  border: 1px solid rgb(117, 117, 117);
  color: rgb(79, 79, 79);
}
.publish-btn{
  border: none;

  background: #FC5531;
  color: white;
}
.save-btn{
  margin-left: 15px;
}
.reset-btn{
  border: none;
  margin-left: 20px;
  background: #409cff;
  color: white;
}
.edit-btn{
  border: none;
  margin-left: 20px;
  background: #02b4a8;
  color: white;
}
.del-btn{
  background: #FC5531;
  color: white;
}
.del-btn:hover{
  background: #fb3b10;
}
.reset-btn:hover{
  background: #3295ff;
}
.publish-btn:hover{
  background: #fb3b10;
}
.edit-btn:hover{
  background: rgb(0, 163, 120);
}
.avatar-uploader {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
.avatar {
    width: 100%;
    height: auto;
    min-height: 50px;
    display: block;
    margin-top: 45px;
  }
  .avatar-uploader{
    width: 40%;
  }
 .el-button--primary.is-plain{
    position: absolute;
    left: 0;
    top: 0;
  }
  .turn-to-Write{
    position: fixed;
    width: 40px;
    height: 40px;
    bottom: 10px;
    right: 50px;
    background-image: url(../../../assets/icon/右箭头.png);
    background-size: cover;
    list-style: none;
  }
  .turn-to-Write:hover{
    transform: scale(1.1);
    transition: 300ms;
  }
  .back-to-share-control{
    width: 35px;
    height: 35px;
    position: fixed;
    left: 250px;
    top: 150px;
    z-index: 99999;
  }
  .back-to-share-control img{
    width: 100%;
    height: 100%;
  }
  .back-to-share-control img:hover{
    transform: scale(1.1);
    transition: 300ms;
  }
</style>
