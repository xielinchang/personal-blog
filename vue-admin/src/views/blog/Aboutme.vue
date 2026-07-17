<template>
  <div>
    <div class="aboutme block">
      <div class="label">Details:</div>
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
            label="Website Statement:"
            width="400"
            placeholder="Please enter content"
            maxlength="200"
            height="100"
          ></my-textarea>
        </div>
        <div class="techniques">
          <span>Tech Stack:</span>
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
            >{{ editFlag ? "Edit" : "Cancel" }}</my-button
          >
          <my-button
            v-if="!editFlag"
            class="edit-btn"
            @click="edit"
            type="success"
            >Confirm Edit</my-button
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
          message: "Update successful",
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
