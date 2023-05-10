<template>
  <div>
    <my-tags
      :value="[]"
      @input="input"
      @update:tags="update"
    ></my-tags>
  </div>
</template>
<script>
export default {
  name: 'TagsTest',
  methods: {
    input(e) {
      console.log(e)
    },
    update(e) {
      console.log(e)
    }
  }
}
</script>
<style lang='scss' scoped>

</style>
