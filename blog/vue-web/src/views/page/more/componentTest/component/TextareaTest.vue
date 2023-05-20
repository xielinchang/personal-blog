<template>
  <div>
    <my-textarea
      v-model="value"
      label="账号:"
      width="350"
      :placeholder="placeholder"
      maxlength="350"
      height="100"
    ></my-textarea>
  </div>
</template>
<script>
export default {
  name: 'TextTest',
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

