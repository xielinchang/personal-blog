<template>
    <div class="mario-map-control">
        <el-card class="box-card">
            <div class="buttons">
                <el-button type="primary" size="small" icon="el-icon-refresh-right" @click="loadMaps">
                    Sync data
                </el-button>
                <el-button type="primary" size="small" icon="el-icon-plus"
                    @click="$router.push('/gaming/mario/map/create')">
                    Add map
                </el-button>
            </div>
            <div class="mario-map-main">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column align="center" prop="id" label="ID" width="100" />
                    <el-table-column align="center" prop="level" label="Level" width="300" />
                    <el-table-column align="center" prop="name" label="Map name" width="300" />
                    <el-table-column align="center" fixed="right" label="Actions">
                        <template slot-scope="scope">
                            <el-button type="text" icon="el-icon-edit" size="small" @click="handleEdit(scope.row)">
                                Edit
                            </el-button>
                            <el-button type="text" icon="el-icon-delete" size="small" @click="handleDelete(scope.row)">
                                Delete
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pages">
                    <el-pagination class="page-box" :current-page="currentPage" :page-sizes="[10, 15, 20]"
                        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount"
                        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import {
    fetchMaps,    // 获取地图列表
    deleteMap,    // 删除地图
} from "@/api/mario/maps";

export default {
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            totalCount: 0,
            tableData: [],
        };
    },
    mounted() {
        this.loadMaps();
    },
    methods: {
        // 加载地图数据
        loadMaps() {
            fetchMaps({
                limit: this.pageSize,
                offset: this.currentPage,
            }).then((res) => {
                this.tableData = res.result.rows;
                this.totalCount = res.result.count;
            });
        },
        // 新增地图
        addMap() {
            this.$router.push("/gaming/mario/map/create");
        },
        // 显示编辑弹窗
        handleEdit(row) {
            this.$router.push("/gaming/mario/map/update?id=" + row.id);
        },
        // 删除地图
        handleDelete(row) {
            this.$confirm(
                `Are you sure you want to delete the map with ID ${row.id}?`,
                "Reminder",
                {
                    confirmButtonText: "Confirm",
                    cancelButtonText: "Cancel",
                    type: "warning",
                }
            ).then(() => {
                deleteMap({ id: row.id }).then(() => {
                    this.$message.success("Delete successfully!");
                    this.loadMaps();
                });
            }).catch(() => {
                this.$message.info("Deletion cancelled");
            });
        },
        // 分页大小变化
        handleSizeChange(val) {
            this.pageSize = val;
            this.loadMaps();
        },
        // 当前页变化
        handleCurrentChange(val) {
            this.currentPage = val;
            this.loadMaps();
        },
    },
};
</script>

<style lang="scss" scoped>
.mario-map-control {
    .buttons {
        widows: 100%;
        margin-bottom: 10px;
        text-align: right;
    }

    .mario-map-main {
        .pages {
            margin-top: 20px;
            text-align: center;
        }
    }
}
</style>
