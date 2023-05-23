<template>
  <div>
    <div class="header block">
      <my-input
        label="用户名："
        v-model="search.username"
        class="my-input"
        placeholder="请输入用户名"
      />
      <my-button class="my-button" size="mini" type="primary" icon="search"
        >搜索</my-button
      >
    </div>
    <el-card class="box-card">
      <div class="main">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            align="center"
            prop="users[0].id"
            label="用户id"
            width="100"
          />
          <el-table-column
            align="center"
            prop="users[0].name"
            label="用户"
            width="100"
          />
          <el-table-column
            align="center"
            prop="users[0].username"
            label="账号"
            width="100"
          />
          <el-table-column
            align="center"
            prop="users[0].portrait"
            label="用户头像"
            width="150"
          >
          <template slot-scope="scpoe">
              <img width="80%" :src="prefix + scpoe.row.users[0].portrait" alt="" />
            </template>
        </el-table-column>
          <el-table-column
            align="center"
            prop="content"
            label="内容"
            width="250"
          />
          <el-table-column
            align="center"
            prop="message_reply.reply"
            label="回复"
            width="200"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="created_at"
            label="评论时间"
            width="100"
          />
          <el-table-column
            align="center"
            prop="address"
            label="评论地点"
            width="120"
          />

          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                icon="el-icon-edit"
                @click="handleReply(scope.row, scope.$index)"
                >回复</el-button
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
      title="回复"
      :visible.sync="replyVisible"
      width="40%"
      :before-close="handleClose"
    >
    <my-textarea width="500" v-model="newReply.reply" class="reply-area"></my-textarea>
      <span slot="footer" class="dialog-footer">
        <el-button @click="replyVisible = false">取 消</el-button>
        <el-button type="primary" @click="replymessage"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
  
  <script>
import { queryUser } from "@/api/index/user";
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
      replyVisible:false,
      prefix: process.env.VUE_APP_BASE_API,
      isReply:false
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
        res.rows.forEach((item, i) => {
          queryUser({ id: item.user_id }).then((res) => {
            this.tableData.push(item);
          });
        });
      });
    },
    handleReply(item, index) {
      this.replyVisible=true
      // 每条回复只能回复一次，但可以修改
      if(item.message_reply!==null){
        this.isReply=true
        this.newReply.id=item.message_reply.id
        this.newReply.reply=item.message_reply.reply
      }else{
        this.isReply=false
      }
      this.newReply.message_id=item.id
    },
    replymessage() {
      if(this.isReply){
        messageReplyUpdate(this.newReply).then((res)=>{
          this.$message({
          type: "success",
          message: "更新回复成功!",
        });
        this.initmessage();
        this.replyVisible=false
        })
      }else{
        messageReplyCreate(this.newReply).then((res) => {
        this.$message({
          type: "success",
          message: "回复成功!",
        });
        this.initmessage();
        this.replyVisible=false
      });
      }
     
    },
    deleteReply(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          messageReplyDelete({ id: id }).then(() => {
            this.initmessage();
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    deletemessage(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
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
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
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
  