<template>
  <div>
    <div class="header block">
      <my-input
        label="Username:"
        v-model="search.username"
        class="my-input"
        height="38"
        placeholder="Please enter username"
      />
      <my-button class="my-button" type="primary" icon="search">Search</my-button>
    </div>
    <el-card class="box-card" style="padding-bottom: 100px;">
      <div class="main">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            align="center"
            prop="users[0].id"
            label="User ID"
            width="100"
          />
          <el-table-column
            align="center"
            prop="users[0].name"
            label="User"
            width="100"
          />
          <el-table-column
            align="center"
            prop="users[0].username"
            label="Account"
            width="100"
          />
          <el-table-column
            align="center"
            prop="users[0].portrait"
            label="User Avatar"
            width="150"
          >
            <template slot-scope="scpoe">
              <img
                width="80%"
                :src="prefix + scpoe.row.users[0].portrait"
                alt=""
              />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="content"
            label="Content"
            width="200"
          />
          <el-table-column
            align="center"
            prop="message_reply.reply"
            label="Reply"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="created_at"
            label="Comment Time"
            width="200"
          />
          <el-table-column
            align="center"
            prop="address"
            label="Comment Location"
            width="250"
          />

          <el-table-column fixed="right" label="Actions" >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                icon="el-icon-edit"
                @click="handleReply(scope.row, scope.$index)"
                >Reply</el-button
              >
              <!-- <el-button
              v-if="scope.row.message_reply"
                type="text"
                size="small"
                icon="el-icon-edit"
                @click="deleteReply(scope.row.message_reply.id, scope.$index)"
                >删除回复</el-button
              > -->
              <el-button
                slot="reference"
                type="text"
                icon="el-icon-delete"
                size="small"
                @click="deletemessage(scope.row.id, scope.$index)"
                >Delete</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div
          class="pages"
          style="position: absolute; right: 50px; width: 500px"
        >
          <el-pagination
            class="page-box"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </el-card>
    <el-dialog
      title="Reply"
      :visible.sync="replyVisible"
      width="40%"
      :before-close="handleClose"
    >
      <my-textarea
        width="500"
        v-model="newReply.reply"
        class="reply-area"
      ></my-textarea>
      <span slot="footer" class="dialog-footer">
        <el-button @click="replyVisible = false">Cancel</el-button>
        <el-button type="primary" @click="replymessage">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  <script>
import {
  messageQuery,
  messageDelete,
  messageReplyCreate,
  messageReplyUpdate,
  messageReplyDelete,
} from "@/api/main/message";
export default {
  name: "Witingmessage",
  data() {
    return {
      search: {
        username: "",
      },
      tableData: [],
      showDialog: false,
      text: "",
      publishAgain: true,
      pageSize: 5,
      /* 当前页 */
      currentPage: 1,
      /* 评论总数 */
      total: 0,
      /* 每页的条目数 */
      newReply: {
        message_id: "",
        reply: "",
      },
      sizeOptions: [
        { label: "5条/页", value: 5 },
        { label: "10条/页", value: 10 },
        { label: "15条/页", value: 15 },
      ],
      //回复框
      replyVisible: false,
      prefix: process.env.VUE_APP_BASE_API,
      isReply: false,
    };
  },
  mounted() {
    document.documentElement.scrollTop = 0;
    this.initmessage();
  },
  methods: {
    initmessage() {
      var _this = this;
      this.newReply = {
        message_id: "",
        reply: "",
      };
      this.tableData = [];
      messageQuery({
        limit: this.pageSize,
        offset: this.currentPage,
      }).then((res) => {
        this.total = res.count;
        this.tableData=res.rows
      });
    },
    handleReply(item, index) {
      this.replyVisible = true;
      // 每条回复只能回复一次，但可以修改
      if (item.message_reply !== null) {
        this.isReply = true;
        this.newReply.id = item.message_reply.id;
        this.newReply.reply = item.message_reply.reply;
      } else {
        this.isReply = false;
      }
      this.newReply.message_id = item.id;
    },
    replymessage() {
      if (this.isReply) {
        messageReplyUpdate(this.newReply).then((res) => {
          this.$message({
            type: "success",
            message: "Update reply successful!",
          });
          this.initmessage();
          this.replyVisible = false;
        });
      } else {
        messageReplyCreate(this.newReply).then((res) => {
          this.$message({
            type: "success",
            message: "Reply successful!",
          });
          this.initmessage();
          this.replyVisible = false;
        });
      }
    },
    // deleteReply(id) {
    //   console.log(id);
      
    //   this.$confirm("此操作将回复, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(() => {
    //       messageReplyDelete({ id: id }).then(() => {
    //         this.initmessage();
    //       });
    //       this.$message({
    //         type: "success",
    //         message: "删除成功!",
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除",
    //       });
    //     });
    // },
    deletemessage(id) {
      console.log(id);
      
      this.$confirm("This operation will permanently delete this message and its reply, continue?", "Tip", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          messageDelete({
            id: id,
          }).then(() => {
            this.initmessage();
          });
          this.$message({
            type: "success",
            message: "Delete successful!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete cancelled",
          });
        });
    },
    handleClose(done) {
      done();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.initmessage();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.initmessage();
    },
  },
};
</script>
  
  <style scoped lang="scss">
@import "./scss/Message.scss";
</style>
  