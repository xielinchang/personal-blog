<template>
  <div>
    <div class="aboutme block">
      <div class="label">详细信息:</div>
      <div class="check-about-c"></div>
      <div class="edit-aboutme-c">
        <div class="inputs">
          qq:
          <my-input
            :disabled="editFlag"
            v-model="aboutmeForm.qq"
            class="input-item"
            :width="inputSize"
          ></my-input>
          email:
          <my-input
            :disabled="editFlag"
            v-model="aboutmeForm.email"
            class="input-item"
            :width="inputSize"
          ></my-input>
          phone:
          <my-input
            :disabled="editFlag"
            v-model="aboutmeForm.phone"
            class="input-item"
            :width="inputSize"
          ></my-input>
        </div>
        <div class="web-declare">
          <my-textarea
            :disabled="editFlag"
            v-model="aboutmeForm.web_declare"
            style="margin-top: 10px"
            label="网站申明:"
            width="400"
            placeholder="请输入内容"
            maxlength="200"
            height="100"
          ></my-textarea>
        </div>
        <div class="techniques">
          <span>技术栈:</span>
          <my-tags
            v-if="!editFlag"
            :value="techniques"
            @update-tags="updateTechniques"
          ></my-tags>
          <ul v-else class="techniques-tags">
            <li v-for="item in techniques" :key="item">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="btns">
          <my-button
            class="edit-btn"
            @click="editFlag = !editFlag"
            :type="editFlag ? 'primary' : 'danger'"
            >{{ editFlag ? "修改" : "取消" }}</my-button
          >
          <my-button
            v-if="!editFlag"
            class="edit-btn"
            @click="edit"
            type="success"
            >确认修改</my-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { queryAboutme, updateAboutme } from "@/api/main/aboutme";

export default {
  data() {
    return {
      prefix: process.env.VUE_APP_BASE_API,
      inputSize: 300,
      aboutmeForm: {
        qq: "",
        email: "",
        phone: "",
        techniques: "",
        web_declare: "",
      },
      editFlag: true,
      techniques: [],
    };
  },
  mounted() {
    this.initAboutme();
  },
  methods: {
    edit() {
      this.aboutmeForm.techniques = this.techniques.join(",");
      updateAboutme(this.aboutmeForm).then((res) => {
        this.initAboutme();
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.editFlag = true;
      });
    },
    updateTechniques(e) {
      this.techniques = e;
    },
    initAboutme() {
      queryAboutme().then((res) => {
        this.aboutmeForm = res[0];
        this.techniques = res[0].techniques.split(",");
      });
    },
  },
};
</script>

<style lang='scss' scoped>
@import "./scss/Aboutme.scss";
</style>
