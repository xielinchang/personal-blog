<template>
  <div
    class="note-main"
  >
    <TemplatePage></TemplatePage>
    <div class="more-container">
      <my-button
        name="编辑"
        icon="edit"
        type="success"
      ></my-button>
      <my-button
        name="编辑"
        icon="edit"
        plain
      ></my-button>
      <my-button
        name="编辑"
        icon="edit"
        type="info"
        size="mini"
      ></my-button>
      <my-button
        name="编辑"
        icon="edit"
        type="warning"
      ></my-button>
      <my-button
        name="编辑"
        icon="edit"
        type="danger"
        size="large"
        icon-position="right"
        @click="open()"
      ></my-button>
      <my-input
        v-model="value"
        :placeholder="placeholder"
        icon="user"
      ></my-input>
      <my-tags
        :value="['1','2']"
        @input="input"
        @update:tags="update"
      ></my-tags>
      <my-upload></my-upload>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotePage',
  data () {
    return {
      value: '111',
      placeholder: '请输入账号'
    }
  },
  mounted() {
    document.documentElement.scrollTop = 0
  },
  methods: {
    open() {
      this.$msg({
        type: 'error',
        content: '这是一条自定义消息'
      })
    },
    input(e) {
      console.log(e)
    },
    update(e) {
      console.log(e)
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
