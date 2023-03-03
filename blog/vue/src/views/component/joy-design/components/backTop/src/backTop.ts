import type { Prop, PropType } from 'vue';
export const backTopProp = {
  color: {
    type: String,
    default: '#409EFF',
  },
  type: {
    type: String as PropType<'round' | 'default'>,
    default: 'default',
  },
  direction: {
    type: String as PropType<'left' | 'right'>,
    default: 'right',
  },
};
