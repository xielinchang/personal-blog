<template>
    <div class="casual-control">
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
            <div class="casual-main">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column
                        align="center"
                        prop="id"
                        label="Casual ID"
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
                        prop="author"
                        label="Author"
                        width="120"
                    />
                    <el-table-column
                        align="center"
                        prop="content"
                        label="Content"
                        width="500"
                    />
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
        </el-card>
        <el-dialog
            title="Add"
            :visible.sync="casualVisible"
            width="30%"
            :before-close="handleClose"
        >
            <div style="display: flex; flex-direction: column">
                <span style="margin: 10px">Sort:</span>
                <el-input-number
                    v-model="casualForm.sort"
                    :min="1"
                    :max="9999"
                    label="Sort"
                ></el-input-number>
                <span style="margin: 10px">Author:</span>
                <el-input
                    v-model="casualForm.author"
                    placeholder="Please enter content"
                ></el-input>
                <span style="margin: 10px">Content:</span>
                <my-textarea
                    width="400"
                    v-model="casualForm.content"
                ></my-textarea>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button
                    type="primary"
                    @click="(casualVisible = false), (casualForm = {})"
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
                <span style="margin: 10px">Author:</span>
                <el-input
                    v-model="updateForm.author"
                    placeholder="Please enter content"
                ></el-input>
                <span style="margin: 10px">Content:</span>
                <my-textarea
                    width="400"
                    v-model="updateForm.content"
                ></my-textarea>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button
                    type="primary"
                    @click="(updateVisible = false), (updateForm = {})"
                    >Cancel</el-button
                >
                <el-button type="success" @click="updateCheck"
                    >Confirm Edit</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {
    casualQuery,
    casualDelete,
    casualCreate,
    casualUpdate,
} from "@/api/main/casual";

export default {
    data() {
        return {
            prefix: process.env.VUE_APP_BASE_API,
            currentPage: 1,
            pagesize: 5,
            totalpage: 0,
            tableData: [],
            casualForm: {},
            updateForm: {},
            imgurl: "",
            casualVisible: false,
            updateVisible: false,
            customImageFile: null,
            file: {},
            uploadApi: process.env.VUE_APP_BASE_API + "/api/file",
        };
    },
    mounted() {
        this.initCasual();
    },
    methods: {
        initCasual() {
            casualQuery({
                limit: this.pagesize,
                offset: this.currentPage,
            }).then((res) => {
                console.log(res);
                this.totalpage = res.count;
                this.tableData = res.rows;
            });
        },
        appendShow() {
            this.casualVisible = true;
        },
        append() {
            try {
                casualCreate(this.casualForm).then((res) => {
                    this.$message({
                        type: "success",
                        message: "Add successful!",
                    });
                    this.casualVisible = false;
                    this.casualForm = {};
                    this.initCasual();
                });
            } catch (err) {
                this.$message.error(err);
            }
        },
        handleDelete(item) {
            this.$confirm(
                "Are you sure you want to delete casual with id " + item.id + "? This action cannot be undone",
                "Tip",
                {
                    confirmButtonText: "Confirm",
                    cancelButtonText: "Cancel",
                    type: "warning",
                }
            )
                .then(() => {
                    casualDelete({ id: item.id }).then(() => {
                        this.$message({
                            type: "success",
                            message: "Delete successful!",
                        });
                        this.initCasual();
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
            casualUpdate(this.updateForm).then((res) => {
                if (res) {
                    this.$message({
                        message: "Update successful",
                        type: "success",
                    });
                    this.updateVisible = false;
                }
            });
        },
        handleSizeChange(val) {
            /* val,pageindex为每页有多少条 */
            this.pagesize = val;
            this.initCasual();
        },
        handleCurrentChange(val) {
            /* val,currentPage为当前页 */
            this.currentPage = val;
            this.initCasual();
        },
        handleClose() {
            this.casualVisible = false;
            this.updateVisible = false;
        },
    },
};
</script>
<style lang='scss' scoped>
@import "./scss/Casual.scss";
</style>
