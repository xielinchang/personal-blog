<template>
  <div>
    <div class="bg block">
      <ul class="bg-box">
        <li
          :class="checkedId === item.id ? 'checked' : ''"
          v-for="item in bgList"
          :key="item.id"
          @click="updateBg(item.id)"
        >
          <span v-show="checkedId === item.id">当前选中</span>
          <img :src="prefix + item.url" alt="" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { homeBgList, homeBgNow, updateHomeBg } from "../../api/main/bg";
export default {
  name: "BlogBg",
  data() {
    return {
      bgList: [],
      checkedId: null,
      prefix: process.env.VUE_APP_BASE_API,
    };
  },
  mounted() {
    this.initBgList();
  },
  methods: {
    initBgList() {
      homeBgList().then((res) => {
        this.bgList = res;
        homeBgNow().then((res) => {
          console.log(res);
          this.checkedId = res[0].id;
        });
      });
    },
    updateBg(id) {
      if(id!==this.checkedId){
        this.$confirm("确定更换此背景吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          updateHomeBg({bg_id:id}).then((res) => {
            this.$message({
              type: "success",
              message: "更换成功!",
            });
            this.initBgList();
          });
        })
        .catch(() => {});
      }

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
    justify-content: space-around;
    .checked {
      box-shadow:1px 1px 20px 1px #409eff;
      transform: scale(1.05);
    }
    & li {
      width: 30%;
      height: 250px;
      border-radius: 4px;
      overflow: hidden;
      position: relative;
      box-sizing: border-box;
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
        transform: scale(1.05);
        transition: 300ms;
      }
      & img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
