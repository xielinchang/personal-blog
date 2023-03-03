<template>
  <div class="select-container">
    <div
      ref="box"
      :class="openFlag.valueOf() ? 'selecting' : 'select'"
      @click="openOptions()"
      :style="{ width: props.width + 'px', height: props.height + 'px' }"
    >
      <!-- 输入框 -->
      <div class="select-content">
        <!-- 默认下拉选择框 -->
        <input
          type="text"
          v-if="props.type != 'search'"
          v-model="props.selected.label"
          disabled
          :placeholder="props.placeholder"
        />
        <!-- 可搜索选择框 -->
        <input
          v-else
          type="text"
          v-model="props.selected.label"
          @input="searchOptions($event)"
          :placeholder="props.placeholder"
        />
      </div>
      <div
        class="select-arrow"
        :style="{
          lineHeight: props.height + 2 + 'px',
        }"
      >
        <j-icon
          :class="openFlag.valueOf() ? 'up' : 'down'"
          name="arrow-down"
          color="#cccccc"
          size="13px"
        ></j-icon>
      </div>
    </div>
    <div
      class="select-options"
      :style="{ width: props.width + 'px' }"
      :class="openFlag.valueOf() ? '' : 'select-options-close'"
    >
      <div class="select-options-icon"> </div>
      <div
        :style="{
          color: props.selected.label === item.label ? '#21A0FF' : '',
          // fontWeight不兼容
          // fontWeight: props.selected.label === item.label ? 700 : '',
        }"
        class="options-item"
        v-for="(item, index) in data.itemList"
        :key="index"
        @click="selectValue(item)"
        >{{ item.label }}
      </div>
      <div v-show="data.itemList.length == 0" class="options-null">无匹配数据</div>
    </div>
  </div>
</template>
<script setup lang="ts" name="">
  import { selectEvent } from './select';
  import { ref, nextTick, watch, onMounted, reactive } from 'vue';
  import { createNamespace } from '../../../assets/utils/components';
  import jIcon from '../../icon';
  const props = defineProps(selectEvent.selectProps);
  const emit = defineEmits(selectEvent.selectEmit);
  // 判断选项是否打开
  const openFlag = ref(false);
  // 打开或关闭选项框
  const openOptions = () => {
    openFlag.value = !openFlag.value;
  };
  // 初始化数据
  const data = reactive({
    itemList: [] as any,
  });
  onMounted(() => {
    data.itemList = props.options;
    if (props.type == 'search') {
      filterData(props.selected.label);
    }
  });
  // 选择选项
  const selectValue = (item: any) => {
    emit('change-select', item.label, item.value);
    openOptions();
  };
  const box = ref();
  // 点击其他地方时关闭选项框
  // 因为还没挂载,所以需要延迟使用,不然获取不到元素
  nextTick(() => {
    document.addEventListener('click', (e) => {
      if (!box.value.contains(e.target) && openFlag.value == true) {
        openOptions();
      }
    });
  });
  // 输入时改变被选中的值
  const searchOptions = (e: any) => {
    openFlag.value = true;
    emit('change-select', e.target.value);
  };
  const filterData = (value: string) => {
    data.itemList = props.options.filter((item: any) => {
      return item.label.toLowerCase().includes(value.toLowerCase());
    });
  };
  // 监听被选中的值，过滤掉不符合的选项
  watch(
    () => {
      return props.selected.label;
    },
    (value: any) => {
      if (props.type == 'search') {
        filterData(value);
      }
    },
  );
  const ns = createNamespace('select');

  defineOptions({
    name: 'JSelect',
  });
</script>
<style lang="scss">
  @import './select.scss';
</style>
