<template>
    <div class="user">
        <el-card class="mb-20">
            <el-form :inline="true" :model="query" size="mini">
                <el-form-item label="Account">
                    <el-input v-model="query.username" placeholder="Account" />
                </el-form-item>
                <el-form-item label="Name">
                    <el-input v-model="query.name" placeholder="Name" />
                </el-form-item>
                <el-form-item label="Role">
                    <el-select v-model="query.role" placeholder="Please Select">
                        <el-option
                            v-for="item in roles"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id || ''"
                        >{{ item.name }}</el-option>
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
                    @click="addUser"
                >Add</el-button>
            </div>
            <div>
                <el-table
                    v-loading="tableLoading"
                    :data="tableData"
                    size="small"
                    style="width: 100%"
                >
                    <el-table-column prop="username" label="Account" />
                    <el-table-column prop="name" label="Name" />
                    <el-table-column prop="sex" label="Gender">
                        <template v-slot="scope">
                            {{ scope.row.sex === "1" ? "Male" : scope.row.sex === "0" ? "Female" : "" }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="Phone"
                        width="115"
                    />
                    <el-table-column label="Role">
                        <template v-slot="scope">
                            <el-tag
                                v-for="item in scope.row.sys_roles"
                                :key="item.id"
                                style="margin-right: 5px"
                                size="small"
                            >{{ item.name }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="created_at"
                        label="Created Time"
                        width="160"
                    />
                    <el-table-column
                        prop="updated_at"
                        label="Updated Time"
                        width="160"
                    />
                    <el-table-column label="Actions">
                        <template v-slot="scope">
                            <el-button
                                size="mini"
                                icon="el-icon-edit"
                                type="text"
                                @click="editUser(scope.$index, scope.row)"
                            >Edit</el-button>
                            <el-button
                                size="mini"
                                icon="el-icon-delete"
                                type="text"
                                @click="deleteUser(scope.$index, scope.row)"
                            >Delete</el-button>
                            <el-button
                                size="mini"
                                icon="el-icon-refresh"
                                type="text"
                                @click="resetPsw(scope.$index, scope.row)"
                            >Reset Password</el-button>
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
                ref="userFormRules"
                :rules="userFormRules"
                :model="userForm"
                label-width="80px"
                size="mini"
            >
                <el-form-item label="Account" prop="username">
                    <el-input v-model="userForm.username" />
                </el-form-item>
                <el-form-item label="Name" prop="name">
                    <el-input v-model="userForm.name" />
                </el-form-item>
                <el-form-item label="Gender">
                    <el-radio-group v-model="userForm.sex">
                        <el-radio label="1">Male</el-radio>
                        <el-radio label="0">Female</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="Phone">
                    <el-input v-model="userForm.phone" />
                </el-form-item>
                <el-form-item label="Role" prop="roles">
                    <el-checkbox-group v-model="userForm.roles">
                        <el-checkbox
                            v-for="item in roles"
                            :key="item.id"
                            :label="item.id"
                            name="roles"
                        >{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item style="text-align: right">
                    <el-button type="primary" @click="onSubmit">Confirm</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { page, create, update, userDelete, resetPsw } from '../../api/user'
import { query as roleQuery } from '../../api/role'
import dayjs from 'dayjs'
export default {
    name: 'User',
    data() {
        return {
            query: { limit: 10, page: 1 },
            tableData: [{}],
            tableDataTotal: 0,
            tableLoading: true,
            editDialogShow: false,
            userForm: { roles: [] },
            userFormRules: {
                username: [{ required: true, message: 'Please enter account', trigger: 'blur' }],
                name: [{ required: true, message: 'Please enter name', trigger: 'blur' }],
                roles: [{ required: true, message: 'Please select role', trigger: 'blur' }]
            },
            roles: [{}],
            isAdd: true
        }
    },
    created() {
        this.page()
        this.roleQuery()
    },
    methods: {
        addUser() {
            this.isAdd = true
            this.editDialogShow = true
            this.userForm = { roles: [] }
        },
        editUser(index, user) {
            this.isAdd = false
            this.editDialogShow = true
            this.userForm = { ...user }
            this.userForm.roles = user.sys_roles.map((item) => item.id)
        },
        deleteUser(index, user) {
            this.$confirm(`Delete user【${user.name}】, continue?`, 'Delete', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                userDelete({ id: user.id })
                    .then((res) => {
                        if (res.success) {
                            this.$message({ type: 'success', message: 'Delete successful!' })
                            this.page()
                        } else {
                            this.$message.error('Delete failed!')
                        }
                    })
                    .catch(() => this.$message.error('Delete failed!'))
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
            this.userForm.birth = dayjs(this.userForm.birth).format('YYYY-MM')
            this.$refs.userFormRules.validate((valid) => {
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
            page(this.query)
                .then((res) => {
                    if (res.success) {
                        this.tableData = res.data.rows
                        this.tableDataTotal = res.data.count
                        this.tableLoading = false
                    }
                })
                .catch(() => {
                    this.tableLoading = false
                })
        },
        roleQuery() {
            roleQuery().then((res) => {
                if (res.success) {
                    this.roles = res.data
                }
            })
        },
        create() {
            create(this.userForm)
                .then((res) => {
                    if (res.success) {
                        this.$message({ message: 'Add successful!', type: 'success' })
                        this.editDialogShow = false
                        this.page()
                    } else {
                        this.$message.error(res.data)
                    }
                })
                .catch(() => this.$message.error('Add failed!'))
        },
        update() {
            update(this.userForm)
                .then((res) => {
                    if (res.success) {
                        this.$message({ message: 'Update successful!', type: 'success' })
                        this.editDialogShow = false
                        this.page()
                    } else {
                        this.$message.error(res.data)
                    }
                })
                .catch(() => this.$message.error('Update failed!'))
        },
        resetPsw(index, row) {
            this.$confirm(`Reset password for user【${row.name}】?`, 'Tip', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                resetPsw({ id: row.id }).then((res) => {
                    if (res.success) {
                        this.$message({ message: 'Reset successful!', type: 'success' })
                    } else {
                        this.$message.error(res.data)
                    }
                })
            })
        }
    }
}
</script>
