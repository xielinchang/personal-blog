<template>
    <div>
        <my-loading :load-show="loading">
            <div class="write-main">
                <div class="edit-container">
                    <div class="edit-main">
                        <Toolbar
                            style="
                                border-bottom: 1px solid #ccc;
                                width: calc(98% - 205px);
                                position: fixed;
                                top: 114px;
                                z-index: 99;
                            "
                            :editor="editor"
                            :default-config="toolbarConfig"
                            :mode="mode"
                        />
                        <Editor
                            v-model="Project.html"
                            style="transform: translateY(80px)"
                            :style="{
                                width: catalog.length > 0 ? '75%' : '100%',
                            }"
                            :default-config="editorConfig"
                            :mode="mode"
                            @onCreated="onCreated"
                        />
                    </div>
                </div>
                <div class="edit-foot">
                    <div class="foot-box">
                        <div v-if="isSave" class="btns">
                            <my-button @click="reset">Reset</my-button>
                            <my-button plain type="info" @click="save"
                                >Save Draft</my-button
                            >
                            <my-button type="danger" @click="publish"
                                >Publish</my-button
                            >
                        </div>
                        <div v-else class="btns">
                            <router-link to="/blog/project/writing">
                                <my-button type="success" @click="reset"
                                    >Add</my-button
                                >
                            </router-link>
                            <my-button @click="reset">Reset</my-button>
                            <my-button type="warning" @click="edit"
                                >Edit</my-button
                            >
                            <my-button type="danger" @click="deleted"
                                >Delete</my-button
                            >
                        </div>
                    </div>
                </div>
            </div>
            <catalog
                v-show="catalog.length > 0 && catalogShow"
                :catalog="catalog"
                :over="overHeight"
                @jump-catalog="jumpToCatalog"
            ></catalog>
            <el-dialog
                title="Project Details"
                :visible.sync="dialogVisible"
                width="60%"
                :before-close="handleClose"
            >
                <div class="form-container">
                    <div class="form-main">
                        Cover:
                        <my-upload
                            v-model="file"
                            :action="uploadApi"
                            :image="imgurl"
                            :preview="true"
                            @delete-img="deleteCallback"
                            @upload-success="uploadCallback"
                        >
                        </my-upload>
                        Title:
                        <my-input
                            v-model="Project.title"
                            :width="inputSize"
                            placeholder="Please enter title"
                            icon="edit"
                        >
                        </my-input>
                        Link:
                        <my-textarea
                            style="height: 100px"
                            v-model="Project.link"
                            :width="inputSize"
                            placeholder="(Optional) A brief summary can help readers better understand the content"
                            maxlength="350"
                        ></my-textarea>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="handleClose">Cancel</el-button>
                    <el-button type="primary" @click="handleOK"
                        >Confirm</el-button
                    >
                </span>
            </el-dialog>
        </my-loading>
    </div>
