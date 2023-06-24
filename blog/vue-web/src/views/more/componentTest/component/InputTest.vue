<template>
  <div>
    <my-input
      v-model="value"
      label="账号:"
      width="350"
      :placeholder="placeholder"
      icon="user"
    ></my-input>
  </div>
</template>
<script>
export default {
  name: 'InputTest',
  data () {
    return {
      value: '111',
      placeholder: '请输入账号'
    }
  }
}
</script>
<style lang='scss' scoped>

</style>
