<!--
 * @Descripttion:
 * @version:
 * @Author: Xielinchang
 * @Date: 2022-05-07 17:23:50
 * @LastEditors: Xielinchang
 * @LastEditTime: 2022-05-07 17:25:06
-->
<template>
    <div class="essay-control">
        <el-card class="box-card">
            <div class="buttons">
                <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-edit"
                    @click="appendShow"
                    >Edit</el-button
                >
            </div>
            <div class="main-body">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column
                        align="center"
                        prop="title"
                        label="Title"
                    />
                    <el-table-column
                        align="center"
                        prop="subtitle"
                        label="Subtitle"
                    />
                    <el-table-column
                        align="center"
                        prop="coverUrl"
                        label="Cover"
                        width="240"
                    >
                        <template slot-scope="scpoe">
                            <img
                                width="80%"
                                :src="prefix + scpoe.row.coverUrl"
                                alt=""
                            />
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="tags"
                        label="Tags"
                    >
                        <template slot-scope="scope">
                            <el-tag
                                :key="item"
                                style="margin-right: 10px"
                                v-for="(item, index) in scope.row.tags"
                                >{{ scope.row.tags[index] }}</el-tag
                            >
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="domain"
                        label="Domain"
                        width="100"
                    />
                    <el-table-column
                        align="center"
                        prop="radio"
                        label="Original"
                        width="100"
                    >
                        <template slot-scope="scope">
                            <span>{{
                                scope.row.radio === "1" ? "Original" : "Repost"
                            }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                        align="center"
                        fixed="right"
                        label="Actions"
                        width="250"
                    >
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                size="small"
                                icon="el-icon-message"
                                @click="handleCheckDetail(scope, scope.$index)"
                                >Article Details</el-button
                            >
                            <el-button
                                slot="reference"
                                type="text"
                                icon="el-icon-delete"
                                size="small"
                                @click="handleDelete(scope.$index)"
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
            title="Edit Banner"
            :visible.sync="editVisible"
            width="80%"
            :before-close="handleClose"
        >
            <div class="banner-edit">
                <div class="edit-header">
                    <el-input
                        style="width: 40%; margin: 10px"
                        placeholder="Title"
                        v-model="search.title"
                    ></el-input>
                    <el-input
                        style="width: 20%; margin: 20px"
                        placeholder="Article ID"
                        v-model="search.id"
                    ></el-input>
                    <el-input
                        style="width: 20%; margin: 20px"
                        placeholder="Article Tags"
                        v-model="search.tags"
                    ></el-input>
                    <el-button
                        type="primary"
                        style="width: 100px; margin: 20px; height: 40px"
                        icon="el-icon-search"
                        @click="searchEssay"
                        >Search</el-button
                    >
                    <el-button
                        type="primary"
                        style="width: 100px; margin: 20px; height: 40px"
                        icon="el-icon-clear"
                        @click="clearSearch"
                        >Reset</el-button
                    >
                    <el-button
                        type="success"
                        style="width: 100px; margin: 20px; height: 40px"
                        @click="editBannerCheck"
                        >Confirm Edit</el-button
                    >
                </div>
                <ul>
                    <li
                        v-for="essay in essayList"
                        :key="essay.id"
                        @click="editBanner(essay)"
                    >
                        <div class="img-cover">
                            <img :src="prefix + essay.coverUrl" alt="" />
                        </div>
                        <div class="edit-essay-content">
                            <p>
                                {{ essay.title }}
                            </p>
                            <p>
                                {{ essay.subtitle }}
                            </p>
                            <div class="content-tags">
                                <div
                                    v-for="(tag, index) in essay.tags"
                                    :key="index"
                                >
                                    <el-tag>
                                        {{ tag }}
                                    </el-tag>
                                </div>
                            </div>
                        </div>
                        <div v-if="essay.isSelect" class="selected">Selected</div>
                    </li>
                </ul>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    essayQuery,
    bannerQuery,
    bannerDelete,
    bannerCreate,
} from "@/api/main/essay";
import { getToken } from "../../utils/cookie";
export default {
    name: "BannerWrap",
    data() {
        return {
            tableData: [],
            /* 当前页数，页面的行数，总行数 */
            currentPage: 1,
            pagesize: 5,
            totalpage: 0,
            headers: {
                Authorization: "",
            },
            search: {
                id: "",
                title: "",
                tags: "",
            },
            essayList: [],
            prefix: process.env.VUE_APP_BASE_API,
            editVisible: false,
            bannerIds: [], // 原先就有的banner，判断这边是否有改变，如果有改变，作删除处理
            addIds: [], // 需要添加的id
            deleteIds: [], // 需要删除的id
        };
    },
    mounted() {
        this.headers.Authorization = getToken();
        this.initBanner();
        this.initAllEssay();
    },
    methods: {
        appendShow() {
            this.editVisible = true;
        },
        searchEssay() {
            this.initAllEssay();
            this.search = {
                id: "",
                title: "",
                tags: "",
            };
        },
        clearSearch() {
            this.initAllEssay();
        },
        initAllEssay() {
            var query = {
                id: undefined,
                title: undefined,
                domain: undefined,
                html: undefined,
                tags: undefined,
                state:1 // 只有发布了才可以被选当轮播
            };
            Object.assign(query, this.search);
            essayQuery({
                limit: 999,
                offset: 1,
                query,
            }).then((res) => {
                res.rows.forEach((item) => {
                    item.tags = item.tags.split(",");
                });
                this.essayList = res.rows;
                this.initSelected();
            });
        },
        initSelected() {
            bannerQuery({
                limit: this.pagesize,
                offset: this.currentPage,
            }).then((res) => {
                this.bannerIds = res.rows;
                this.essayList.forEach((essay, index) => {
                    if (
                        this.bannerIds.find((item) => {
                            return item.essay_id * 1 == essay.id * 1;
                        })
                    ) {
                        essay.isSelect = true;
                    } else {
                        essay.isSelect = false;
                    }
                    this.$forceUpdate();
                });
            });
        },
        initBanner() {
            this.tableData = [];
            var _this = this;
            this.$store.state.loading = true;
            bannerQuery({
                limit: this.pagesize,
                offset: this.currentPage,
            }).then((res) => {
                this.tableData = res.rows.map((item) => {
                    item.blog_essay.tags = item.blog_essay.tags.split(",");
                    item.blog_essay.banner_id = item.id;
                    return item.blog_essay;
                });
                this.totalpage = res.count;
                this.$store.state.loading = false;
            });
        },
        handleEdit(id) {
            console.log(id);
        },
        handleCheckDetail(item) {
            this.$router.push(`/blog/essay/writing?id=${item.row.id}`);
        },
        editBanner(item) {
            this.essayList.forEach((essay) => {
                if (essay.id == item.id) {
                    essay.isSelect = !essay.isSelect;
                    this.$forceUpdate(); // 强制触发视图更新
                }
            });
            // 找到要删除的ids
            this.bannerIds.forEach((banner) => {
                if (banner.essay_id === item.id) {
                    // 如果在已经有的bannerid中找到，则放入删除id中
                    // 删除是根据banner的id删，添加是根据essay的id加
                    if (item.isSelect === false) {
                        this.deleteIds.push(banner.id);
                    } else {
                        const index = this.deleteIds.indexOf(banner.id);
                        this.deleteIds.splice(index, 1);
                    }
                }
            });
            // 原来就有的banner只能删除不能添加
            if (
                !this.bannerIds.find((banner) => {
                    return banner.essay_id === item.id;
                })
            ) {
                if (item.isSelect === true) {
                    this.addIds.push(item.id);
                } else {
                    const index = this.addIds.indexOf(item.id);
                    this.addIds.splice(index, 1);
                }
            }
        },
        editBannerCheck() {
            if (this.deleteIds.length) {
                bannerDelete({ ids: this.deleteIds.join(",") }).then((_) => {
                    this.initBanner();
                    this.initAllEssay();
                    this.editVisible = false;
                    this.addIds = [];
                    this.deleteIds = [];
                });
            }
            if (this.addIds.length) {
                bannerCreate({ ids: this.addIds.join(",") }).then((_) => {
                    this.initBanner();
                    this.initAllEssay();
                    this.editVisible = false;
                    this.addIds = [];
                    this.deleteIds = [];
                });
            }
        },
        handleDelete(index) {
            let id = this.tableData[index].banner_id;
            this.$confirm("Are you sure you want to delete this article banner?", "Tip", {
                confirmButtonText: "Confirm",
                cancelButtonText: "Cancel",
                type: "warning",
            })
                .then(() => {
                    bannerDelete({ ids: [id] }).then((res) => {
                        console.log(res);
                        this.$message({
                            type: "success",
                            message: res.msg,
                        });
                        this.initBanner();
                    });
                })
                .catch((err) => {
                    this.$message({
                        type: "info",
                        message: err ? err : "Deletion cancelled",
                    });
                });
        },
        handleSizeChange(val) {
            /* val,pageindex为每页有多少条 */
            this.pagesize = val;
            this.initBanner();
        },
        handleCurrentChange(val) {
            /* val,currentPage为当前页 */
            this.currentPage = val;
            this.initBanner();
        },
        handleClose() {
            this.initAllEssay();
            this.editVisible = false;
        },
    },
};
</script>
<style scoped lang="scss">
@import "./scss/Banner.scss";
</style>

