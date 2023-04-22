<template>
  <div
    class="btn-item"
  >
    <svg-icon
      :icon-name="icon"
      :size="size"
      :style="{ borderRadius: type == 'round' ? '50%' : '4px' }"
      color="#409EFF"
      class="btn-icon"
    ></svg-icon>
  </div>
</template>
<script>
export default {
  name: 'IconButton',
  props: {
    icon: {
      type: String,
      default: 'user'
    },
    type: {
      validator: function (value) {
        return ['round', 'default'].indexOf(value) !== -1
      },
      default: 'default'
    },
    size: {
      type: [String, Number],
      default: '20px'
    }
  }
}
</script>
<style lang='scss' scoped>
 .btn-item{
        width: 40px;
        height: 40px;
        line-height: 40px;
        background-color: white;
        box-shadow: 0 0 6px rgba(0,0,0,.22);
        border-radius: 4px;
        box-sizing: border-box;
        position: relative;
        &:hover{
          background-color: #F2F6FC;
        }
        .btn-icon{
          position: absolute;
          top: 50%;
          width: 20px;
          height: 20px;
          line-height: 24px;
          margin-left: 50%;
          transform: translate(-50%,-50%);
        }
      }
</style>
