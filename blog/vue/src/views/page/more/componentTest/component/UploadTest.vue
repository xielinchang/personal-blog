<template>
  <div>
    <my-upload
      v-model="file"
      :action="uploadUrl"
      @upload-success="uploadCallback"
    ></my-upload>
  </div>
</template>
<script>
export default {
  name: 'UploadTest',
  data () {
    return {
      file: {},
      uploadUrl: process.env.VUE_APP_BASE_API + '/api/file'
    }
  },
  methods: {
    uploadCallback(url) {
      console.log(url)
      this.$msg({
        type: 'success',
        content: '上传成功'
      })
    }
  }
}
</script>
<style lang='scss' scoped>

</style>
