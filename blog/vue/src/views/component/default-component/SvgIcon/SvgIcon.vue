<template>
  <div>
    <svg
      class="svg-icon"
      :class="`svg-icon-${iconName}`"
      aria-hidden="true"
      :style="style"
      v-on="$listeners"
    >
      <use :xlink:href="`#icon-${iconName}`" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconName: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#666'
    },
    size: {
      // 提供mini small，large三种默认尺寸
      type: [String || Number],
      default: '16px'
    }
  },
  computed: {
    style() {
      return {
        fontSize: this.size === 'mini' ? '14px' : this.size === 'small' ? '16px' : this.size === 'large' ? '18px' : this.size,
        color: this.color
      }
    }
  },
  mounted () {
    const requireAll = requireContext => requireContext.keys().map(requireContext)
    // map传入一个函数，遍历数组中的每个对象，被webpack自动进行导入
    // eslint-disable-next-line
    const req = require.context('./icons/svg', true, /\.svg$/)
    requireAll(req)
  }
}
</script>

<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    overflow: hidden;
    vertical-align: -0.15em;
    fill: currentColor;
}
.svg-icon-晴{
  animation: rotating 8s linear infinite;
}
.svg-icon-setting-filled{
  animation: rotating 8s linear infinite;
}
@keyframes rotating {
    0% {
        transform: rotateZ(0deg);
    }

    100% {
        transform: rotateZ(360deg);
    }
}
</style>
