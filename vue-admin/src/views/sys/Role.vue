<template>
    <div class="role">
        <el-card>
            <div style="text-align: left;" class="mb-20">
                <el-button icon="el-icon-plus" type="primary" size="mini" @click.native="addRole">Add</el-button>
            </div>
            <div>
                <el-table v-loading="tableLoading" :data="tableData" size="small" style="width: 100%">
                    <el-table-column prop="name" label="Role" />
                    <el-table-column prop="code" label="Role Code" />
                    <el-table-column prop="sort" label="Sort" />
                    <el-table-column prop="created_at" label="Created Time" width="160" />
                    <el-table-column prop="updated_at" label="Updated Time" width="160" />
                    <el-table-column label="Actions">
                        <template v-slot="scope">
                            <el-button
                                size="mini"
                                icon="el-icon-edit"
                                type="text"
                                @click="editRole(scope.$index, scope.row)"
                            >Edit</el-button>
                            <el-button
                                size="mini"
                                icon="el-icon-delete"
                                type="text"
                                @click="deleteRole(scope.$index, scope.row)"
                            >Delete</el-button>
                            <el-button
                                size="mini"
                                icon="el-icon-lock"
                                type="text"
                                @click.native="authEdit(scope.$index, scope.row)"
                            >Permission</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div style="text-align: right;margin-top: 10px;">
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
                ref="roleFormRules"
                :rules="roleFormRules"
                :model="roleForm"
                label-width="80px"
                size="mini"
            >
                <el-form-item label="Role" prop="name">
                    <el-input v-model="roleForm.name" />
                </el-form-item>
                <el-form-item label="Role Code" prop="code">
                    <el-input v-model="roleForm.code" />
                </el-form-item>
                <el-form-item label="Sort">
                    <el-input v-model="roleForm.sort" />
                </el-form-item>
                <el-form-item style="text-align: right;">
                    <el-button type="primary" @click="onSubmit">Confirm</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog :visible.sync="authDialogShow" title="Permission" width="30%" @open="treeOpen">
            <el-tree
                ref="tree"
                :data="authData"
                show-checkbox
                node-key="id"
                :default-expand-all="true"
                :props="authDefaultProps"
            />
            <template v-slot:footer>
                <el-button type="primary" size="mini" @click="changeAuthSubmit">Confirm</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { page, create, update, roleDelete } from '../../api/role'
import { queryTree, roleMenuUpdate, roleMenu } from '../../api/menu'
export default {
    name: 'Role',
    data() {
        return {
            roleForm: {},
            query: { limit: 10, page: 1 },
            tableData: [{}],
            tableDataTotal: 0,
            tableLoading: true,
            editDialogShow: false,
            isAdd: true,
            roleFormRules: {
                name: [{ required: true, message: 'Please enter role name', trigger: 'blur' }]
            },
            authDialogShow: false,
            authData: [],
            authDefaultProps: {
                children: 'children',
                label: 'meta_title'
            },
            curRole: {}
        }
    },
    created() {
        this.page()
        this.queryTree()
    },
    methods: {
        addRole() {
            this.isAdd = true
            this.editDialogShow = true
            this.roleForm = {}
        },
        editRole(index, role) {
            this.isAdd = false
            this.editDialogShow = true
            this.roleForm = { ...role }
        },
        authEdit(index, role) {
            this.authDialogShow = true
            this.curRole = role
        },
        treeOpen() {
            roleMenu({ role_id: this.curRole.id }).then(res => {
                // 需要过滤掉父节点，否则即使子菜单没有全选，会变成全选状态
                const checkedKeys = res.data.filter(item => {
                    return item.component !== 'Layout'
                }).map(item => item.id)
                this.$refs.tree.setCheckedKeys(checkedKeys)
            })
        },
        deleteRole(index, role) {
            this.$confirm(`Delete role【${role.name}】, continue?`, 'Delete', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                roleDelete({ id: role.id })
                    .then(res => {
                        if (res.success) {
                            this.$message({ type: 'success', message: 'Delete successful!' })
                            this.page()
                        } else {
                            this.$message.error(res.data)
                        }
                    })
                    .catch(() => this.$message.error('Delete failed!'))
            })
        },
        onSubmit() {
            this.$refs.roleFormRules.validate(valid => {
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
        changeAuthSubmit() {
            const checkedKeys = this.$refs.tree.getCheckedKeys() // Checked state
            const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys() // Half-checked state, when child nodes are not fully selected
            roleMenuUpdate({ trees: checkedKeys.concat(halfCheckedKeys), role_id: this.curRole.id }).then(res => {
                if (res.success) {
                    this.$message({ message: 'Update successful!', type: 'success' })
                    this.authDialogShow = false
                } else {
                    this.$message.error('Update failed!')
                }
            })
                .catch(() => this.$message.error('Update failed!'))
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
            }).catch(() => { this.tableLoading = false })
        },
        async queryTree() {
           
            queryTree().then(res => {
                if (res.success) {
                    this.authData = res.data
                } else {
                    this.$message.error('Query failed!')
                }
            })
                .catch(() => this.$message.error('Query failed!'))
        },
        create() {
            create(this.roleForm)
                .then(res => {
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
            update(this.roleForm)
                .then(res => {
                    if (res.success) {
                        this.$message({ message: 'Update successful!', type: 'success' })
                        this.editDialogShow = false
                        this.page()
                    } else {
                        this.$message.error('Update failed!')
                    }
                })
                .catch(() => this.$message.error('Update failed!'))
        }
    }
}
</script>
