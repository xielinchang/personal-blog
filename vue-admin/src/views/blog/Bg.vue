<template>
    <div>
        <div class="bg block">
            Random Day Background:
            <el-switch
            v-model="isRandomDay"
            :disabled = "isRandomDay"
            @change="changeRandomDay"
            ></el-switch>
            <ul class="bg-box">
                <li
                    :class="checkedId === item.id ? 'checked' : ''"
                    v-for="item in bgList"
                    :key="item.id"
                    @click="updateBg(item.id)"
                >
                    <span v-show="checkedId === item.id">Currently Selected (Day)</span>
                    <img :src="prefix + item.url" alt="" />
                    <i
                        v-show="checkedId !== item.id"
                        class="el-icon-delete-solid icon"
                        @click.stop="deleteBg(item.id)"
                    ></i>
                </li>
                <li>
                    <my-upload
                        style="margin-right: 20px; width: 100%; height: 100%"
                        :action="uploadApi"
                        :preview="false"
                        @upload-success="createBg"
                    >
                    </my-upload>
                </li>
            </ul>

            <hr />
            Random Night Background:
            <el-switch
            v-model="isRandomNight"
            :disabled = "isRandomNight"
            @change="changeRandomNight"
            ></el-switch>
            <ul class="bg-box">
                <li
                    :class="checkedIdNight === item.id ? 'checked' : ''"
                    v-for="item in bgNightList"
                    :key="item.id"
                    @click="updateBgNight(item.id)"
                >
                    <span v-show="checkedIdNight === item.id"
                        >Currently Selected (Night)</span
                    >
                    <img :src="prefix + item.url" alt="" />
                    <i
                        v-show="checkedIdNight !== item.id"
                        class="el-icon-delete-solid icon"
                        @click.stop="deleteBgNight(item.id)"
                    ></i>
                </li>
                <li>
                    <my-upload
                        style="margin-right: 20px; width: 100%; height: 100%"
                        :action="uploadApi"
                        :preview="false"
                        @upload-success="createBgNight"
                    >
                    </my-upload>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {
    homeBgList,
    homeBgCreate,
    homeBgDelete,
    homeBgNow,
    updateHomeBg,
    homeBgNightList,
    homeBgNightCreate,
    homeBgNightDelete,
    homeBgNowNight,
    updateHomeBgNight,
} from "../../api/main/bg";
export default {
    name: "BlogBg",
    data() {
        return {
            bgList: [],
            bgNightList: [], //晚上
            checkedId: null,
            checkedIdNight: null, // 晚上
            prefix: process.env.VUE_APP_BASE_API,
            uploadApi: process.env.VUE_APP_BASE_API + "/api/file",
            isRandomDay:false,
            isRandomNight:false,
        };
    },
    mounted() {
        this.initBgList();
    },
    methods: {
        initBgList() {
            homeBgList().then((res) => {
                this.bgList = res;
                const _this = this;
                homeBgNow().then((res) => {
                    if(res[0] && res[0].id && res.length===1){
                        _this.isRandomDay = false;
                       this.checkedId = res[0].id;
                       return null;
                    }
                    this.checkedId = ''
                   _this.isRandomDay = true;
                });
            });
            homeBgNightList().then((res) => {
                this.bgNightList = res;
                const _this = this;
                homeBgNowNight().then((res) => {
                    console.log(res);
                    
                    if(res[0] && res[0].id && res.length===1){
                        _this.isRandomNight = false;
                       this.checkedIdNight = res[0].id;
                       return null;
                    }
                    this.checkedIdNight = ''
                   _this.isRandomNight = true;
                });
            });
        },
        updateBg(id) {
            if (id !== this.checkedId) {
                this.$confirm("Are you sure you want to change this background?", "Tip", {
                    confirmButtonText: "Confirm",
                    cancelButtonText: "Cancel",
                    type: "warning",
                })
                    .then(() => {
                        updateHomeBg({ bg_id: id }).then((res) => {
                            this.$message({
                                type: "success",
                                message: "Change successful!",
                            });
                            this.initBgList();
                        });
                    })
                    .catch(() => {});
            }
        },
        changeRandomDay(value){
            this.isRandomDay = !value;
            this.$confirm("Are you sure you want to change to random background?", "Tip", {
                    confirmButtonText: "Confirm",
                    cancelButtonText: "Cancel",
                    type: "warning",
                })
                    .then(() => {
                        updateHomeBg({ bg_id: 99999 }).then((res) => {
                            this.$message({
                                type: "success",
                                message: "Change successful!",
                            });
                            this.initBgList();
                        });
                    })
                    .catch(() => {
                       
                    });
        },
        updateBgNight(id) {
            if (id !== this.checkedIdNight) {
                this.$confirm("Are you sure you want to change this background?", "Tip", {
                    confirmButtonText: "Confirm",
                    cancelButtonText: "Cancel",
                    type: "warning",
                })
                    .then(() => {
                        updateHomeBgNight({ bg_id: id }).then((res) => {
                            this.$message({
                                type: "success",
                                message: "Change successful!",
                            });
                            this.initBgList();
                        });
                    })
                    .catch(() => {});
            }
        },
        changeRandomNight(value){
            this.isRandomNight = !value;
            this.$confirm("Are you sure you want to change to random background?", "Tip", {
                    confirmButtonText: "Confirm",
                    cancelButtonText: "Cancel",
                    type: "warning",
                })
                    .then(() => {
                        updateHomeBgNight({ bg_id: 99999 }).then((res) => {
                            this.$message({
                                type: "success",
                                message: "Change successful!",
                            });
                            this.initBgList();
                        });
                    })
                    .catch(() => {
                       
                    });
        },
        createBg(res) {
            homeBgCreate({ url: res.data.data.url, upt_act: "I" }).then(
                (res) => {
                    if (res) {
                        this.$message({
                            type: "success",
                            message: "Upload successful",
                        });
                        this.initBgList();
                    }
                }
            );
        },
        createBgNight(res) {
            homeBgNightCreate({ url: res.data.data.url }).then((res) => {
                if (res) {
                    this.$message({
                        type: "success",
                        message: "Upload successful",
                    });
                    this.initBgList();
                }
            });
        },
        deleteBg(id) {
            this.$confirm(
                "Are you sure you want to delete background with id " + id + "? This action cannot be undone",
                "Tip",
                {
                    confirmButtonText: "Confirm",
                    cancelButtonText: "Cancel",
                    type: "warning",
                }
            )
                .then(() => {
                    homeBgDelete({ id: id * 1 }).then((res) => {
                        console.log(res);
                        this.$message({
                            type: "success",
                            message: "Delete successful!",
                        });
                        this.initBgList();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "Delete cancelled",
                    });
                });
        },
        deleteBgNight(id) {
            this.$confirm(
                "Are you sure you want to delete background with id " + id + "? This action cannot be undone",
                "Tip",
                {
                    confirmButtonText: "Confirm",
                    cancelButtonText: "Cancel",
                    type: "warning",
                }
            )
                .then(() => {
                    homeBgNightDelete({ id }).then(() => {
                        this.$message({
                            type: "success",
                            message: "Delete successful!",
                        });
                        this.initBgList();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "Delete cancelled",
                    });
                });
        },
    },
};
</script>
<style lang='scss' scoped>
.bg {
    width: 100%;
    position: relative;
    height: auto;
    min-height: 100px;
    padding: 50px 5%;
    .bg-box {
        list-style: none;
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .checked {
            box-shadow: 1px 1px 20px 1px #409eff;
            transform: scale(1.05);
        }
        & li {
            width: 30%;
            margin: 1.5%;
            height: 250px;
            border-radius: 4px;
            overflow: hidden;
            position: relative;
            box-sizing: border-box;
            background-position: center center;
            & span {
                font-size: 18px;
                color: #409eff;
                opacity: 1;
                position: absolute;
                top: 10px;
                font-weight: 600;
                left: 20px;
            }
            &:hover {
                transform: scale(1.02);
                transition: 300ms;
            }
            & img {
                width: 100%;
                height: 100%;
                object-fit: cover;

            }
            & .icon {
                font-size: 30px;
                color: #ffffff;
                z-index: 99;
                position: absolute;
                right: 10px;
                top: 10px;
            }
        }
    }
}
</style>
