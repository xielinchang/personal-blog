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
        <!-- <my-input label="用户名：" v-model="search.username" class="my-input" height="38" placeholder="请输入用户名" /> -->
        <!-- <my-button style="margin:0 10px" @click="searched" class="my-button" type="primary" icon="search">搜索</my-button> -->
        <my-button @click="initVisit" class="my-button" type="primary" icon="refresh">Reset</my-button>
      </div>
      <el-card class="box-card">
        <div class="main">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column align="center" prop="id" label="Visitor ID" />
            <el-table-column align="center" prop="ip" label="IP Address" />
            <el-table-column align="center" prop="visit_address" label="Visit Address" />
            <el-table-column align="center" prop="visit_count" label="Visit Frequency" >
              <template slot-scope="scope">
              <span>
                {{ scope.row.visit_sessions.length }}
              </span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at"  sortable label="First Visit Time" width="200">
            </el-table-column>
            <el-table-column align="center" fixed="right" label="Actions" width="200">
              <template slot-scope="scope">
                <el-button type="text" size="small" icon="el-icon-view"
                  @click="handleView(scope.row, scope.$index)">View Records</el-button>
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
      title="Visitor Records"
      :visible.sync="visitSessionVisible"
      width="800px"
      :before-close="handleClose"
    >
      <el-table :data="visitSessionData" style="width:100%">
        <el-table-column align="center" prop="id" label="id" width="150" />
        
        <el-table-column align="center" prop="start_time" label="Session Start Time" width="300" >
          <template slot-scope="scope">
           <span>
            {{ scope.row.start_time }}
           </span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="visit_page" label="Visit Page" width="300" >
          <template slot-scope="scope">
           <span>
            {{ scope.row.visit_page}}
           </span>
          </template>
          </el-table-column>
        <!-- <el-table-column align="center" fixed="right" label="操作" width="200">
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
        </el-table-column> -->
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="visitSessionVisible = false"
          >Confirm</el-button>
      </span>
    </el-dialog>
    </div>
  </template>
  
  <script>
  import { queryVisit  } from "@/api/index/user";
  import dayjs from "dayjs";
  export default {
    name: "VisitManagement",
    data() {
      return {
        tableData: [],
        visitSessionData:[],
        visitSessionVisible:false,
        currentPage: 1,
        pagesize: 10,
        totalpage: 0,
      };
    },
    mounted() {
      this.initVisit();
    },
    methods: {
        initVisit() {
        this.tableData = [];
        queryVisit({
          limit: this.pagesize,
          offset: this.currentPage,
        }).then((res) => {
          console.log(res);
          this.tableData = res.visits.rows;
          this.totalpage = res.visits.count;
        });
      },
      handleSizeChange(val) {
          this.pagesize = val;
          this.initVisit();
        },
        handleCurrentChange(val) {
          this.currentPage = val;
          this.initVisit();
        },
      handleView(row){
        console.log(row);
        this.visitSessionVisible = true;
        this.visitSessionData = row.visit_sessions;
      },
      handleClose() {
      this.visitSessionVisible = false;
    },
    formatDate(date) {
      return dayjs(date * 1).format('YYYY-MM-DD HH:mm:ss');
    },
    },
  };
  </script>
  <style scoped lang="scss">
  @import "./scss/Visit.scss";
  </style>
  
  