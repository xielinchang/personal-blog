<template>
    <div class="change-psw">
        <el-card>
            <el-form ref="passForm" size="mini" :model="passForm" :rules="rules" label-width="100px">
                <el-form-item label="Original Password" prop="old_pass">
                    <el-input v-model="passForm.old_pass" type="password" />
                </el-form-item>
                <el-form-item label="New Password" prop="pass">
                    <el-input v-model="passForm.pass" type="password" />
                </el-form-item>
                <el-form-item label="Confirm Password" prop="check_pass">
                    <el-input v-model="passForm.check_pass" type="password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('passForm')">Confirm</el-button>
                    <el-button @click="resetForm('passForm')">Reset</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { changePsw } from '@/api/login'
import { removeToken } from '@/utils/cookie'

export default {
    name: 'ChangePsw',
    components: {

    },
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter password'))
            } else {
                if (this.passForm.check_pass !== '') {
                    this.$refs.passForm.validateField('check_pass')
                }
                callback()
            }
        }
        var validateCheckPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter password again'))
            } else if (value !== this.passForm.pass) {
                callback(new Error('The two passwords entered are different!'))
            } else {
                callback()
            }
        }
        var validateOldPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter password'))
            } else {
                if (this.passForm.check_pass !== '') {
                    this.$refs.passForm.validateField('check_pass')
                }
                callback()
            }
        }
        return {
            passForm: {
                pass: '',
                check_pass: '',
                old_pass: ''
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                check_pass: [
                    { validator: validateCheckPass, trigger: 'blur' }
                ],
                old_pass: [
                    { validator: validateOldPass, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    changePsw(this.passForm).then(res => {
                        if (res.success) {
                            this.$message({
                                type: 'success',
                                message: 'Password changed successfully, please login again!',
                                duration: 5000
                            })
                            removeToken('systoken')
                            this.$router.push('/')
                        } else {
                            this.$message.error(res.data)
                        }
                    })
                } else {
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        }
    }
}
</script>

<style lang="scss" scoped>
.change-psw {
  padding: 20px;
  .el-input {
    width: 300px;
  }
}
</style>
