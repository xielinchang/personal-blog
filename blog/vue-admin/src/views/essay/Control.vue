<!--
 * @Descripttion:
 * @version:
 * @Author: Liu ZiJie
 * @Date: 2022-05-07 17:23:50
 * @LastEditors: Liu ZiJie
 * @LastEditTime: 2022-05-07 17:25:06
-->
<template>
  <div class="essay-control">
    <ul class="my-header">
      <li>
        <my-input
          label="标题"
          width="80"
          v-model="search.title"
          class="input"
          placeholder="请输入标题"
        />
      </li>
      <li>
        <my-input
         width="150"
          label="内容"
          v-model="search.html"
          class="input"
          placeholder="请输入内容"
        />
      </li>
      <li>
        <my-input
         width="100"
          label="标签"
          v-model="search.tags"
          class="input"
          placeholder="请输入标签"
        />
      </li>
      <li style="display: flex">
        <span style="margin-top: 0px">领域：</span>
        <my-select
          width="80"
          style="height: 35px; z-index: 9"
          :options="domainOptions"
          :selected="domainSelected"
          @change-select="changeDomain"
        >
        </my-select>
      </li>

      <li style="display: flex">
        <span style="margin-top: 0px">状态:</span>
        <my-select
          width="80"
          style="height: 35px; z-index: 9"
          :options="options"
          :selected="selected"
          @change-select="changeSelect"
        >
        </my-select>
      </li>
      <my-button
        class="my-button"
        type="primary"
        icon-name="search"
        @click="searched"
        >搜索</my-button
      >
      <my-button
        class="my-button"
        icon-name="refresh"
        @click="reset"
        >重置</my-button
      >
    </ul>
    <el-card class="box-card">
      <div class="main-body">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            align="center"
            prop="title"
            label="标题"
            width="120"
          />
          <el-table-column
            align="center"
            prop="subtitle"
            label="副标题"
            width="100"
          />
          <el-table-column
            align="center"
            prop="coverUrl"
            label="封面"
            width="200"
          >
            <template slot-scope="scpoe">
              <img width="80%" :src="prefix + scpoe.row.coverUrl" alt="" />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="state"
            label="是否发布"
            width="80"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.state"
                active-color="#13ce66"
                inactive-color="#aaa"
                @change="changeState(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="tags" label="标签" width="200">
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
            prop="commentNum"
            label="评论数"
            width="80"
          />
          <el-table-column
            align="center"
            prop="essay_detail.good"
            label="点赞数"
            width="80"
          />
          <el-table-column
            align="center"
            prop="essay_detail.collect"
            label="收藏数"
            width="80"
          />
          <el-table-column
            align="center"
            prop="domain"
            label="领域"
            width="100"
          />
          <el-table-column
            align="center"
            prop="radio"
            label="是否原创"
            width="100"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.radio === "1" ? "原创" : "转载" }}</span>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="200"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                icon="el-icon-message"
                @click="handleCheckComments(scope.row.id, scope.$index)"
                >查看评论</el-button
              >
              <el-button
                type="text"
                size="small"
                icon="el-icon-edit"
                @click="handleEdit(scope.row.id, scope.$index)"
                >编辑</el-button
              >
              <el-button
                slot="reference"
                type="text"
                icon="el-icon-delete"
                size="small"
                @click="handleDelete(scope.row, scope.$index)"
                >删除</el-button
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
      title="评论表"
      :visible.sync="commentsVisible"
      width="80%"
      :before-close="handleClose"
    >
      <el-table :data="commentsData" style="width: 100%">
        <el-table-column align="center" prop="id" label="用户id" width="120" />
        <el-table-column
          align="center"
          prop="users[0].name"
          label="用户"
          width="150"
        />
        <el-table-column
          align="center"
          prop="created_at"
          label="评论时间"
          width="120"
        />
        <el-table-column
          align="center"
          prop="message"
          label="评论内容"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="评论地点"
          width="100"
        />
        <el-table-column align="center" fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              slot="reference"
              type="text"
              icon="el-icon-delete"
              size="small"
              @click="handleDeleteComment(scope.row.id, scope.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="commentsVisible = false"
          >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  essayCommentsQuery,
  essayCommentsDelete,
} from "@/api/main/essayComments";
import { essayQuery, changeState, essayDelete } from "@/api/main/essay";
import { getToken } from "../../utils/cookie";
export default {
  name: "BannerWrap",
  data() {
    return {
      search: {
        title: "",
        html: "",
        tags: "",
        domain: "",
        state: 0,
      },
      selected: {
        label: "",
        value: 0,
      },
      options: [],
      domainSelected: {
        label: "",
        value: "",
      },
      domainOptions: [],
      tableData: [],
      commentsData: [],
      /* 当前页数，页面的行数，总行数 */
      currentPage: 1,
      pagesize: 5,
      totalpage: 0,
      headers: {
        Authorization: "",
      },
      prefix: process.env.VUE_APP_BASE_API,
      commentsVisible: false,
    };
  },
  mounted() {
    this.headers.Authorization = getToken();
    this.initOptions()
    this.initEssay();
  },
  methods: {
    initOptions(){
      this.options = this.$store.state.dictionary.states;
      this.domainOptions = this.$store.state.dictionary.domain;
    },
    reset() {
      this.search = {
        title: "",
        state: 0,
      };
      this.changeSelect("", 0);
      this.changeDomain("","")
      this.initEssay();
    },
    searched() {
      this.initEssay();
    },
    initEssay() {
      this.tableData = [];
      var _this = this;
      this.$store.state.loading=true
      essayQuery({
        limit: this.pagesize,
        offset: this.currentPage,
        query: {
          title: this.search.title ? this.search.title : undefined,
          state: this.search.state ? this.search.state : undefined,
          html:this.search.html ? this.search.html : undefined,
          tags: this.search.tags ? this.search.tags : undefined,
          domain: this.search.domain ? this.search.domain : undefined,
        },
      }).then((res) => {
        res.rows.forEach((element) => {
          if (element.essay_detail === null) {
            element.essay_detail = {};
            Object.assign(element.essay_detail, { good: 0, collect: 0 });
          }
        });
        this.totalpage = res.count;
        res.rows.forEach((element) => {
          essayCommentsQuery({
            limit: 999,
            offset: 1,
            query: {
              essay_id: element.id,
            },
          }).then((res) => {
            element.commentNum = res.count;
            element.tags = element.tags.split(",");
            element.state = element.state * 1 ===  1 ? true : false;
            this.tableData.push(element);
          });
        });
        this.$store.state.loading=false
      });
    },
    changeState(item) {
      changeState({ id: item.id, state: item.state ? 1 : 2 }).then((res) => {
        this.$message({
          message: "操作成功",
          type: "success",
        });
        this.initEssay();
      });
    },
    handleCheckComments(id) {
      essayCommentsQuery({
        limit: 999,
        offset: 1,
        query: {
          essay_id: id,
        },
      }).then((res) => {
        console.log(res);
        this.commentsData = res.rows;
        this.commentsVisible = true;
      });
    },
    handleDeleteComment(id, index) {
      essayCommentsDelete({ id: id })
        .then(() => {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.commentsData.splice(index, 1);
        })
        .catch(() => {
          this.$message.error("删除失败");
        });
    },
    handleEdit(id) {
      this.$router.push("/blog/essay/writing?id=" + id);
    },
    handleDelete(item) {
      this.$confirm(
        "要删除名为" + item.title + "的文章吗？一旦删除将不可恢复",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          essayDelete({ id: item.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.initEssay();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSizeChange(val) {
      /* val,pageindex为每页有多少条 */
      this.pagesize = val;
      this.initEssay();
    },
    handleCurrentChange(val) {
      /* val,currentPage为当前页 */
      this.currentPage = val;
      this.initEssay();
    },
    changeSelect(label, value) {
      this.selected.label = label;
      this.selected.value = value;
      this.search.state = value;
    },
    changeDomain(label, value) {
      this.domainSelected.label = label;
      this.domainSelected.value = value;
      this.search.domain = value;
    },
    handleClose() {
      this.commentsVisible = false;
    },
  },
};
</script>
<style scoped lang="scss">
@import "./scss/Control.scss";
</style>

