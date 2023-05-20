<template>
  <div>
    <div
      class="radio-group"
      style="display: flex;"
    >
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
    </div>
  </div>
</template>
<script>
export default {
  name: 'RadioTest',
  data () {
    return {
      gender: '男'
    }
  },
  methods: {
    radioSelect(v) {
      console.log(v)
    }
  }
}
</script>
<style lang='scss' scoped>

</style>