</template>
<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import {
    queryProject,
    createProject,
    updateProject,
    deleteProject,
    saveProject,
    queryProjectSave,
} from "@/api/main/project";
import axios from "axios";
import Cookie from "js-cookie";
import catalog from "./component/catalog.vue";
export default {
    name: "WritingPage",
    components: {
        Editor,
        Toolbar,
        catalog,
    },
    beforeRouteLeave(to, from, next) {
        var _this = this;
        if (this.isModified) {
            this.$confirm("You haven't saved yet, are you sure you want to leave?", "Reminder", {
                confirmButtonText: "Confirm",
                cancelButtonText: "Cancel",
                type: "danger",
            })
                .then(() => {
                    this.$message({
                        type: "warning",
                        message: "You cancelled saving",
                    });
                    next();
                })
                .catch(() => {});
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
                placeholder: "Please enter project introduction, difficulties...",
                MENU_CONF: {
                    uploadImage: {
                        server: process.env.VUE_APP_BASE_API + "/api/file",
                        // 自定义插入图片，修改地址
                        async customInsert(res, insertFn) {
                            await insertFn(
                                process.env.VUE_APP_BASE_API + res.data.url
                            );
                        },
                    },
                },
            },
            uploadApi: process.env.VUE_APP_BASE_API + "/api/file",
            mode: "default", // or 'simple'
            inputVisible: false,
            inputValue: "",
            Project: {},
            inputSize: 500,
            imgurl: "",
            customImageFile: null,
            changeImg: false,
            file: {},
            headers: {
                Authorization: "",
            },
            // 文章数据是否被修改
            isModified: false,
            editNum: 0,
            loading: false,
            dialogVisible: false,
            operateType: "",
             // 目录
             catalog: [],
            // 目录显示
            catalogShow: true,
            overHeight: 0, //  跳转目录的偏离高度，和其他元素的高度相关
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
                } else {
                    this.isModified = false;
                }
                if (this.isModified) {
                    window.addEventListener("beforeunload", this.beforeClose);
                } else {
                    window.removeEventListener(
                        "beforeunload",
                        this.beforeClose
                    );
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
        this.watchTitle();
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
            return "The current data is not saved, are you sure you want to leave?";
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
            this.loading = true;
            this.editNum = 0;
            queryProjectSave().then((res) => {
                _this.imgurl = process.env.VUE_APP_BASE_API + res.coverUrl;
                _this.Project = res;
                _this.loading = false;
                setTimeout(() => {
                    // 初始化目录
                    _this.initCatalog();
                    _this.loading = false;
                }, 1000);
            });
        },
        queryProject() {
            var _this = this;
            var id = this.$route.query.id;
            this.isSave = false;
            this.loading = true;
            this.editNum = 0;
            queryProject({
                limit: 1,
                offset: 1,
                query: {
                    id: id * 1,
                },
            }).then((res) => {
                _this.imgurl =
                    process.env.VUE_APP_BASE_API + res.rows[0].coverUrl;
                _this.Project = res.rows[0];
                _this.loading = false;
                setTimeout(() => {
                    // 初始化目录
                    _this.initCatalog();
                    _this.loading = false;
                }, 1000);
            });
        },
        watchTitle() {
            let initialH1Count = document.querySelectorAll(
                "h1, h2, h3, h4, h5, h6, h7"
            ).length;
            const _this = this;
            // 创建一个MutationObserver实例，监视目标节点的变化
            const observer = new MutationObserver(function (mutationsList) {
                // 获取当前的元素数量
                let currentH1Count = document.querySelectorAll(
                    "h1, h2, h3, h4, h5, h6, h7"
                ).length;

                // 检查元素数量是否发生变化
                if (currentH1Count !== initialH1Count) {
                    _this.initCatalog();
                    initialH1Count = currentH1Count;
                }
            });
            // 监听整个文档的变化
            observer.observe(document, { childList: true, subtree: true });
        },
        initCatalog() {
            // 优化跳转目录=> 根据h1 - h3生成目录树有层级关系，h4以后的不生成目录
            this.catalog = [];
            var id = 1;
            var titleList = document.querySelectorAll(
                "h1, h2, h3, h4, h5, h6, h7"
            );
            console.log(titleList);
            for (let i = 0; i < titleList.length; i++) {
                /* 去掉回车时默认留的2个长度的默认字符 */
                if (titleList[i].innerText.length - 2) {
                    const element = titleList[i];
                    element.id = "h-" + id++ * 1;
                    this.catalog.push({
                        key: element.innerText,
                        id: element.id,
                        offset: element.offsetTop,
                    });
                }
            }
            this.overHeight = 0;
        },
        jumpToCatalog(item) {
            const el = document.querySelector(".content");
            const _this = this;
            var record = document.getElementById(item.id).offsetTop;
            var cur = el.scrollTop;
            // 相距越远，step应该越大
            var step = (record - cur) / 40;
            var flag = false;
            var over = this.overHeight + 1;
            if (record < cur) {
                // step = -step;
                flag = true;
            } else if (record === cur) {
                return;
            }
            var timer = setInterval(() => {
                _this.disableScroll();
                if (flag) {
                    //  说明小于0
                    if (cur < record) {
                        el.scrollTop = record + over;
                        _this.enableScroll();
                        clearInterval(timer);
                    } else {
                        el.scrollTop = cur + step + over;
                    }
                } else {
                    if (cur > record) {
                        el.scrollTop = record + over;
                        _this.enableScroll();
                        clearInterval(timer);
                    } else {
                        el.scrollTop = cur + step + over;
                    }
                }
                cur += step;
            }, 1);
        },
                // 阻止滚动事件
        disableScroll() {
            document.addEventListener("wheel", this.preventDefault, {
                passive: false,
            });
        },
        // 开启滚动事件
        enableScroll() {
            document.removeEventListener("wheel", this.preventDefault, {
                passive: false,
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
                const data = window.URL.createObjectURL(
                    new Blob([e.target.result])
                );
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
                html: " ",
                coverUrl: "",
                title: "",
                link: "",
            };
            this.imgurl = "";
        },

        saveProjectApi(showMsg) {
            var _this = this;
            saveProject(this.Project).then((res) => {
                if (showMsg !== false) {
                    this.$message({
                        message: "Save successful",
                        type: "success",
                    });
                }
                setTimeout(() => {
                    _this.initProject();
                }, 100);
            });
        },
        handleClose() {
            this.dialogVisible = false;
        },
        // 修改
        edit() {
            this.dialogVisible = true;
            this.operateType = "edit";
        },
        // 发布
        publish() {
            this.dialogVisible = true;
            this.operateType = "publish";
        },
        // 保存草稿
        save() {
            this.dialogVisible = true;
            this.operateType = "save";
        },
        // 操作统一的确认按钮，通过type实现不同的操作
        handleOK() {
            if (this.operateType === "publish") {
                this.publishOperate();
            } else if (this.operateType === "edit") {
                this.editOperate();
            } else {
                this.saveOperate();
            }
            this.dialogVisible = false;
        },
        publishOperate() {
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
        editOperate() {
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
        /**
         * 
         * @param {表示是否显示保存成功的提示，不是则传false，默认显示} showMsg 
         */
        saveOperate(showMsg) {
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
                        this.Project.coverUrl = res.data.data.url;
                        this.saveProjectApi(showMsg);
                    })
                    .catch((err) => {
                        this.$message.error(err);
                    });
            } else {
                this.saveProjectApi(showMsg);
            }
        },
        createProjectApi() {
            delete this.Project.id;
            let _this = this;
            this.Project.state = 1;
            createProject(this.Project).then((res) => {
                this.$message({
                    message: "Create successful",
                    type: "success",
                });
                this.reset();
                this.saveOperate(false);
                this.dialogVisible = false;
            });
        },
        update(e) {
            this.newTags = e;
        },
        updateProjectApi() {
            updateProject(this.Project).then((res) => {
                console.log(res);
                this.$message({
                    message: "Update successful",
                    type: "success",
                });
                this.initProject();
            });
        },

        deleted() {
            this.$confirm(
                "Are you sure you want to delete the project named " +
                    this.Project.title +
                    "? Once deleted, it cannot be recovered",
                "Reminder",
                {
                    confirmButtonText: "Confirm",
                    cancelButtonText: "Cancel",
                    type: "warning",
                }
            )
                .then(() => {
                    deleteProject({ id: this.Project.id }).then((res) => {
                        this.$message({
                            type: "success",
                            message: "Delete successful!",
                        });
                        this.$router.push("/blog/project/control");
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "Deletion cancelled",
                    });
                });
        },
    },
};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped lang="scss">
@import "./scss/Writing";
</style>