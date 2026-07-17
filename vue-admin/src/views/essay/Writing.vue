<template>
    <div>
        <my-loading :load-show="loading">
            <div class="write-main">
                <div class="edit-container">
                    <div class="edit-main">
                        <Toolbar style="
                                border-bottom: 1px solid #ccc;
                                width: calc(98% - 205px);
                                position: fixed;
                                top: 114px;
                                z-index: 99;
                            " :editor="editor" :default-config="toolbarConfig" :mode="mode" />
                        <Editor v-model="Essay.html" style="transform: translateY(80px)" :style="{
                            width: catalog.length > 0 ? '75%' : '100%',
                        }" :default-config="editorConfig" :mode="mode" @onCreated="onCreated" />
                    </div>
                </div>
                <div class="edit-foot">
                    <div class="foot-box">
                        <div v-if="isSave" class="btns">
                            <my-button @click="reset">Reset</my-button>
                            <my-button plain type="info" @click="save">Save Draft</my-button>
                            <my-button type="danger" @click="publish">Publish</my-button>
                        </div>
                        <div v-else class="btns">
                            <router-link to="/blog/essay/writing">
                                <my-button type="success" @click="reset">New</my-button>
                            </router-link>
                            <my-button @click="reset">Reset</my-button>
                            <my-button type="warning" @click="edit">Edit</my-button>
                            <my-button type="danger" @click="deleted">Delete</my-button>
                        </div>
                    </div>
                </div>
            </div>
            <catalog v-show="catalog.length > 0 && catalogShow" :catalog="catalog" :over="overHeight"
                @jump-catalog="jumpToCatalog"></catalog>
            <el-dialog title="文章详情" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
                <div class="form-container">
                    <div class="form-main">
                        <div class="form-item">
                            封面：
                            <my-upload v-model="file" :action="uploadApi" :image="imgurl" :preview="true"
                                @delete-img="deleteCallback" @upload-success="uploadCallback">
                            </my-upload>
                        </div>
                        <div class="form-item">
                            Title:
                            <my-input v-model="Essay.title" :width="inputSize" placeholder="Please enter title"
                                icon="edit">
                            </my-input>
                        </div>
                        <div class="form-item">
                            Subtitle:
                            <my-input v-model="Essay.subtitle" placeholder="Please enter subtitle" :width="inputSize"
                                icon="edit">
                            </my-input>
                        </div>
                        <div class="form-item" style="width: 100%">
                            Summary:
                            <my-textarea style="height: 100px; width: 100%" v-model="Essay.digest" width="100%"
                                placeholder="A brief summary helps readers better understand the content"
                                maxlength="350"></my-textarea>
                        </div>
                        <div class="form-item" style="width: 100%">
                            Tags:
                            <my-tags @update-tags="update" :value="newTags">
                            </my-tags>
                        </div>
                        <div class="form-item">
                            Domain:
                            <my-select :options="domain" :selected="selected" @change-select="changeSelect">
                            </my-select>
                        </div>
                        <div class="form-item" style="width: 100%">
                            Type:
                            <div>
                                <my-radio v-model="Essay.radio" label="1">Original</my-radio>
                                <my-radio v-model="Essay.radio" label="2">Repost</my-radio>
                            </div>
                        </div>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="handleClose">Cancel</el-button>
                    <el-button type="primary" @click="handleOK">Confirm</el-button>
                </span>
            </el-dialog>
        </my-loading>
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
} from "@/api/main/essay";
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
            this.$confirm("You have unsaved changes. Are you sure you want to leave?", "Warning", {
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
                .catch(() => { });
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
                placeholder: "Please enter article content...",
                MENU_CONF: {
                    uploadImage: {
                        server: process.env.VUE_APP_BASE_API + "/api/file",
                        maxFileSize: 5 * 1024 * 1024,
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
            Essay: {
                html: "",
                coverUrl: "",
                title: "",
                subtitle: "",
                digest: "",
                tags: "",
                domain: null,
                radio: 1,
                state: 1,
            },
            inputSize: 250,
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
            loading: false,
            dialogVisible: false,
            operateType: "", //  操作是编辑还是发布
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
                _this.initEssay();
            }, 1000);
        },
        "$route.query": {
            // 监听参数变化重新初始化，比直接location.href刷新页面更加顺滑
            handler(value, oldValue) {
                var _this = this;
                setTimeout(() => {
                    _this.initEssay();
                }, 1000);
            },
            deep: true,
        },
        Essay: {
            handler(newval, oldval) {
                console.log(this.editNum);
                
                if (this.editNum > 1) {
                    // 判断文章是否有改动，是则为true
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
    created() {
        this.domain = this.$store.state.dictionary.domain;
    },
    mounted() {
        // 关闭浏览器时确认是否保存
        var _this = this;
        this.headers.Authorization = Cookie.get("token");
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
        handleClose() {
            this.dialogVisible = false;
        },
        // 发布按钮
        publish() {
            this.dialogVisible = true;
            this.operateType = "publish";
        },
        // 修改按钮
        edit() {
            this.dialogVisible = true;
            this.operateType = "edit";
        },
        // 保存草稿按钮
        save() {
            this.dialogVisible = true;
            this.operateType = "save";
        },
        // dialog确认按钮
        handleOK() {
            if (this.operateType === "publish") {
                this.publishOperate();
            } else if (this.operateType === "edit") {
                this.editOperate();
            } else if (this.operateType === "save") {
                this.saveOperate();
            }
            this.dialogVisible = false;
        },
        // 发布主要操作
        publishOperate() {
            // 发布
            var _this = this;
            this.initDomain();
            if (this.newTags.length > 0) {
                this.Essay.tags = this.newTags.join(",");
            }
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
                        this.Essay.coverUrl = res.data.data.url;
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
        // 编辑主要操作
        editOperate() {
            // 修改
            var _this = this;
            this.initDomain();
            this.Essay.tags = this.newTags.join(",");

            if (this.customImageFile) {
                const data = new FormData();
                data.append("file", this.customImageFile);
                axios.post(this.uploadApi, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                    .then((res) => {
                        this.Essay.coverUrl = res.data.data.url;
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
        // 保存主要操作
        saveOperate(showMsg) {
            // 保存草稿
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
                        this.Essay.coverUrl = res.data.data.url;
                        this.essaySaveApi(showMsg);
                    })
                    .catch((err) => {
                        this.$message({
                            message: err,
                            type: "danger",
                        });
                    });
            } else {
                this.essaySaveApi(showMsg);
            }
        },
        beforeClose(e) {
            e.preventDefault(); // 阻止默认行为（此处指关闭浏览器或刷新页面）
            e.returnValue = ""; // 在某些老版本的浏览器上需要设置 returnValue 值才能生效
            return "Current data is not saved, are you sure you want to leave?";
        },
        async initEssay() {
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
            this.loading = true;
            essayQuerySave().then((res) => {
                _this.selected.label = res.rows[0].domain;
                _this.imgurl =
                    process.env.VUE_APP_BASE_API + res.rows[0].coverUrl;
                _this.Essay = res.rows[0];
                if (_this.Essay.tags) {
                    _this.newTags = _this.Essay.tags.split(",");
                } else {
                    _this.newTags = [];
                }
                _this.loading = false;
                _this.editNum = 0;
                setTimeout(() => {
                    // 初始化目录
                    _this.initCatalog();
                    _this.loading = false;
                }, 1000);
            });
        },
        queryEssay() {
            var _this = this;
            var id = this.$route.query.id;
            this.isSave = false;
            this.loading = true;
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
                _this.imgurl =
                    process.env.VUE_APP_BASE_API + res.rows[0].coverUrl;
                _this.Essay = res.rows[0];
                _this.newTags = _this.Essay.tags.split(",");
                _this.loading = false;
                _this.editNum = 0;
                setTimeout(() => {
                    // 初始化目录
                    _this.initCatalog();
                    _this.loading = false;
                }, 1000);
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
                const data = window.URL.createObjectURL(
                    new Blob([e.target.result])
                );
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
            window.scrollTo(0, 0);
            if (this.editor) {
                await this.initEssay();
            }
        },
        reset() {
            this.Essay = {
                html: "",
                coverUrl: "",
                title: "",
                subtitle: "",
                digest: "",
                tags: "",
                state: 1,
                domain: null,
                radio: 1,
            };
            this.deleteCallback();
            this.newTags = [];
        },

        essaySaveApi(showMsg) {
            var _this = this;
            essaySave(this.Essay).then((res) => {
                if (showMsg !== false) {
                    this.$message({
                        message: "Saved successfully",
                        type: "success",
                    });
                }

                _this.initEssay();
            });
        },
        /**
         * 
         * @param {表示是否显示保存成功的提示，不是则传false，默认显示} showMsg 
         */
        essayCreateApi() {
            this.loading = true;
            console.log(this.Essay);
            const _this = this
            try {
                essayCreate({ ...this.Essay, id: undefined }).then((res) => {
                    this.$message({
                        message: "Created successfully",
                        type: "success",
                    });
                    this.loading = false;
                    this.reset();
                    this.saveOperate(false);
                    this.dialogVisible = false;
                }).finnally(() => {
                    _this.loading = false;
                });
            } catch (error) {
                _this.loading = false;
            }
        },
        update(e) {
            this.newTags = e;
        },
        essayUpdateApi() {
            const _this = this
            try {
                essayUpdate(this.Essay).then((res) => {
                    this.$message({
                        message: "Updated successfully",
                        type: "success",
                    });
                    this.initEssay();
                }).finnally(() => {
                    _this.loading = false;
                });
            } catch (error) {
                this.loading = false;
            }

        },

        deleted() {
            this.$confirm(
                "Are you sure you want to delete the article named " +
                this.Essay.title +
                "? This action cannot be undone",
                "Warning",
                {
                    confirmButtonText: "Confirm",
                    cancelButtonText: "Cancel",
                    type: "warning",
                }
            )
                .then(() => {
                    essayDelete({ id: this.Essay.id }).then((res) => {
                        this.$message({
                            type: "success",
                            message: "Delete successful!",
                        });
                        this.$router.push("/blog/essay/control");
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "Deletion cancelled",
                    });
                });
        },
        changeSelect(label, value) {
            this.selected.label = label;
            this.selected.value = value;
            this.Essay.domain = value;
        },
        // 用observer监听title数量
        watchTitle() {
            // let initialH1Count = document.querySelectorAll(
            //     "h1, h2, h3, h4, h5, h6, h7"
            // ).length;
            const _this = this;
            // 创建一个MutationObserver实例，监视目标节点的变化
            const observer = new MutationObserver(function (mutationsList) {
                // 获取当前的元素数量
                // let currentH1Count = document.querySelectorAll(
                //     "h1, h2, h3, h4, h5, h6, h7"
                // ).length;

                // 检查元素数量是否发生变化
                // if (currentH1Count !== initialH1Count) {
                _this.initCatalog();
                // initialH1Count = currentH1Count;
                // }
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
    },
};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped lang="scss">
@import "./scss/Writing";
</style>
