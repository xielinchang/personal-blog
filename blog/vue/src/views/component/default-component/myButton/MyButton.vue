<template>
  <div>
    <div
      class="my-button"
      :class="[ type,size,plain===true?type+'plain':'']"
      :style="{color:textColor}"
      @click="$emit('click',$event)"
    > <div>
      </div>
      <svg-icon
        v-show="icon!==''"
        v-if="iconPosition==='left'"
        class="icon"
        :icon-name="icon"
        :color="iconColor"
        :size="size"
      ></svg-icon>
      <slot>{{ name }}</slot>
      <svg-icon
        v-show="icon!==''"
        v-if="iconPosition==='right'"
        class="icon"
        :icon-name="icon"
        :color="iconColor"
        :size="size"
      ></svg-icon>
    </div>
  </div>
</template>

<script>
// 解决消息弹框报错未注册此组件
import SvgIcon from '../SvgIcon/SvgIcon.vue'
export default {
  name: 'MyButton',
  components: {
    SvgIcon
  },
  props: {
    name: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      validator: function (value) {
        return ['primary', 'info', 'success', 'warning', 'danger'].indexOf(value) !== -1
      },
      default: 'primary'
    },
    size: {
      validator: function (value) {
        return ['mini', 'small', 'large'].indexOf(value) !== -1
      },
      default: 'small'
    },
    icon: {
      type: String,
      default: ''
    },
    iconPosition: {
      validator: function (value) {
        return ['left', 'right'].indexOf(value) !== -1
      },
      default: 'left'
    },
    iconColor: {
      type: String,
      default: ''
    },
    textColor: {
      type: String,
      default: ''
    },
    plain: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import './MyButton.scss';
</style>
