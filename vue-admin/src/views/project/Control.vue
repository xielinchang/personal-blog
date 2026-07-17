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
    <div class="my-header block">
      <my-input
        label="Title"
        v-model="search.title"
        class="input"
        style="margin-right: 10px;"
        placeholder="Please enter title"
      />
      <div style="display: flex">
        <span style="margin-top: 0px">Published Status</span>
        <my-select
          style="height: 35px; z-index: 9"
          :options="options"
          :selected="selected"
          @change-select="changeSelect"
        >
        </my-select>
      </div>
      <my-button
        class="my-button"
        size="small"
        type="primary"
        icon-name="search"
        style="margin: 0 10px;"
        @click="searched"
        >Search</my-button
      >
      <my-button @click="reset" class="my-button" size="small" icon-name="refresh"
        >Reset</my-button
      >
    </div>
    <el-card class="box-card">
      <div class="main">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            align="center"
            prop="title"
            label="Title"
          />
          <el-table-column
            align="center"
            prop="link"
            label="Link"
            width="250"
          />
          <el-table-column
            align="center"
            prop="coverUrl"
            label="Cover"
            width="250"
          >
            <template slot-scope="scpoe">
              <img width="80%" :src="prefix + scpoe.row.coverUrl" alt="" />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="state"
            label="Published"
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
          <el-table-column
            align="center"
            prop="created_at"
            label="Published Time"
            width="250"
          />
          <el-table-column
            align="center"
            prop="updated_at"
            label="Modified Time"
            width="250"
          />
          <el-table-column
            align="center"
            fixed="right"
              label="Actions"
            width="200"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                icon="el-icon-edit"
                @click="handleEdit(scope.row.id, scope.$index)"
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
      title="Comments Table"
      :visible.sync="commentsVisible"
      width="80%"
      :before-close="handleClose"
    >
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="commentsVisible = false"
          >Confirm</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { queryProject, changeState, deleteProject } from "@/api/main/project";
import { getToken } from "../../utils/cookie";
export default {
  name: "BannerWrap",
  data() {
    return {
      search: {
        title: "",
        state: 0,
      },
      selected: {
        label: "",
        value: 0,
      },
      options: [],
      tableData: [],
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
    this.initProject();
    this.initOptions()
  },
  methods: {
    initOptions(){
      this.options=this.$store.state.dictionary.states
    },
    reset(){
      this.search={
        title:'',
        state:0
      }
      this.changeSelect('','')
      this.initProject()
    },
    searched(){
      this.initProject()
    },
    initProject() {
      this.tableData = [];
      this.$store.state.loading=true
      var _this = this;
      console.log(this.search);
      queryProject({
        limit: this.pagesize,
        offset: this.currentPage,
        query: {
          id: undefined,
          title: this.search.title ? this.search.title : undefined,
          state: this.search.state ? this.search.state : undefined,
        },
      }).then((res) => {
        this.totalpage = res.count;
        res.rows.forEach(element => {
          element.state = element.state === (1 || "1") ? true : false;

        });
        this.tableData=res.rows
        _this.$store.state.loading=false
      });
    },
    changeState(item) {
      changeState({ id: item.id, state: item.state ? 1 : 2 }).then((res) => {
        this.$message({
          message: "Operation successful",
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
            message: "Delete successful",
            type: "success",
          });
          this.commentsData.splice(index, 1);
        })
        .catch(() => {
          this.$message.error("Delete failed");
        });
    },
    handleEdit(id) {
      this.$router.push("/blog/project/writing?id=" + id);
    },
    handleDelete(item) {
      this.$confirm(
        "Are you sure you want to delete the project named " + item.title + "? Once deleted, it cannot be recovered",
        "Tip",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          deleteProject({ id: item.id }).then(() => {
            this.$message({
              type: "success",
                message: "Delete successful!",
            });
            this.initProject();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Deletion cancelled",
          });
        });
    },
    handleSizeChange(val) {
      /* val,pageindex为每页有多少条 */
      this.pagesize = val;
      this.initProject();
    },
    handleCurrentChange(val) {
      /* val,currentPage为当前页 */
      this.currentPage = val;
      this.initProject();
    },
    changeSelect(label, value) {
      this.selected.label = label;
      this.selected.value = value;
      this.search.state = value;
    },
    handleClose(done) {
        this.$confirm('Are you sure you want to close?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
  },
};
</script>
<style scoped lang="scss">
@import "./scss/Control.scss";
</style>

