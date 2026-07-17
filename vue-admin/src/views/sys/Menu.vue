<template>
    <div class="menu">
        <el-card>
            <div style="text-align: left" class="mb-20">
                <el-button
                    icon="el-icon-plus"
                    type="primary"
                    size="mini"
                    @click="addMenu"
                >Add</el-button>
            </div>
            <div>
                <el-table
                    v-loading="tableLoading"
                    :data="tableData"
                    style="width: 100%; margin-bottom: 20px"
                    row-key="id"
                    size="mini"
                    default-expand-all
                    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                >
                    <el-table-column prop="meta_title" label="Menu" />
                    <el-table-column prop="path" label="Route" />
                    <el-table-column prop="component" label="Component Path" />
                    <el-table-column prop="name" label="Name" />
                    <el-table-column prop="meta_icon" label="Icon">
                        <template v-slot="scope">
                            <svg-icon :name="scope.row.meta_icon" class="svg-icon" />
                        </template>
                    </el-table-column>
                    <el-table-column label="Actions" width="200">
                        <template v-slot="scope">
                            <el-button
                                size="mini"
                                icon="el-icon-plus"
                                type="text"
                                @click="addChildMenu(scope.$index, scope.row)"
                            >Add</el-button>
                            <el-button
                                size="mini"
                                icon="el-icon-edit"
                                type="text"
                                @click="editMenu(scope.$index, scope.row)"
                            >Edit</el-button>
                            <el-button
                                size="mini"
                                icon="el-icon-delete"
                                type="text"
                                @click="deleteMenu(scope.$index, scope.row)"
                            >Delete</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>

        <!-- Edit Dialog -->
        <el-dialog :visible.sync="editDialogShow" title="Edit" width="30%">
            <el-form
                ref="menuFormRules"
                :rules="menuFormRules"
                :model="menuForm"
                label-width="80px"
                size="mini"
            >
                <el-form-item label="Menu" prop="meta_title">
                    <el-input v-model="menuForm.meta_title" />
                </el-form-item>
                <el-form-item label="Route" prop="path">
                    <el-input v-model="menuForm.path" />
                </el-form-item>
                <el-form-item label="Component Path" prop="component">
                    <el-input v-model="menuForm.component" />
                </el-form-item>
                <el-form-item label="Name" prop="name">
                    <el-input v-model="menuForm.name" />
                </el-form-item>
                <el-form-item label="Icon" prop="meta_icon">
                    <el-select v-model="menuForm.meta_icon" placeholder="Please Select">
                        <el-option
                            v-for="item in icons"
                            :key="item"
                            :label="item"
                            :value="item"
                        >
                            <span
                                style="float: left"
                            ><svg-icon :name="item" class="svg-icon" /></span>
                            <span style="float: right">{{ item }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Display Status" prop="hidden">
                    <el-radio-group v-model="menuForm.hidden">
                        <el-radio label="0">Show</el-radio>
                        <el-radio label="1">Hide</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item style="text-align: right">
                    <el-button type="primary" @click="onSubmit">Confirm</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { queryTree, create, update, deleteMenu } from '@/api/menu'
export default {
    name: 'Menu',
    data() {
        return {
            tableData: [],
            editDialogShow: false,
            tableLoading: true,
            menuFormRules: {},
            menuForm: {
                meta_title: [
                    { required: true, message: 'Please enter menu', trigger: 'blur' }
                ],
                path: [{ required: true, message: 'Please enter route', trigger: 'blur' }],
                component: [
                    { required: true, message: 'Please enter component path', trigger: 'blur' }
                ],
                name: [{ required: true, message: 'Please enter name', trigger: 'blur' }],
                meta_icon: [{ required: true, message: 'Please enter icon', trigger: 'blur' }]
            },
            isAdd: true,
            icons: []
        }
    },
    created() {
        this.queryTree()
    },
    methods: {
        addMenu() {
            this.isAdd = true
            this.menuForm = { component: 'Layout', parent_id: 0 }
            this.editDialogShow = true
            this.getIcons()
        },
        editMenu(index, row) {
            this.isAdd = false
            this.menuForm = { ...row }
            this.editDialogShow = true
            this.getIcons()
        },
        deleteMenu(index, row) {
            this.$confirm(`Delete menu【${row.meta_title}】, continue?`, 'Delete', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                deleteMenu({ id: row.id })
                    .then((res) => {
                        if (res.success) {
                            this.$message({ type: 'success', message: 'Delete successful!' })
                            this.queryTree()
                        } else {
                            this.$message.error(res.data)
                        }
                    })
                    .catch(() => this.$message.error('Delete failed!'))
            })
        },
        addChildMenu(index, row) {
            this.menuForm = { parent_id: row.id }
            this.editDialogShow = true
            this.isAdd = true
            this.getIcons()
        },
        onSubmit() {
            if (this.isAdd) {
                create(this.menuForm)
                    .then((res) => {
                        if (res.success) {
                            this.$message({ type: 'success', message: 'Add successful!' })
                            this.queryTree()
                            this.editDialogShow = false
                        } else {
                            this.$message.error('Add failed!')
                        }
                    })
                    .catch(() => this.$message.error('Add failed!'))
            } else {
                update(this.menuForm)
                    .then((res) => {
                        if (res.success) {
                            this.$message({ type: 'success', message: 'Update successful!' })
                            this.queryTree()
                            this.editDialogShow = false
                        } else {
                            this.$message.error('Update failed!')
                        }
                    })
                    .catch(() => this.$message.error('Update failed!'))
            }
        },
        queryTree() {
            this.tableLoading = true
            queryTree()
                .then((res) => {
                    this.tableData = res.data
                    this.tableLoading = false
                })
                .catch(() => {
                    this.tableLoading = false
                })
        },
        getIcons() {
            if (this.icons.length === 0) {
                const files = require.context('@/assets/icons', false, /.svg$/).keys()
                this.icons = files.map((item) => {
                    return item.replace('./', '').replace('.svg', '')
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 20px;
  height: 20px;
}
</style>
