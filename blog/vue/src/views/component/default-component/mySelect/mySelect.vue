<template>
  <div
    class="select-container"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <div
      ref="box"
      :class="openFlag.valueOf() ? 'selecting' : 'select'"

      @click="openOptions()"
    >
      <!-- 输入框 -->
      <div class="select-content">
        <!-- 默认下拉选择框 -->
        <input
          v-if="type != 'search'"
          v-model="selected.label"
          type="text"
          disabled
          :placeholder="placeholder"
        />
        <!-- 可搜索选择框 -->
        <input
          v-else
          v-model="selected.label"
          type="text"
          :placeholder="placeholder"
          @input="searchOptions($event)"
        />
      </div>
      <div
        class="select-arrow"
        :style="{
          lineHeight: height + 'px',
        }"
      >
        <svg-icon
          :class="openFlag.valueOf() ? 'up' : 'down'"
          icon-name="arrow-down"
          color="#cccccc"
          size="13px"
        ></svg-icon>
      </div>
    </div>
    <div
      class="select-options"
      :style="{ width: width + 'px' }"
      :class="openFlag.valueOf() ? '' : 'select-options-close'"
    >
      <div class="select-options-icon"> </div>
      <div
        v-for="(item, index) in options"
        :key="index"
        :style="{
          color: selected.label === item.label ? '#21A0FF' : '',
          // fontWeight不兼容
          // fontWeight: selected.label === item.label ? 700 : '',
        }"
        class="options-item"
        @click="selectValue(item)"
      >{{ item.label }}
      </div>
      <div
        v-show="options.length == 0"
        class="options-null"
      >无匹配数据</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MySelect',
  props: {
    selected: {
      type: Object,
      default: () => {
        return {
          label: '',
          value: ''
        }
      },
      required: true
    },
    // 所有选项
    options: {
      type: Array,
      default: () => [
        {
          label: {
            type: String,
            default: ''
          },
          value: {
            type: [String, Number],
            default: null
          }
        }
      ]
    },
    width: {
      type: Number,
      default: 240
    },
    height: {
      type: Number,
      default: 38
    },
    // 搜索框类型，默认下拉选择框，search为搜索选择框
    type: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  emits: ['change-select'],
  data () {
    return {
      openFlag: false,
      data: {
        itemList: []
      }
    }
  },
  watch: {
    'selected.label'(value) {
      if (this.type === 'search') {
        this.filterData(value)
      }
    }
  },
  mounted () {
    if (this.type === 'search') {
      this.filterData(this.selected.label)
    }
    document.addEventListener('click', (e) => {
      if (!this.$refs.box.contains(e.target) && this.openFlag === true) {
        this.openOptions()
      }
    })
  },
  methods: {
    openOptions() {
      this.openFlag = !this.openFlag
    },
    selectValue (item) {
      this.$emit('change-select', item.label, item.value)
      this.openOptions()
    },
    filterData(value) {
      this.data.itemList = this.options.filter((item) => {
        return item.label.toLowerCase().includes(value.toLowerCase())
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './mySelect.scss';
</style>
