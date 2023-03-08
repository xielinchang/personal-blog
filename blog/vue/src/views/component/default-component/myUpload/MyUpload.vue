<template>
  <div class="upload-demo">
    <input
      ref="fileInt"
      type="file"
      @change="changeHandle"
    >
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'MyUpload',
  props: {
    msg: String
  },
  methods: {
    changeHandle() {
      const file = this.$refs.fileInt.files[0]
      const data = new FormData()
      data.append('file', file)
      axios.post(process.env.VUE_APP_BASE_API + '/api/file', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

