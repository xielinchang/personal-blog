<template>
  <div class="img-box">
    <div
      v-if="!imageUrl"
      class="upload"
      @click="handleUpload"
    >
      <svg-icon icon-name="upload"></svg-icon>
      <span class="tips">上传</span>
    </div>
    <div
      v-else
      class="upload"
    >
      <div
        class="img-wrap"
        :style="{ backgroundImage: `url(${imageUrl})` }"
      >
        <div class="cover">
          <svg-icon
            icon-name="upload"
            @click="handleUpload"
          />
          <svg-icon
            icon-name="delete"
            @click="handleDelete"
          />
        </div>
      </div>
    </div>
    <!-- 限制上传格式为png/jpg/jpeg三种。 -->
    <input
      ref="fileInt"
      type="file"
      title=""
      :value="imgFile"
      style=""
      accept="image/png, image/jpeg, image/jpg"
      @change="uploadImg($event)"
    />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'MyUpload',
  props: {
    // 服务器地址
    action: {
      type: String,
      default: ''
    },
    // 是否需要预览
    preview: {
      type: Boolean,
      default: true
    }
  },
  emits: ['uploadSuccess'],
  data () {
    return {
      imgFile: '', // input输入框value值
      option: {
        img: '' // 图片的地址
      },
      // 图片预览的地址
      imageUrl: ''

    }
  },

  methods: {
    uploadImg() {
      const file = this.$refs.fileInt.files[0]
      const data = new FormData()
      data.append('file', file)
      if (this.preview) {
        this.imageUrl = URL.createObjectURL(file)
        this.$emit('uploadSuccess', file)
      } else {
        axios.post(this.action, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          console.log(res)
          this.$emit('uploadSuccess', file, res)
          this.imageUrl = process.env.VUE_APP_BASE_API + res.data.data.url
        }).catch(err => {
          console.log(err)
        })
      }
    },
    handleUpload() {
      this.$refs.fileInt.click()
    },
    handleDelete() {
      this.imageUrl = ''
    }
  }
}
</script>

<style scoped lang="scss">
@import './MyUpload.scss';
</style>

