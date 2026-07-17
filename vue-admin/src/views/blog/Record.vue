<template>
  <div class="record-control">
    <div class="header block" style="display: flex;align-items: center;">
      <my-input
        :disabled="!editShow"
        label="Title:"
        width="180"
        style="margin-right: 20px"
        v-model="defaultRecord.title"
      ></my-input>
      <my-input
        :disabled="!editShow"
        label="Topic:"
        width="350"
        style="margin-right: 20px"
        v-model="defaultRecord.content"
      ></my-input>
      <div style="display: flex;align-items: center;">
        <span>Cover:</span>
        <my-upload
          :disabled="!editShow"
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

      <my-button
        v-if="!editShow"
        type="primary"
        size="small"
        icon-name="edit"
        @click="edit"
        >Edit</my-button
      >
      <div v-else style="display: flex">
        <my-button
          type="danger"
          size="small"
          icon-name="edit"
          style="margin-right: 20px"
          @click="cancelEdit"
          >Cancel</my-button
        ><my-button
          type="success"
          size="small"
          icon-name="edit"
          @click="defaultEdit"
          >Confirm Edit</my-button
        >
      </div>
    </div>
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
      <div class="record-main">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            align="center"
            prop="id"
            label="Record ID"
          />
          <el-table-column
            align="center"
            prop="message"
            label="Content"
            width="550"
          />
          <el-table-column
            align="center"
            prop="created_at"
            label="Created Time"
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
      :visible.sync="recordVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div style="display: flex; flex-direction: column">
        <span style="margin: 10px">Content:</span>
        <my-textarea width="400" v-model="recordForm.message"></my-textarea>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="recordVisible = false,recordForm = {}"
          >Cancel</el-button
        >
        <el-button type="success" @click="append">Confirm Add</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  recordQuery,
  recordDelete,
  recordCreate,
  recordDefaultQuery,
  recordDefaultUpdate,
} from "@/api/main/record";
import axios from "axios";
export default {
  data() {
    return {
      prefix: process.env.VUE_APP_BASE_API,
      currentPage: 1,
      pagesize: 5,
      totalpage: 0,
      tableData: [],
      recordForm: {},
      imgurl: "",
      recordVisible: false,
      customImageFile: null,
      file: {},
      uploadApi: process.env.VUE_APP_BASE_API + "/api/file",
      defaultRecord: {
        title: "",
        content: "",
      },
      defaultRecordCache: {},
      editShow: false,
    };
  },
  mounted() {
    this.initRecord();
    this.initDefault();
  },
  methods: {
    edit() {
      this.editShow = !this.editShow;
      this.defaultRecordCache = { ...this.defaultRecord };
    },
    cancelEdit() {
      this.editShow = false;
      this.defaultRecord = { ...this.defaultRecordCache };
    },
    initDefault() {
      recordDefaultQuery().then((res) => {
        console.log(res);
        this.defaultRecord = res[0];
        this.imgurl = this.prefix + res[0].img;
      });
    },
    defaultEdit() {
      if (this.customImageFile) {
        const data = new FormData();
        data.append("file", this.customImageFile);
        axios.post(this.uploadApi, data).then((res) => {
            this.defaultRecord.img = res.data.data.url;
            this.defaultEditApi();
          })
          .catch((err) => {
            this.$message.error(err);
          });
      } else {
        this.defaultEditApi();
      }
    },
    defaultEditApi() {
      recordDefaultUpdate(this.defaultRecord).then(() => {
        this.$message({
          type: "success",
          message: "Update successful!",
        });
        this.editShow = false;
      });
    },
    deleteCallback() {
      this.imgurl = "";
      (this.defaultRecord.img = ""), (this.customImageFile = "");
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
    initRecord() {
      recordQuery({
        limit: this.pagesize,
        offset: this.currentPage,
      }).then((res) => {
        this.totalpage = res.count;
        this.tableData = res.rows;
      });
    },
    appendShow() {
      this.recordVisible = true;
    },
    append() {
      recordCreate(this.recordForm).then((res) => {
        this.$message({
          type: "success",
          message: "Add successful!",
        });
        this.recordVisible = false;
        this.recordForm = {}
        this.initRecord();
      });
    },
    handleDelete(item) {
      this.$confirm(
        "Are you sure you want to delete record with content \"" + item.message + "\"? This action cannot be undone",
        "Tip",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          recordDelete({ id: item.id }).then(() => {
            this.$message({
              type: "success",
              message: "Delete successful!",
            });
            this.initRecord();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete cancelled",
          });
        });
    },
    handleSizeChange(val) {
      /* val,pageindex为每页有多少条 */
      this.pagesize = val;
      this.initRecord();
    },
    handleCurrentChange(val) {
      /* val,currentPage为当前页 */
      this.currentPage = val;
      this.initRecord();
    },
    handleClose() {
      this.recordVisible = false;
    },
  },
};
</script>
<style lang='scss' scoped>
@import "./scss/Record.scss";
</style>
