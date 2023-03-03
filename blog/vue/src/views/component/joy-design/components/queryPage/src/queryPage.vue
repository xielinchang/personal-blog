<template>
  <div
    class="query-page"
    v-show="props.isOneShow === true ? (pageTotal === 1 ? false : true) : true"
  >
    <!-- 显示总页数 -->
    <div
      class="total-page"
      :style="{
        /* 与分页器对齐 */
        marginTop: props.itemStyle.height - 22 + 'px',
      }"
      v-show="props.totalShow == true"
    >
      共
      {{ props.total }}
      条
    </div>
    <!-- 选择一页所展示的条目 -->
    <div class="page-size" v-show="props.sizeOptions.length > 0">
      <j-select
        :options="props.sizeOptions"
        :selected="selectedValue"
        @change-select="changeSelect"
        :width="100"
        :height="30"
        style="margin: 0 10px"
      ></j-select>
    </div>
    <!-- 上一页 -->
    <div class="query-btn" :style="btnStyle()" @click="prevEvent"
      ><j-icon name="arrow-left" :color="props.btnStyle.color"></j-icon
    ></div>
    <div
      v-for="(item, index) in pageList"
      :key="index"
      class="page-mian-item"
      :style="justStlye(item, index)"
      @click="itemEvent(item, index)"
      :class="props.hoverShow ? (item == '...' ? 'hover-item' : '') : ''"
      :data-title="item == '...' ? (index < props.pageCount / 2 ? '向前五页' : '向后五页') : ''"
    >
      {{ item }}
    </div>
    <!-- 下一页 -->
    <div class="query-btn" :style="btnStyle()" @click="nextEvent"
      ><j-icon name="arrow-right" :color="props.btnStyle.color"></j-icon
    ></div>
    <!-- 跳转至第几页 -->
    <div
      class="to-page"
      :style="{
        /* 与分页器对齐 */
        marginTop: props.itemStyle.height - 22 + 'px',
      }"
      v-show="props.jumperShow == true"
    >
      <span>前往</span>
      <input
        type="text"
        @blur="handleAddNumber(toNumber)"
        v-model="toNumber"
        @keyup.enter.native="handleAddNumber(toNumber)"
      />
      <span>页</span>
    </div>
  </div>
