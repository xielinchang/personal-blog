<template>
  <div>
    <my-button
      name="打开消息框"
      icon="edit"
      type="info"
      plain
      @click="openBox()"
    ></my-button>
  </div>
</template>
<script>
export default {
  name: 'MsgBoxTest',
  methods: {
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
    }
  }
}
</script>
<style lang='scss' scoped>

</style>
