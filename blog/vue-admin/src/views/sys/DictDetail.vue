<template>
    <div class="user">
        <el-card class="mb-20">
            <el-form :inline="true" :model="query" size="mini">
                <el-form-item label="字典中文">
                    <el-input v-model="query.label" placeholder="字典名称" />
                </el-form-item>
                <el-form-item label="字典值">
                    <el-input v-model="query.value" placeholder="字典值" />
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="query.state" placeholder="请选择">
                        <el-option
                            v-for="item in stateOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        icon="el-icon-search"
                        @click="submitQuery"
                    >查询</el-button>
                    <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card>
            <div style="text-align: left" class="mb-20">
                <el-button
                    icon="el-icon-plus"
                    type="primary"
                    size="mini"
                    @click="addDictType"
                >添加</el-button>
            </div>
            <div>
                <el-table
                    v-loading="tableLoading"
                    :data="tableData"
                    size="small"
                    style="width: 100%"
                >
                    <el-table-column prop="id" label="字典编号" />
                    <el-table-column prop="type" label="字典类型" />
                    <el-table-column prop="label" label="字典中文" />
                    <el-table-column prop="value" label="字典值" />
                    <el-table-column prop="state" label="状态">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.state" type="success" effect="dark">正常</el-tag>
                            <el-tag v-else effect="dark" type="danger">停用</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template v-slot="scope">
                            <el-button
                                size="mini"
                                icon="el-icon-edit"
                                type="text"
                                @click="editDictType(scope.$index, scope.row)"
                            >编辑</el-button>
                            <el-button
                                size="mini"
                                icon="el-icon-delete"
                                type="text"
                                @click="deleteDictType(scope.$index, scope.row)"
                            >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div style="text-align: right; margin-top: 10px">
                <el-pagination
                    :current-page="1"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableDataTotal"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </div>
        </el-card>

        <el-dialog :visible.sync="editDialogShow" title="编辑" width="30%">
            <el-form
                ref="dictFormRules"
                :rules="dictFormRules"
                :model="dictForm"
                label-width="80px"
                size="mini"
            >
                <el-form-item label="字典中文" prop="label">
                    <el-input v-model="dictForm.label" />
                </el-form-item>
                <el-form-item label="字典值" prop="value">
                    <el-input v-model="dictForm.value" />
                </el-form-item>
                <el-form-item label="状态" prop="state">
                    <el-switch
                        v-model="dictForm.state"
                        :active-value="1"
                        :inactive-value="0"
                    />
                </el-form-item>
                <el-form-item style="text-align: right">
                    <el-button type="primary" @click="onSubmit">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { pageByType, createByType, updateByType, deleteDictByType } from '../../api/dict'
export default {
    name: 'Dict',
    data() {
        return {
            query: { limit: 10, page: 1, type: this.$route.query.dict_type },
            tableData: [{}],
            tableDataTotal: 0,
            tableLoading: true,
            editDialogShow: false,
            dictForm: {},
            dictFormRules: {
                label: [{ required: true, message: '请输入字典中文', trigger: 'blur' }],
                value: [{ required: true, message: '请输入字典值', trigger: 'blur' }],
                state: [{ required: true, message: '请选择状态', trigger: 'blur' }]
            },
            stateOption: [{ label: '正常', value: 1 }, { label: '停用', value: 0 }],
            isAdd: true
        }
    },
    created() {
        // this.query.type = this.$route.query.dict_type
        this.page()
    },
    methods: {
        addDictType() {
            this.isAdd = true
            this.editDialogShow = true
            this.dictForm = { type: this.$route.query.dict_type, state: 0 }
        },
        editDictType(index, row) {
            this.isAdd = false
            this.editDialogShow = true
            this.dictForm = { ...row }
        },
        deleteDictType(index, row) {
            this.$confirm(`删除字段名称【${row.label}】, 是否继续?`, '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const data = {
                    id: row.id,
                    dict_type: row.dict_type
                }
                deleteDictByType(data).then(res => {
                    if (res.success) {
                        this.$message({ message: '删除成功！', type: 'success' })
                        this.page()
                    }
                })
            })
        },
        submitQuery() {
            this.page()
        },
        resetQuery() {
            this.query = { limit: 10, page: 1, type: this.$route.query.dict_type }
            this.page()
        },
        onSubmit() {
            this.$refs.dictFormRules.validate((valid) => {
                if (valid) {
                    if (this.isAdd) {
                        this.create()
                    } else {
                        this.update()
                    }
                } else {
                    return false
                }
            })
        },
        handleSizeChange(val) {
            this.query.limit = val
            this.page()
        },
        handleCurrentChange(val) {
            this.query.page = val
            this.page()
        },
        page() {
            this.tableLoading = true
            pageByType(this.query).then(res => {
                if (res.success) {
                    this.tableData = res.data.rows
                    this.tableDataTotal = res.data.count
                    this.tableLoading = false
                }
            })
        },
        create() {
            createByType(this.dictForm).then(res => {
                if (res.success) {
                    this.$message({ message: '添加成功！', type: 'success' })
                    this.editDialogShow = false
                    this.page()
                }
            })
        },
        update() {
            updateByType(this.dictForm).then(res => {
                if (res.success) {
                    this.$message({ message: '添加成功！', type: 'success' })
                    this.editDialogShow = false
                    this.page()
                }
            })
        },
        jumpToDetail(row) {
            console.log(row)
        }
    }
}
</script>
