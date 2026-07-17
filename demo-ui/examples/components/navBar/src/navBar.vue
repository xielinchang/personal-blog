<template>
  <div class="nav-box" :style="{ width: width }">
    <div @click="clickLeft" class="left" :style="{ color: leftColor, '--left-color': leftColor }">
      <j-icon name="arrow-left" v-if="leftArrow"></j-icon>
      <slot name="left" />
      <div>
        <a :style="{ color: leftColor, '--left-color': leftColor }">{{ props.leftText }}</a></div
      >
    </div>
    <div>{{ props.title }}</div>
    <div @click="clickRight" :style="{ color: rightColor }" class="right">
      {{ props.rightText }}
      <span style="padding-top: 3px"><slot name="right" /></span>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import jIcon from '../../icon';
  import { createNamespace } from '../../../assets/utils/components';
  const emit = defineEmits(['clickLeft', 'clickRight']);
  const props = defineProps({
    title: { default: ' ', type: String },
    width: { default: '200px', type: String },
    leftText: { default: ' ', type: String },
    leftColor: { default: 'skyblue', type: String },
    rightColor: { default: 'red', type: String },
    rightText: { default: '', type: String },
    leftArrow: { default: false, type: Boolean },
  });

  const clickLeft = () => {
    emit('clickLeft');
  };
  const clickRight = () => {
    emit('clickRight');
  };
  // const ns = createNamespace('nav-bar');

  defineOptions({
    name: 'JNavBar',
  });
</script>

<style lang="scss" scoped>
  // @import './navBar.scss';
  * {
    padding: 0;
    margin: 0;
  }

  .nav-box {
    width: 200px;
    margin: 0 50px;
    display: flex;
    justify-content: space-between;
    .left,
    .right {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      align-content: center;
    }
    div {
      &:active {
        color: var('--left-color');
        opacity: 0.7;
      }
    }
  }
</style>
