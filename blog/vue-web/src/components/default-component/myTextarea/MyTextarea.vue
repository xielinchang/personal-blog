<template>
  <div>
    <div
      class="my-textarea"
      :style="justStyle"
    >
      <span v-show="label!==''">{{ label }}</span>
      <div
        class="textarea-main"
      >
        <textarea
          :style="justStyle"
          :class="[{'is-disabled':disabled},isResize?'':'no-resize']"
          :value="value"
          :placeholder="placeholder"
          :disabled="disabled"
          :maxlength="maxlength"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        >
        </textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyTextarea',
  props: {
    width: {
      type: [Number, String],
      default: 240
    },
    height: {
      type: [Number, String],
      default: 35
    },
    borderWidth: {
      type: [Number, String],
      default: 1
    },
    placeholder: {
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
    },
    maxlength: {
      type: [Number, String],
      default: 200
    },
    label: {
      type: String,
      default: ''
    },
    isResize: {
      type: [Boolean || String],
      default: true
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
        borderColor: this.value.length > 0 ? this.isFocus ? '#1DA9E0' : '#ccc' : '#FC9709',
        width: this.width ? this.width + 'px' : '300px',
        height: this.height ? this.height + 'px' : '35px',
        borderWidth: this.borderWidth ? this.borderWidth + 'px' : '1px'
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
  @import './MyTextarea.scss';
  </style>