</template>
<script setup lang="ts" name="">
  import { queryPageEvent } from './queryPage';
  import { ref, watch, computed } from 'vue';
  import { createNamespace } from '../../../assets/utils/components';
  import JSelect from '../../select';
  import JIcon from '../../icon';
  const props = defineProps(queryPageEvent.queryPageProps);
  const emit = defineEmits(queryPageEvent.queryPageEmit);
  // 选择一页的条目数
  const selectedValue = ref({
    label: '',
    value: 0,
  });
  if (props.sizeOptions.length > 0) {
    selectedValue.value.label = props.sizeOptions[0].label;
    selectedValue.value.value = props.sizeOptions[0].value;
    emit('change-page-size', selectedValue.value.value);
  }
  const changeSelect = (label: string, value: number) => {
    selectedValue.value.label = label;
    selectedValue.value.value = value;
    emit('change-page-size', value);
  };
  // 监听总的页数随页面大小变化
  const pageTotal = ref(Math.ceil(props.total / props.pageSize));
  watch(
    () => props.pageSize,
    (newValue, oldValue) => {
      pageTotal.value = Math.ceil(props.total / newValue);
    },
  );
  // 生成一个分页数组
  const pageList = computed(() => {
    // 总的页数数组
    const list = [];
    for (let i = 1; i <= pageTotal.value; i++) {
      list.push(i);
    }
    // 展示的页数数组
    if (props.pageCount < list.length) {
      // 计算分页按钮总数的中间位置
      const center = Math.ceil(props.pageCount / 2);
      // 当前页处于靠近首页的位置
      if (props.currentPage >= 1 && props.currentPage <= center) {
        const firstList = [];
        if (props.pageCount == 1) {
          firstList.push(1);
        } else {
          for (let i = 0; i <= props.pageCount; i++) {
            if (i < props.pageCount - 1) {
              firstList.push(1 + i);
            } else if (i == props.pageCount - 1) {
              firstList.push('...');
            } else {
              firstList.push(pageTotal.value);
            }
          }
        }
        return firstList;
      } else if (
        props.currentPage <= pageTotal.value &&
        props.currentPage >= pageTotal.value - center + 1
      ) {
        // 当前页处于靠近尾页的位置
        const firstList = [];
        if (props.pageCount == 1) {
          firstList.push(pageTotal.value);
        } else {
          for (let i = props.pageCount; props.pageCount >= i && i >= 0; i--) {
            if (i > props.pageCount - 1) {
              firstList.push(1);
            } else if (i == props.pageCount - 1) {
              firstList.push('...');
            } else {
              firstList.push(pageTotal.value - i);
            }
          }
        }
        return firstList;
      } else {
        // 当前页处于中间页的位置
        const firstList = [];
        firstList.push(1);
        firstList.push('...');
        const justCenter = Math.ceil((props.pageCount - 2) / 2);
        for (let i = 1; i <= props.pageCount - 2; i++) {
          if (i < justCenter) {
            firstList.push(props.currentPage - (justCenter - i));
          } else if (i == justCenter) {
            firstList.push(props.currentPage);
          } else {
            firstList.push(props.currentPage + (i - justCenter));
          }
        }
        firstList.push('...');
        firstList.push(pageTotal.value);
        return firstList;
      }
    } else {
      return list;
    }
  });
  // 分页元素的按钮状态
  const justStlye = computed(() => {
    return (item: any, index: number) => {
      return {
        // 元素的宽度
        width: props.itemStyle.width == null ? '27px' : props.itemStyle.width + 'px',
        // 元素的高度
        height: props.itemStyle.height == null ? '27px' : props.itemStyle.height + 'px',
        // 元素的圆角
        borderRadius:
          props.itemStyle.borderRadius == null ? '4px' : props.itemStyle.borderRadius + 'px',
        // 元素的边框宽度
        borderWidth:
          props.itemStyle.borderWidth == null ? '1px' : props.itemStyle.borderWidth + 'px',
        // 元素的边框线条样式
        borderStyle: props.itemStyle.borderStyle == null ? 'solid' : props.itemStyle.borderStyle,
        // 元素的边框颜色
        borderColor:
          item === props.currentPage
            ? props.itemStyle.borderActiveColor == null
              ? '#FF6000'
              : props.itemStyle.borderActiveColor
            : props.itemStyle.borderDefaultColor == null
            ? '#fff'
            : props.itemStyle.borderDefaultColor,
        // 元素的背景颜色
        backgroundColor:
          item === props.currentPage
            ? props.itemStyle.backgroundActiveColor == null
              ? '#FF6000'
              : props.itemStyle.backgroundActiveColor
            : props.itemStyle.backgroundColor == null
            ? '#ffffff'
            : props.itemStyle.backgroundColor,
        // 元素的字体颜色
        color:
          item === props.currentPage
            ? props.itemStyle.activeColor == null
              ? '#ffffff'
              : props.itemStyle.activeColor
            : props.itemStyle.defaultColor == null
            ? '#666666'
            : props.itemStyle.defaultColor,
        // 元素的行高
        lineHeight: props.itemStyle.height == null ? '27px' : props.itemStyle.height + 'px',
        // 元素的字体大小
        fontSize: props.itemStyle.fontSize == null ? '14px' : props.itemStyle.fontSize[0] + 'px',
        // 元素的粗细
        fontWeight: props.itemStyle.fontSize == null ? 500 : props.itemStyle.fontSize[1],
        // 元素的间距
        marginRight:
          props.itemStyle.marginRight == null ? '12px' : props.itemStyle.marginRight + 'px',
      };
    };
  });
  const btnStyle = () => {
    return {
      display:
        props.chooseShow && props.currentPage == Math.ceil(props.total / props.pageSize)
          ? 'none'
          : 'block',
      width: props.itemStyle.width == null ? '27px' : props.itemStyle.width + 'px',
      height: props.itemStyle.height == null ? '27px' : props.itemStyle.height + 'px',
      lineHeight: props.itemStyle.height == null ? '24px' : props.itemStyle.height + 3 + 'px',
      background: props.btnStyle.background == null ? '#FD8C01 ' : props.btnStyle.background,
    };
  };
  // 上一页
  const prevEvent = () => {
    /* 函数名要对应，要完全相同，'-'和驼峰不能相等 */
    if (props.currentPage > 1) {
      emit('change-page', props.currentPage - 1);
    }
  };
  // 下一页
  const nextEvent = () => {
    if (props.currentPage < pageTotal.value) {
      emit('change-page', props.currentPage + 1);
    }
  };
  // 点击某一页
  const itemEvent = (item: any, index: number) => {
    // 按钮的中间数
    let center = Math.ceil((props.pageCount + 1) / 2);
    if (item !== '...' && item !== props.currentPage) {
      emit('change-page', item);
    } else if (item === '...') {
      if (index + 1 <= center) {
        if (props.currentPage <= 5) {
          emit('change-page', 1);
        } else {
          emit('change-page', props.currentPage - 5);
        }
      } else {
        if (pageTotal.value - props.currentPage <= 5) {
          emit('change-page', pageTotal.value);
        } else {
          emit('change-page', props.currentPage + 5);
        }
      }
    }
  };
  // 到第几页
  const toNumber = 1;
  const handleAddNumber = (toNumber: number) => {
    // 总的页数
    if (toNumber <= 0) {
      toNumber = 1;
      emit('change-page', 1);
    } else if (toNumber > pageTotal.value) {
      toNumber = pageTotal.value;
      emit('change-page', pageTotal.value);
    } else {
      emit('change-page', Number(toNumber));
    }
  };
  defineOptions({
    name: 'JQueryPage',
  });
  const ns = createNamespace('query-page');
</script>
<style lang="scss">
  @import './queryPage.scss';
</style>
