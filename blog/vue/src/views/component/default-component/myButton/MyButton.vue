<template>
  <div>

    <div
      class="my-button"
      :class="[ type,size,plain===true?type+'plain':'']"
      :style="{color:textColor}"
      @click="$emit('click',$event)"
    > <svg-icon
        v-if="iconPosition==='left'"
        class="icon"
        :icon-name="icon"
        :color="iconColor"
        :size="size"
      ></svg-icon>
      <slot>{{ name }}</slot>
      <svg-icon
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
export default {
  name: 'MyButton',
  props: {
    name: {
      type: [String, Number],
      default: ''
    },
    type: {
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

<style lang="scss" scpoed>
@import './MyButton.scss';
</style>
