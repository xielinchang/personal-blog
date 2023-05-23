<!--
 * @Descripttion:
 * @version:
 * @Author: Liu ZiJie
 * @Date: 2022-05-07 17:23:50
 * @LastEditors: Liu ZiJie
 * @LastEditTime: 2022-05-07 17:25:06
-->
<template>
  <div class="user-control">
    <div class="header block">
      <my-input
        label="用户名："
        v-model="search.username"
        class="my-input"
        placeholder="请输入用户名"
      />
      <my-button
        style="margin-right: 10px"
        @click="searched"
        class="my-button"
        size="mini"
        type="primary"
        icon="search"
        >搜索</my-button
      >
      <my-button
        @click="reset"
        class="my-button"
        size="mini"
        type="primary"
        icon="search"
        >重置</my-button
      >
    </div>
    <el-card class="box-card">
      <div class="main">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            align="center"
            prop="id"
            label="用户id"
            width="120"
          />
          <el-table-column
            align="center"
            prop="name"
            label="名称"
            width="150"
          />
          <el-table-column
            align="center"
            prop="portrait"
            label="头像"
            width="250"
          >
            <template slot-scope="scpoe">
              <img width="80%" :src="prefix + scpoe.row.portrait" alt="" />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="username"
            label="用户名"
            width="150"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="created_at"
            label="用户创建时间"
            width="200"
          >
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
                icon="el-icon-refresh"
                @click="handleChangePsw(scope.row, scope.$index)"
                >重置密码</el-button
              >
              <el-button
                type="text"
                size="small"
                icon="el-icon-edit"
                @click="handleEdit(scope.row, scope.$index)"
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
      title="用户编辑"
      :visible.sync="userVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div style="display: flex; flex-direction: column">
        <span style="margin: 10px">用户名称：</span>
        <my-input v-model="userForm.name"></my-input>
        <span style="margin: 10px">用户头像：</span>
        <my-upload
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
        <el-button type="primary" @click="userVisible = false">取 消</el-button>
        <el-button type="success" @click="edit">确认修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { queryUser,resetPsw, updateUser, deleteUser } from "@/api/index/user";
import { getToken } from "../../utils/cookie";
import axios from "axios";
export default {
  name: "BannerWrap",
  data() {
    return {
      search: {
        username: "",
      },
      tableData: [],
      userForm: {},
      /* 当前页数，页面的行数，总行数 */
      currentPage: 1,
      pagesize: 5,
      totalpage: 0,
      headers: {
        Authorization: "",
      },
      uploadApi: process.env.VUE_APP_BASE_API + "/api/file",
      prefix: process.env.VUE_APP_BASE_API,
      userVisible: false,
      imgurl: "",
      customImageFile: null,
      file: {},
    };
  },
  mounted() {
    this.headers.Authorization = getToken();
    this.initUser();
  },
  methods: {
    reset(){
      this.search.username=''
      this.searched()
    },
    searched() {
      initUser();
    },
    initUser() {
      this.tableData = [];
      var _this = this;
      queryUser({
        limit: 999,
        offset: 1,
        query: {
          id: undefined,
          username: this.search.username ? this.search.username : undefined,
        },
      }).then((res) => {
        this.tableData = res.user.rows;
      });
    },
    handleChangePsw(item) {
      this.$confirm(
        "确定要将用户名为" + item.username + "的用户重置密码吗",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          resetPsw({ id: item.id }).then(() => {
            this.$message({
              type: "success",
              message: "重置成功!",
            });
            this.initUser();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    handleEdit(row) {
      this.userVisible = true;
      this.userForm = row;
      this.imgurl = this.prefix + row.portrait;
    },
    handleDelete(item) {
      this.$confirm(
        "要删除名为" + item.name + "的用户吗？一旦删除将不可恢复",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          deleteUser({ id: item.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.initUser();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    edit() {
      if (this.customImageFile) {
        const data = new FormData();
        data.append("file", this.customImageFile);
        axios
          .post(this.uploadApi, data)
          .then((res) => {
            console.log(res);
            this.userForm.portrait = res.data.data.url;
            this.userUpdateApi();
          })
          .catch((err) => {
            this.$message({
              content: err,
              type: "danger",
            });
          });
      } else {
        this.userUpdateApi();
      }
    },
    deleteCallback() {
      this.imgurl = "";
      this.userForm.portrait = "";
      this.customImageFile = "";
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
    userUpdateApi() {
      updateUser(this.userForm).then(() => {
        this.$message({
          message: "更新成功",
          type: "success",
        });
        this.userVisible = false;
        this.initUser();
      });
    },

    handleSizeChange(val) {
      /* val,pageindex为每页有多少条 */
      this.pagesize = val;
      this.initUser();
    },
    handleCurrentChange(val) {
      /* val,currentPage为当前页 */
      this.currentPage = val;
      this.initUser();
    },
    handleClose() {
      this.userVisible = false;
    },
  },
};
</script>
<style scoped lang="scss">
@import "./scss/User.scss";
</style>

