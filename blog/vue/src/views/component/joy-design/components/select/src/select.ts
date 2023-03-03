export const selectEvent = {
  selectProps: {
    // 被选中的选项
    selected: {
      type: Object as any,
      default: {
        label: {
          type: String,
          default: '',
        },
        value: {
          type: [String, Number],
          default: '',
        },
      },
      required: true,
    },
    // 所有选项
    options: {
      // 解决报item类型错误
      type: Array as any,
      default: [
        {
          label: {
            type: String,
            default: '',
          },
          value: {
            type: [String, Number],
            default: null,
          },
        },
      ],
    },
    width: {
      type: Number,
      default: 240,
    },
    height: {
      type: Number,
      default: 38,
    },
    // 搜索框类型，默认下拉选择框，search为搜索选择框
    type: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
  },
  selectEmit: ['change-select'],
};
