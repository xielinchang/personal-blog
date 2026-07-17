<template>
    <div>
        <div class="photo-main" v-loading="loading">
            <el-card class="box-card">
                <div class="buttons">
                    <el-button
                        type="primary"
                        size="small"
                        icon="el-icon-plus"
                        @click="appendShow"
                        >Add</el-button
                    >
                </div>
                <el-table :data="photoList" style="width: 100%">
                    <el-table-column
                        align="center"
                        prop="id"
                        label="Photo ID"
                        width="100"
                    />
                    <el-table-column
                        align="center"
                        prop="sort"
                        label="Sort"
                        width="100"
                    />
                    <el-table-column
                        align="center"
                        prop="photo_caption"
                        label="Photo Caption"
                        width="120"
                    />

                    <el-table-column
                        align="center"
                        prop="content"
                        label="Content"
                        width="500"
                    >
                        <template slot-scope="scpoe">
                            <img
                                width="80%"
                                :src="prefix + scpoe.row.photo_url"
                                alt=""
                            />
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="created_at"
                        label="Created Time"
                        width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        align="center"
                        fixed="right"
                        label="Actions"
                        
                    >
                        <template slot-scope="scope">
                            <el-button
                                slot="reference"
                                type="text"
                                icon="el-icon-edit"
                                size="small"
                                @click="handleUpdate(scope.row, scope.$index)"
                                >Edit</el-button
                            >
                            <el-button
                                slot="reference"
                                type="text"
                                icon="el-icon-delete"
                                size="small"
                                @click="handleDelete(scope.row, scope.$index)"
                                >Delete</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
            <div class="pages">
                <el-pagination
                    class="page-box"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 15, 20, totalpage]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalpage"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </div>
        </div>
        <el-dialog
            title="Add"
            :visible.sync="photoVisable"
            width="30%"
            :before-close="handleClose"
        >
            <div style="display: flex; flex-direction: column">
                <span style="margin: 10px">Sort:</span>
                <el-input-number
                    v-model="photoForm.sort"
                    :min="1"
                    :max="9999"
                    label="Sort"
                ></el-input-number>
                <span style="margin: 10px">Caption:</span>
                <el-input
                    v-model="photoForm.photo_caption"
                    placeholder="Please enter content"
                ></el-input>
                <span style="margin: 10px">Upload:</span>
                <my-upload
                    style="margin-right: 20px"
                    v-model="file"
                    :action="uploadApi"
                    :image="imgurl"
                    :preview="true"
                    @delete-img="deleteCallback"
                    @upload-success="uploadCallback"
                >
                </my-upload>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button
                    type="primary"
                    @click="(photoVisable = false), (photoForm = {})"
                    >Cancel</el-button
                >
                <el-button type="success" @click="append">Confirm Add</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="Edit"
            :visible.sync="updateVisible"
            width="30%"
            :before-close="handleClose"
        >
            <div style="display: flex; flex-direction: column">
                <span style="margin: 10px">Sort:</span>
                <el-input-number
                    v-model="updateForm.sort"
                    :min="1"
                    :max="9999"
                    label="Sort"
                ></el-input-number>
                <span style="margin: 10px">Caption:</span>
                <el-input
                    v-model="updateForm.photo_caption"
                    placeholder="Please enter content"
                ></el-input>
                <span style="margin: 10px">Image (Cannot be modified):</span>
                <my-upload
                    style="margin-right: 20px"
                    v-model="file"
                    :action="uploadApi"
                    :image="prefix + updateForm.photo_url"
                    :disabled="true"
                    :preview="true"
                    @delete-img="deleteCallback"
                    @upload-success="uploadCallback"
                >
                </my-upload>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button
                    type="primary"
                    @click="(updateVisible = false), (updateForm = {})"
                    >Cancel</el-button
                >
                <el-button type="success" @click="updateCheck">Confirm</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {
    photoQuery,
    photoDelete,
    photoCreate,
    photoUpdate,
} from "@/api/main/photoWall";
import axios from "axios";
export default {
    name: "photoWall",
    data() {
        return {
            photoList: [],
            currentPage: 1,
            pagesize: 5,
            totalpage: 0,
            prefix: process.env.VUE_APP_BASE_API,
            photoForm: {
                sort: "",
                photo_caption: "",
                photo_url: "",
            },
            updateForm: {
                sort: "",
                photo_caption: "",
                photo_url: "",
            },
            photoVisable: false,
            updateVisible: false,
            uploadApi: process.env.VUE_APP_BASE_API + "/api/file",
            imgurl: "",
            customImageFile: null,
            file: {},
            loading: false,
        };
    },
    mounted() {
        this.initPhotoList();
    },
    methods: {
        initPhotoList() {
            this.loading = true;
            photoQuery({
                limit: this.pagesize,
                offset: this.currentPage,
            }).then((res) => {
                this.totalpage = res.count;
                this.photoList = res.rows;
                this.loading = false;
            });
        },
        appendShow() {
            this.photoVisable = true;
        },
        handleDelete(item) {
            this.$confirm(
                "Are you sure you want to delete photo with id " + item.id + "? This action cannot be undone",
                "Tip",
                {
                    confirmButtonText: "Confirm",
                    cancelButtonText: "Cancel",
                    type: "warning",
                }
            )
                .then(() => {
                    photoDelete({ id: item.id }).then(() => {
                        this.$message({
                            type: "success",
                            message: "Delete successful!",
                        });
                        this.initPhotoList();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "Delete cancelled",
                    });
                });
        },
        handleUpdate(item) {
            this.updateForm = item;
            this.updateVisible = true;
        },
        updateCheck() {
            photoUpdate(this.updateForm).then((res) => {
                if (res) {
                    this.$message({
                        message: "Update successful",
                        type: "success",
                    });
                    this.updateVisible = false;
                }
            });
        },
        uploadCallback(file) {
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
            this.customImageFile = "";
        },
        handleSizeChange(val) {
            /* val,pageindex为每页有多少条 */
            this.pagesize = val;
            this.initPhotoList();
        },
        append() {
            if (this.customImageFile) {
                const data = new FormData();
                data.append("file", this.customImageFile);
                axios
                    .post(this.uploadApi, data)
                    .then((res) => {
                        this.photoForm.photo_url = res.data.data.url;
                        this.createApi();
                    })
                    .catch((err) => {
                        this.$message.error(err);
                    });
            } else {
                this.createApi();
            }
        },
        createApi() {
            this.loading = true;
            var _this = this
            photoCreate(this.photoForm).then(() => {
                this.$message({
                    type: "success",
                    message: "Add successful!",
                });
                this.initPhotoList();
                this.photoVisable = false;
                _this.loading = false;
            });
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.initPhotoList();
        },
        handleClose() {
            this.photoVisable = false;
            this.updateVisible = false;
        },
    },
};
</script>
<style lang='scss' scoped>
</style>
