<template>
  <div
    class="note-main"
  >
    <TemplatePage></TemplatePage>
    <div class="more-container">
      <div class="btn">
        <my-button
          name="编辑"
          icon="edit"
          type="success"
        ></my-button>
        <my-button
          name="编辑"
          icon="edit"
          type="primary"
        ></my-button>
        <my-button
          name="编辑"
          icon="edit"
          type="danger"
        ></my-button>
        <my-button
          name="编辑"
          icon="edit"
          type="info"
        ></my-button>
        <my-button
          name="编辑"
          icon="edit"
          type="warning"
        ></my-button>
        <my-button
          name="编辑"
          icon="edit"
          type="primary"
          plain
        ></my-button>
        <my-button
          name="编辑"
          icon="edit"
          type="success"
          plain
        ></my-button>
        <my-button
          name="编辑"
          icon="edit"
          type="danger"
          plain
        ></my-button>
        <my-button
          name="编辑"
          icon="edit"
          type="warning"
          plain
          @click="open2()"
        ></my-button>
        <my-button
          name="编辑"
          icon="edit"
          type="info"
          plain
          @click="openBox()"
        ></my-button>
        <my-button
          name="编辑"
          icon="edit"
          type="danger"
          size="large"
          icon-position="right"
          @click="open()"
        ></my-button>
      </div>
      <my-input
        v-model="value"
        label="账号:"
        width="350"
        :placeholder="placeholder"
        icon="user"
      ></my-input>
      <my-tags
        :value="[]"
        @input="input"
        @update:tags="update"
      ></my-tags>
      <my-upload
        v-model="file"
        :action="uploadUrl"
        @upload-success="uploadOneCallback"
      ></my-upload>
      <my-radio
        v-model="gender"
        label="男"
        @input="radioSelect"
      >男</my-radio>
      <my-radio
        v-model="gender"
        label="女"
        @input="radioSelect"
      >女</my-radio>
      <my-select
        :options="options"
        :selected="selected"
        @change-select="changeSelect"
      ></my-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotePage',
  data () {
    return {
      value: '111',
      placeholder: '请输入账号',
      file: {},
      uploadUrl: process.env.VUE_APP_BASE_API + '/api/file',
      gender: '男',
      options: [{
        label: '苹果',
        value: '1'
      }, {
        label: '香蕉',
        value: '2'
      }, {
        label: '橘子',
        value: '3'
      }],
      selected: {
        label: '橘子',
        value: '3'
      }
    }
  },
  mounted() {
    document.documentElement.scrollTop = 0
  },
  methods: {
    open() {
      this.$msg({
        type: 'danger',
        content: '这是一条自定义消息'
      })
    },
    open2() {
      this.$msg({
        type: 'info',
        content: '这是一条自定义消息'
      })
    },
    input(e) {
      // console.log(e)
    },
    update(e) {
      console.log(e)
    },
    uploadOneCallback: function(value) {
      console.log(value)
      if (value) {
        this.fileNameList = value
      } else {
        this.fileNameList = []
      }
    },
    openBox() {
      this.$msgBox.confirm({
        title: '提醒',
        content: '要删除吗？一旦删除将不可恢复',
        type: 'info',
        onOK: () => {
          console.log(111)
        },
        onCancel: () => {
          console.log(222)
        }
      })
    },
    radioSelect(v) {
      console.log(v)
    },
    changeSelect(label, value) {
      console.log(label, value)
      this.selected.label = label
      this.selected.value = value
    }
  }
}
</script>
<style>
</style>
<style scoped>

.note-main{
    width: 100%;
    min-height: calc(100vh);
}
.head-tab{
    margin: auto;
}
.more-container {
  width: 60%;
  height: 1200px;
  position: absolute;
  margin-left: 50%;
  transform: translateX(-50%);
  top: 100px;
  border-radius: 8px;
  background: rgb(255,255,255 ,0.6);
  box-shadow: 0 0 0 1px rgb(255 255 255 / 40%) inset,
    0 13px 15px rgb(31 45 61 / 15%);
}
</style>
