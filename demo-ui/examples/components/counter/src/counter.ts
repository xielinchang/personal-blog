import type { Prop, PropType } from 'vue';
export const counterEvent = {
  counterProps: {
    // 绑定的当前数字
    value: {
      type: Number,
      default: 1,
    },
    // 最小数值
    minNum: {
      type: Number,
      default: 1,
    },
    // 最大数值
    maxNum: {
      type: Number,
      default: 999,
    },
    // 类型，分可输入和默认
    type: {
      type: String as PropType<'input' | 'default'>,
      default: 'default',
    },
  },
  counterEmit: ['change-count'],
};
