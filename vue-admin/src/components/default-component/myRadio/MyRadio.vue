<template>
  <label
    class="one-radio"

    :class="{'is-checked':label == value}"
  >
    <span class="one-radio_input">
      <span class="one-radio_inner">
        <input
          v-model="model"
          style="display: none;"
          type="radio"
          class="one-radio_label"
          :value="label"
          :name="name"
        >
      </span>
    </span>
    <span class="one-radio_label">
      <slot></slot>
      <!-- 如果没有传值，就把label作为文本显示 -->
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
// 定义一个value属性,value值是接收到的label
export default {
  name: 'MyRadio',
  props: {
    label: {
      type: [String,Number],
      default: '0'
    },
    value: {
      type: [String,Number],
      default: ''
    },
    name: {
      type: [String,Number],
      default: ''
    }
  },
  data() {
    return {
    }
  },
  computed: {
    // 如果用双向绑定一个计算属性，必须提供一个get和set;需要写成一个对象
    model: {
      get() {
        // model的值是父组件传过来的value
        return this.value
      },
      set(value) {
        // 触发父组件给当前组件注册的input事件
        this.$emit('input', value)
      }
    }
  }
}
</script>

  <style lang="scss" scoped>
  @import './MyRadio.scss';
  </style>

