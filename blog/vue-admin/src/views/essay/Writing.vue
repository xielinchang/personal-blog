<template>
  <div>
    <div class="write-main">
      <div class="edit-container">
        <div class="edit-main block">
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
        <div class="form-container block">
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
            <my-textarea
            style="height: 100px;"
              v-model="Essay.digest"
              :width="inputSize"
              placeholder="（选填）简要的摘要能帮助读者更好的了解内容"
              maxlength="350"
            ></my-textarea>
            标签：
            <my-tags 
            @update-tags="update" 
            :value="newTags">
            </my-tags>
            领域：
            <my-select
              :options="domain"
              :selected="selected"
              @change-select="changeSelect"
            >
            </my-select>
            类型：
            <div>
              <my-radio v-model="Essay.radio" label="1">原创</my-radio>
              <my-radio v-model="Essay.radio" label="2">转载</my-radio>
            </div>
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
  </div>
</template>
<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import {
  essayCreate,
  essayQuerySave,
  essaySave,
  essayQuery,
  essayUpdate,
  essayDelete,
} from "@/api/main/essayapi";
import axios from "axios";
import Cookie from "js-cookie";
export default {
  name: "WritingPage",
  components: {
    Editor,
    Toolbar,
  },
  beforeRouteLeave(to, from, next) {
    var _this = this;
    if (this.isModified) {
        this.$confirm('您还没有保存哦，需要保存吗', '提醒', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'danger'
        }).then(() => {
            this.edit();
          next();
        }).catch(() => {
            next();
          this.$message({
            type: "warning",
            message: "您取消了保存",
          });        
        });
    } else {
      next();
    }
  },
  data() {
    return {
      editor: null,
      toolbarConfig: {},
      html: "",
      // 当前页面是保存草稿还是修改文章
      isSave: true,
      editorConfig: {
        placeholder: "请输入文章内容...",
        MENU_CONF: {
          uploadImage: {
            server: process.env.VUE_APP_BASE_API + "/api/file",
            // 自定义插入图片，修改地址
            async customInsert(res, insertFn) {
              await insertFn(process.env.VUE_APP_BASE_API + res.url);
            },
          },
        },
      },
      uploadApi: process.env.VUE_APP_BASE_API + "/api/file",
      mode: "default", // or 'simple'
      inputVisible: false,
      inputValue: "",
      Essay: {
        id: "",
        html: "",
        coverUrl: "",
        title: "",
        subtitle: "",
        digest: "",
        tags: "",
        domain: null,
        radio: 1,
        state:1
      },
      inputSize: 600,
      imgurl: "",
      customImageFile: null,
      changeImg: false,
      file: {},
      newTags: [],
      domain: [],
      selected: {
        label: "HTML",
        value: "html",
      },
      headers: {
        Authorization: "",
      },
      // 文章数据是否被修改
      isModified: false,
      editNum: 0,
    };
  },
  watch: {
    "route.path": function () {
      var _this = this;
      setTimeout(() => {
        _this.initEssay();
      }, 100);
    },
    "$route.query": {
      // 监听参数变化重新初始化，比直接location.href刷新页面更加顺滑
      handler(value, oldValue) {
        var _this = this;
        setTimeout(() => {
          _this.initEssay();
        }, 100);
      },
      deep: true,
    },
    Essay: {
      handler(newval, oldval) {
        // 第一次修改为初始化，所以要避开
        if (this.editNum > 1) {
          this.isModified = true;
        }
        if (this.isModified) {
          window.addEventListener("beforeunload", this.beforeClose);
        } else {
          window.removeEventListener("beforeunload", this.beforeClose);
        }
      },
      deep: true,
    },
  },
  beforeUpdate() {
    // 页面发生修改时
    this.editNum = this.editNum + 1;
  },
  created() {
    this.domain = this.$store.state.dictionary.domain;
  },
  mounted() {
    // 关闭浏览器时确认是否保存
    var _this = this;
    this.headers.Authorization = Cookie.get("token");
    document.documentElement.scrollTop = 0;
  },
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.beforeClose);
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
    location.reload();
  },
  methods: {
    beforeClose(e) {
      e.preventDefault(); // 阻止默认行为（此处指关闭浏览器或刷新页面）
      e.returnValue = ""; // 在某些老版本的浏览器上需要设置 returnValue 值才能生效
      return "当前数据未保存，确定要离开吗？";
    },
    async initEssay() {
        console.log(this.$route.query.id);
      this.imgurl = null;
      this.isModified = false;
      if (!this.$route.query.id) {
        this.querySaveEssay();
      } else {
        this.queryEssay();
      }
    },
    querySaveEssay() {
      var _this = this;
      this.isSave = true;
      essayQuerySave().then((res) => {
        console.log(res);
        _this.selected.label = res.rows[0].domain;
        _this.imgurl = process.env.VUE_APP_BASE_API + res.rows[0].coverUrl;
        _this.Essay = res.rows[0];
        if (_this.Essay.tags) {
          _this.newTags = _this.Essay.tags.split(",");
        } else {
          _this.newTags = [];
        }
        _this.loading = false;

        _this.editNum = 0;
      });
    },
    queryEssay() {
      var _this = this;
      var id = this.$route.query.id;
      this.isSave = false;
      essayQuery({
        limit: 1,
        offset: 1,
        query: {
          id: id * 1,
          title: undefined,
          subtitle: undefined,
          domain: undefined,
        },
      }).then((res) => {
        _this.selected.label = res.rows[0].domain;
        _this.imgurl = process.env.VUE_APP_BASE_API + res.rows[0].coverUrl;
        _this.Essay = res.rows[0];
        _this.newTags = _this.Essay.tags.split(",");
        _this.loading = false;
        _this.editNum = 0;
      });
    },
    initDomain() {
      this.Essay.domain = this.selected.label;
    },
    uploadCallback(file) {
      this.changeImg = true;
      this.customImageFile = file;
      // // 创建一个读取对象
      var reader = new FileReader();
      // // 将文件转化为一个二进制字符串
      reader.readAsArrayBuffer(file);
      // 监听文件读取完成
      reader.onload = (e) => {
        // 监听完成后，将二进制字符串转化为Blob对象，并且通过URL.createObjectURL创建一个url，指向该Blob对象
        const data = window.URL.createObjectURL(new Blob([e.target.result]));
        // 将生成的url赋值给需要预览的url
        this.imgurl = data;
      };
    },
    deleteCallback() {
      this.imgurl = "";
      this.Essay.coverUrl = "";
      this.customImageFile = "";
    },
    async onCreated(editor) {
      var _this = this;
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
      // 初始化富文本后初始化文章
      if (this.editor) {
        await this.initEssay();
      }
    },
    reset() {
      this.Essay = {
        id: 0,
        html: " ",
        coverUrl: "",
        title: "",
        subtitle: "",
        digest: "",
        tags: "",
        domain: null,
        radio: null,
      };
      this.newTags = [];
      this.imgurl = "";
    },
    save() {
      /* join=>数组转字符串，split=>字符串转数组 */
      var _this = this;
      this.initDomain();
      if (this.newTags.length > 0) {
        this.Essay.tags = this.newTags.join(",");
      }
      // 如果有上传图片，则先调用上传接口，再保存
      if (this.customImageFile) {
        const data = new FormData();
        data.append("file", this.customImageFile);
        axios
          .post(this.uploadApi, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.Essay.coverUrl = res.url;
            this.essaySaveApi();
          })
          .catch((err) => {
            this.$message({
                message: err,
              type: "danger",
            });
          });
      } else {
        this.essaySaveApi();
        console.log(this.Essay.html);
      }
    },
    essaySaveApi() {
      var _this = this;
      essaySave(this.Essay).then((res) => {
        this.$message({
            message: "保存成功",
          type: "success",
        });
        setTimeout(() => {
          _this.initEssay();
        }, 100);
      });
    },
    publish() {
      var _this = this;
      this.initDomain();
      this.Essay.tags = this.newTags.join(",");
      if (this.customImageFile) {
        const data = new FormData();
        data.append("file", this.customImageFile);
        axios
          .post(this.uploadApi, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.Essay.coverUrl = res.url;
            this.essayCreateApi();
          })
          .catch((err) => {
            this.$message({
              message: err,
              type: "warning",
            });
          });
      } else {
        this.essayCreateApi();
      }
    },
    essayCreateApi() {
      essayCreate(this.Essay).then((res) => {
        this.$message({
            message: "创建成功",
          type: "success",
        });
        this.reset();
        this.save();
        this.$router.push("/home");
      });
    },
    update(e) {
      this.newTags = e;
    },
    essayUpdateApi() {
      essayUpdate(this.Essay).then((res) => {
        this.$message({
            message: "更新成功",
          type: "success",
        });
        this.initEssay();
      });
    },
    edit() {
      var _this = this;
      this.initDomain();
      this.Essay.tags = this.newTags.join(",");
      if (this.customImageFile) {
        const data = new FormData();
        data.append("file", this.customImageFile);
        axios
          .post(this.uploadApi, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.Essay.coverUrl = res.url;
            this.essayUpdateApi();
          })
          .catch((err) => {
            this.$message({
              content: err,
              type: "danger",
            });
          });
      } else {
        this.essayUpdateApi();
      }
    },
    deleted() {
        this.$confirm( "要删除名为" + this.Essay.title + "的文章吗？一旦删除将不可恢复", '提醒', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            essayDelete({ id: this.Essay.id }).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.initEssay();
            this.$router.push("/control/essay");
          });
        }).catch(() => {
            this.$message({
            type: "info",
            message: "已取消删除",
          });         
        });
    },
    changeSelect(label, value) {
      this.selected.label = label;
      this.selected.value = value;
      this.Essay.domain = label;
    },
    handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
      
  },
};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped lang="scss">
@import "./scss/Writing";
</style>