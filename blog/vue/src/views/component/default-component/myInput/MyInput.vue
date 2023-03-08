<template>
  <div>
    <div class="my-input">

      <div
        class="main"
        :style="justStyle"
      >
        <div class="left-icon">
          <svg-icon
            :icon-name="icon"
            size="16px"
            color="#ddd"
          ></svg-icon>
        </div>
        <input
          :class="{'is-disabled':disabled}"
          :placeholder="placeholder"
          :type="type"
          :disabled="disabled"
          :value="value"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        >
        <div class="right-icon">
          <svg-icon
            :icon-name="value.length>0?'circle-check-filled':'warning-filled'"
            size="16px"
            :color="value.length>0?'#00B753':'#FC9709'"
          ></svg-icon>
          <svg-icon
            v-show="value.length>0"
            icon-name="circle-close-filled"
            size="16px"
            color="#ddd"
            @click="clear"
          ></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    icon: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },
  emits: ['input'],
  data () {
    return {
      isFocus: false
    }
  },
  computed: {
    justStyle() {
      return {
        borderColor: this.value.length > 0 ? this.isFocus ? '#1DA9E0' : '#ccc' : '#FC9709'
      }
    }
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    },
    clear(e) {
      this.$emit('input', '')
    },
    handleBlur() {
      this.isFocus = false
    },
    handleFocus() {
      this.isFocus = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import './MyInput.scss';
</style>
