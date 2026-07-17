<template>
    <div class="user">
        <el-card class="mb-20">
            <el-form :inline="true" :model="query" size="mini">
                <el-form-item label="Dictionary Name">
                    <el-input v-model="query.dict_name" placeholder="Dictionary Name" />
                </el-form-item>
                <el-form-item label="Field Type">
                    <el-input v-model="query.dict_type" placeholder="Field Type" />
                </el-form-item>
                <el-form-item label="Status">
                    <el-select v-model="query.state" placeholder="Please Select">
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
                    >Search</el-button>
                    <el-button icon="el-icon-refresh" @click="resetQuery">Reset</el-button>
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
                >Add</el-button>
            </div>
            <div>
                <el-table
                    v-loading="tableLoading"
                    :data="tableData"
                    size="small"
                    style="width: 100%"
                >
                    <el-table-column prop="id" label="Dictionary ID" />
                    <el-table-column prop="dict_name" label="Field Name" />
                    <el-table-column prop="dict_type" label="Field Type">
                        <template slot-scope="scope">
                            <el-link @click="jumpToDetail(scope.row)">{{ scope.row.dict_type }}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="state" label="Status">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.state" type="success" effect="dark">Active</el-tag>
                            <el-tag v-else effect="dark" type="danger">Disabled</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="Remark" />
                    <el-table-column label="Actions" width="260">
                        <template v-slot="scope">
                            <el-button
                                size="mini"
                                icon="el-icon-edit"
                                type="text"
                                @click="editDictType(scope.$index, scope.row)"
                            >Edit</el-button>
                            <el-button
                                size="mini"
                                icon="el-icon-delete"
                                type="text"
                                @click="deleteDictType(scope.$index, scope.row)"
                            >Delete</el-button>
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

        <el-dialog :visible.sync="editDialogShow" title="Edit" width="30%">
            <el-form
                ref="dictFormRules"
                :rules="dictFormRules"
                :model="dictForm"
                label-width="80px"
                size="mini"
            >
                <el-form-item label="Dictionary Name" prop="dict_name">
                    <el-input v-model="dictForm.dict_name" />
                </el-form-item>
                <el-form-item label="Dictionary Type" prop="dict_type">
                    <el-input v-model="dictForm.dict_type" />
                </el-form-item>
                <el-form-item label="Status" prop="state">
                    <el-switch
                        v-model="dictForm.state"
                        :active-value="1"
                        :inactive-value="0"
                    />
                </el-form-item>
                <el-form-item label="Remark">
                    <el-input v-model="dictForm.remark" />
                </el-form-item>
                <el-form-item style="text-align: right">
                    <el-button type="primary" @click="onSubmit">Confirm</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { page, create, update, deleteDict } from '../../api/dict'
export default {
    name: 'Dict',
    data() {
        return {
            query: { limit: 10, page: 1 },
            tableData: [{}],
            tableDataTotal: 0,
            tableLoading: true,
            editDialogShow: false,
            dictForm: {},
            dictFormRules: {
                dict_name: [{ required: true, message: 'Please enter dictionary name', trigger: 'blur' }],
                dict_type: [{ required: true, message: 'Please enter dictionary type', trigger: 'blur' }],
                state: [{ required: true, message: 'Please select status', trigger: 'blur' }]
            },
            stateOption: [{ label: 'Active', value: 1 }, { label: 'Disabled', value: 0 }],
            isAdd: true
        }
    },
    created() {
        this.page()
    },
    methods: {
        addDictType() {
            this.isAdd = true
            this.editDialogShow = true
            this.dictForm = { }
        },
        editDictType(index, row) {
            this.isAdd = false
            this.editDialogShow = true
            this.dictForm = { ...row }
        },
        deleteDictType(index, row) {
            this.$confirm(`Delete field name【${row.dict_name}】, continue?`, 'Delete', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                const data = {
                    id: row.id,
                    dict_type: row.dict_type
                }
                deleteDict(data).then(res => {
                    if (res.success) {
                        this.$message({ message: 'Delete successful!', type: 'success' })
                        this.page()
                    }
                })
            })
        },
        submitQuery() {
            this.page()
        },
        resetQuery() {
            this.query = { limit: 10, page: 1 }
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
            page(this.query).then(res => {
                if (res.success) {
                    this.tableData = res.data.rows
                    this.tableDataTotal = res.data.count
                    this.tableLoading = false
                }
            })
        },
        create() {
            create(this.dictForm).then(res => {
                if (res.success) {
                    this.$message({ message: 'Add successful!', type: 'success' })
                    this.editDialogShow = false
                    this.page()
                }
            })
        },
        update() {
            update(this.dictForm).then(res => {
                if (res.success) {
                    this.$message({ message: 'Update successful!', type: 'success' })
                    this.editDialogShow = false
                    this.page()
                }
            })
        },
        jumpToDetail(row) {
            this.$router.push({ path: '/sys/dict/detail', query: { dict_type: row.dict_type }})
        }
    }
}
</script>
