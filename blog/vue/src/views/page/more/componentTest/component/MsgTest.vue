<template>
  <div>
    <my-button
      name="消息"
      icon="edit"
      type="warning"
      @click="open()"
    ></my-button>
  </div>
</template>
<script>
export default {
  name: 'MsgTest',
  methods: {
    open() {
      this.$msg({
        type: 'danger',
        content: '这是一条自定义消息'
      })
    }
  }
}
</script>
<style lang='scss' scoped>

</style>

