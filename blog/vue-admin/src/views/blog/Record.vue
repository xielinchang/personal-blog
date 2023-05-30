<template>
  <div class="record-control">
    <div class="header block">
      <my-input
        :disabled="!editShow"
        label="标题："
        width="200"
        style="margin-right: 20px"
        v-model="defaultRecord.title"
      ></my-input>
      <my-input
        :disabled="!editShow"
        label="话题："
        width="400"
        style="margin-right: 20px"
        v-model="defaultRecord.content"
      ></my-input>
      <div style="display: flex;">
        <span>封面：</span>
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
        @click="editShow = !editShow"
        >修改</my-button
      >
      <div v-else style="display: flex">
        <my-button
          type="danger"
          size="small"
          icon-name="edit"
          style="margin-right: 20px"
          @click="editShow = !editShow"
          >取消</my-button
        ><my-button
          type="success"
          size="small"
          icon-name="edit"
          @click="defaultEdit"
          >确认修改</my-button
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
          >新增</el-button
        >
      </div>
      <div class="record-main">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            align="center"
            prop="id"
            label="记录id"
            width="200"
          />
          <el-table-column
            align="center"
            prop="message"
            label="内容"
            width="550"
          />
          <el-table-column
            align="center"
            prop="created_at"
            label="创建时间"
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
      title="新增"
      :visible.sync="recordVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div style="display: flex; flex-direction: column">
        <span style="margin: 10px">内容：</span>
        <my-textarea
          width="400"
          v-model="recordForm.message"
        ></my-textarea>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="recordVisible = false"
          >取 消</el-button
        >
        <el-button type="success" @click="append">确认新增</el-button>
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
      defaultRecord: {
        title: "",
        content: "",
      },
      editShow: false,
    };
  },
  mounted() {
    this.initRecord();
    this.initDefault();
  },
  methods: {
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
        axios
          .post(this.uploadApi, data)
          .then((res) => {
            console.log(res);
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
          message: "修改成功!",
        });
      });
    },
    deleteCallback() {
      this.imgurl = "";
      (this.defaultRecord.img = ""), (this.customImageFile = "");
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
    initRecord() {
      recordQuery({
        limit: this.pagesize,
        offset: this.currentPage,
      }).then((res) => {
        this.totalpage = res.count;
        console.log(res);
        this.tableData = res.rows;
      });
    },
    appendShow() {
      this.recordVisible = true;
    },
    append() {
      recordCreate(this.recordForm).then((res) => {
        console.log(res);
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        this.recordVisible=false
        this.initRecord();
      });
    },
    handleDelete(item) {
      this.$confirm(
        "要删除内容为" + item.message + "的记录吗？一旦删除将不可恢复",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          recordDelete({ id: item.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.initRecord();
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
