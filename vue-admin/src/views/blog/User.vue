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
      <my-input label="Username:" v-model="search.username" class="my-input" height="38" placeholder="Please enter username" />
      <my-button style="margin:0 10px" @click="searched" class="my-button" type="primary" icon="search">Search</my-button>
      <my-button @click="reset" class="my-button" type="primary" icon="search">Reset</my-button>
    </div>
    <el-card class="box-card">
      <div class="main">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column align="center" prop="id" label="User ID" />
          <el-table-column align="center" prop="name" label="Name" width="200" />
          <el-table-column align="center" prop="portrait" label="Avatar" width="200">
            <template slot-scope="scpoe" >
              <div class="img-box">
                <img :src="prefix + scpoe.row.portrait" alt="" />
              </div> 
            </template>
          </el-table-column>
          <el-table-column align="center" prop="username" label="Username">
          </el-table-column>
          <el-table-column align="center" prop="created_at" label="User Created Time" width="200">
          </el-table-column>
          <el-table-column align="center" fixed="right" label="Actions" width="300">
            <template slot-scope="scope">
              <el-button type="text" size="small" icon="el-icon-refresh"
                @click="handleChangePsw(scope.row, scope.$index)">Reset Password</el-button>
              <el-button type="text" size="small" icon="el-icon-edit"
                @click="handleEdit(scope.row, scope.$index)">Edit</el-button>
              <el-button slot="reference" type="text" icon="el-icon-delete" size="small"
                @click="handleDelete(scope.row, scope.$index)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pages">
          <el-pagination class="page-box" :current-page="currentPage" :page-sizes="[5, 10, 15, 20, total]"
            :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
      </div>
    </el-card>
    <el-dialog title="User Edit" :visible.sync="userVisible" width="30%" :before-close="handleClose">
      <div style="display: flex; flex-direction: column">
        <span style="margin: 10px">User Name:</span>
        <my-input v-model="userForm.name"></my-input>
        <span style="margin: 10px">User Avatar:</span>
        <my-upload v-model="file" :action="uploadApi" :image="imgurl" :preview="true" @delete-img="deleteCallback"
          @upload-success="uploadCallback">
        </my-upload>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="userVisible = false">Cancel</el-button>
        <el-button type="success" @click="edit">Confirm Edit</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { queryUser, resetPsw, updateUser, deleteUser } from "@/api/index/user";
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
      total: 0,
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
    reset() {
      this.search.username = ''
      this.searched()
    },
    searched() {
      this.initUser();
    },
    initUser() {
      this.tableData = [];
      var _this = this;
      console.log(this.search.username);
      queryUser({
        limit: this.pagesize,
        offset: this.currentPage,
        query: {
          id: undefined,
          username: this.search.username ? this.search.username : undefined,
        },
      }).then((res) => {
        console.log(res);
        this.total = res.user.count || res.rows.length;
        this.tableData = res.user.rows;
      });
    },
    handleChangePsw(item) {
      this.$confirm(
        "Are you sure you want to reset the password for user " + item.username + "?",
        "Tip",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          resetPsw({ id: item.id }).then(() => {
            this.$message({
              type: "success",
              message: "Reset successful!",
            });
            this.initUser();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Cancelled",
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
        "Are you sure you want to delete user " + item.name + "? This action cannot be undone",
        "Tip",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          deleteUser({ id: item.id }).then(() => {
            this.$message({
              type: "success",
              message: "Delete successful!",
            });
            this.initUser();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete cancelled",
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
          message: "Update successful",
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

