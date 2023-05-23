<template>
  <div>
    <div class="write-main" v-loading="loading">
      <div class="edit-container">
        <div class="edit-main block">
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
              v-model="Project.title"
              :width="inputSize"
              placeholder="请输入标题"
              icon="edit"
            >
            </my-input>
            链接：
            <my-textarea
              style="height: 100px;"
              v-model="Project.link"
              :width="inputSize"
              placeholder="（选填）简要的摘要能帮助读者更好的了解内容"
              maxlength="350"
            ></my-textarea>
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
        <router-link to="/blog/project/writing">
        <my-button
            type="success"
            @click="reset"
          >新增</my-button>
        </router-link>
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
import {queryProject,createProject,updateProject,deleteProject,saveProject,queryProjectSave}from "@/api/main/project";
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
          if(this.isSave){
            this.save()
          }else{
            this.edit();
          }
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
        placeholder: "请输入项目介绍，难点，心得...",
        MENU_CONF: {
          uploadImage: {
            server: process.env.VUE_APP_BASE_API + "/api/file",
            // 自定义插入图片，修改地址
            async customInsert(res, insertFn) {
              await insertFn(process.env.VUE_APP_BASE_API + res.data.url);
            },
          },
        },
      },
      uploadApi: process.env.VUE_APP_BASE_API + "/api/file",
      mode: "default", // or 'simple'
      inputVisible: false,
      inputValue: "",
      Project: {},
      inputSize: 600,
      imgurl: "",
      customImageFile: null,
      changeImg: false,
      file: {},
      headers: {
        Authorization: "",
      },
      loading:false,
      // 文章数据是否被修改
      isModified: false,
      editNum: 0,
    };
  },
  watch: {
    "route.path": function () {
      var _this = this;
      setTimeout(() => {
        _this.initProject();
      }, 100);
    },
    "$route.query": {
      // 监听参数变化重新初始化，比直接location.href刷新页面更加顺滑
      handler(value, oldValue) {
        var _this = this;
        setTimeout(() => {
          _this.initProject();
        }, 100);
      },
      deep: true,
    },
    Project: {
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
    async initProject() {
      this.imgurl = null;
      this.isModified = false;
      if (!this.$route.query.id) {
        this.querySaveProject();
      } else {
        this.queryProject();
      }
    },
    querySaveProject() {
      var _this = this;
      this.isSave = true;
      this.loading=true
     queryProjectSave().then((res) => {
        _this.imgurl = process.env.VUE_APP_BASE_API + res.coverUrl;
        _this.Project = res
        _this.loading = false;
        _this.editNum = 0;
      });
    },
    queryProject() {
      var _this = this;
      var id = this.$route.query.id;
      this.isSave = false;
      this.loading=true
     queryProject({
        limit: 1,
        offset: 1,
        query: {
          id: id * 1,
        },
      }).then((res) => {
        _this.imgurl = process.env.VUE_APP_BASE_API + res.rows[0].coverUrl;
        _this.Project = res.rows[0];
        _this.loading = false;
        _this.editNum = 0;
      });
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
      this.Project.coverUrl = "";
      this.customImageFile = "";
    },
    async onCreated(editor) {
      var _this = this;
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
      // 初始化富文本后初始化文章
      if (this.editor) {
        await this.initProject();
      }
    },
    reset() {
      this.Project = {
        id: 0,
        html: " ",
        coverUrl: "",
        title: "",
        link: "",
      };
      this.imgurl = "";
    },
    // 保存草稿
    save() {
      /* join=>数组转字符串，split=>字符串转数组 */
      var _this = this;
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
            this.Project.coverUrl =res.data.data.url;
            this.saveProjectApi();
          })
          .catch((err) => {
            this.$message.error(err);
          });
      } else {
        this.saveProjectApi();
      }
    },
    saveProjectApi() {
      var _this = this;
      saveProject(this.Project).then((res) => {
        console.log(res);
        this.$message({
            message: "保存成功",
          type: "success",
        });
        setTimeout(() => {
          _this.initProject();
        }, 100);
      });
    },
    publish() {
      var _this = this;
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
            this.Project.coverUrl =res.data.data.url;
            this.createProjectApi();
          })
          .catch((err) => {
            this.$message({
              message: err,
              type: "warning",
            });
          });
      } else {
        this.createProjectApi();
      }
    },
    createProjectApi() {
      createProject(this.Project).then((res) => {
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
    updateProjectApi() {
      updateProject(this.Project).then((res) => {
        this.$message({
            message: "更新成功",
          type: "success",
        });
        this.initProject();
      });
    },
    // 修改文章
    edit() {
      var _this = this;
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
            this.Project.coverUrl = res.data.data.url;
            this.updateProjectApi();
          })
          .catch((err) => {
            this.$message({
              content: err,
              type: "danger",
            });
          });
      } else {
        this.updateProjectApi();
      }
    },
    deleted() {
        this.$confirm( "要删除名为" + this.Project.title + "的文章吗？一旦删除将不可恢复", '提醒', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            deleteProject({ id: this.Project.id }).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.initProject();
          });
        }).catch(() => {
            this.$message({
            type: "info",
            message: "已取消删除",
          });         
        });
    }
  },
};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped lang="scss">
@import "./scss/Writing";
</style>