<template>
  <div>
    <div
      class="my-input"
      :style="justStyle"
    >
      <span
        v-show="label!==''"
        :style="justLableStyle"
      >{{ label }}</span>
      <div
        class="input-main"
        :style="justStyle"
      >
        <div
          v-if="icon"
          class="left-icon"
        >
          <svg-icon
            :name="icon"
            size="16px"
            color="#ddd"
          ></svg-icon>
        </div>
        <input
          :style="justInputStyle"
          :class="{'is-disabled':disabled}"
          :placeholder="placeholder"
          :type="type"
          :value="value"
          :maxlength="maxlength"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        >
        <div class="right-icon">
          <svg-icon
            :name="isValue?'circle-check-filled':'warning-filled'"
            size="16px"
            :color="isValue?'#00B753':'#FC9709'"
          ></svg-icon>
          <svg-icon
            v-show="isValue"
            name="circle-close-filled"
            size="16px"
            color="#ddd"
            @click="clear"
          ></svg-icon>
        </div>
        <div
          v-if="disabled"
          class="input-wrapper"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '../../SvgIcon.vue'
export default {
  name: 'MyInput',
  props: {
    width: {
      type: [Number, String],
      default: 240
    },
    height: {
      type: [Number, String],
      default: 35
    },
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
      type: [String, Number, Boolean],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    maxlength: {
      type: [String, Number],
      default: 20
    }
  },
  components: {
    SvgIcon
  },
  emits: ['input'],
  data () {
    return {
      isFocus: false,
      isValue: false
    }
  },
  computed: {
    justStyle() {
      return {
        borderColor: (this.value !== null || this.value !== '') > 0 ? this.isFocus ? '#1DA9E0' : '#ccc' : '#FC9709',
        width: this.width ? (this.width * 1 + 34 * this.label.length) + 'px' : '240px',
        height: this.height ? this.height + 'px' : '34px'
      }
    },
    justInputStyle() {
      return {
        width: this.width ? (this.value !== null || this.value !== '') ? (this.width - 20) + 'px' : this.width + 'px' : '240px',
        height: this.height ? this.height - 4 + 'px' : '32px',
        fontSize: this.fontSize ? this.fontSize + 'px' : '14px'
      }
    },
    justLableStyle() {
      return {
        height: this.height ? this.height - 4 + 'px' : '32px',
        fontSize: this.fontSize ? this.fontSize + 'px' : '14px',
        lineHeight: this.height ? this.height - 4 + 'px' : '32px'
      }
    }
  },
  watch: {
    'value': {
      handler() {
        this.value.length > 0 || this.value !== '' ? this.isValue = true : this.isValue = false
      },
      deep: true
    }
  },
  mounted () {
    this.value.length > 0 || this.value !== '' ? this.isValue = true : this.isValue = false
  },
  methods: {
    handleInput(e) {
      // console.log(e.target.value)
      const newValue = e.target.value
      if (newValue.length <= this.maxlength) {
        this.$emit('input', newValue)
      }
      // this.$emit('input', e.target.value)
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
