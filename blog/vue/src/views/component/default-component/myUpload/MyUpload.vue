<template>
  <div class="img-box">
    <div
      v-if="!image"
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
        :style="{ backgroundImage: `url(${image})` }"
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
      default: false
    },
    // 图片预览的地址
    image: {
      type: String,
      default: ''
    }
  },
  emits: ['upload-success', 'delete-img'],
  data () {
    return {
      imgFile: '' // input输入框value值
    }
  },

  methods: {
    uploadImg() {
      const file = this.$refs.fileInt.files[0]
      const data = new FormData()
      data.append('file', file)
      if (this.preview) {
        this.$emit('upload-success', URL.createObjectURL(file), file)
      } else {
        axios.post(this.action, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          console.log(res)
          this.$emit('upload-success', file, res)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    handleUpload() {
      this.$refs.fileInt.click()
    },
    handleDelete() {
      // 点击删除时触发事件，无参数
      this.$emit('delete-img', '')
    }
  }
}
</script>

<style scoped lang="scss">
@import './MyUpload.scss';
</style>

