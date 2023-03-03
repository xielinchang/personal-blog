<template>
  <div class="counter">
    <div
      class="reduce"
      :class="props.minNum >= currentNum.value ? 'min' : ''"
      @click="reduceCount()"
    >
      <j-icon name="minus"></j-icon>
    </div>
    <span v-if="props.type == 'default'" class="number">{{ currentNum.value }}</span>
    <input @blur="judgeInput($event)" v-else type="text" v-model="currentNum.value" />
    <div class="add" :class="props.maxNum <= currentNum.value ? 'max' : ''" @click="addCount()">
      <j-icon name="plus"></j-icon>
    </div>
  </div>
</template>
<script setup lang="ts" name="">
  import { counterEvent } from './counter';
  import { reactive, onMounted } from 'vue';
  import jIcon from '../../icon';
  const props = defineProps(counterEvent.counterProps);
  const emit = defineEmits(counterEvent.counterEmit);
  const currentNum = reactive({
    value: Number as any,
  });
  onMounted(() => {
    currentNum.value = props.value;
  });
  const reduceCount = () => {
    if (currentNum.value >= props.minNum + 1) {
      currentNum.value--;
      emit('change-count', currentNum.value);
    }
  };
  const addCount = () => {
    if (currentNum.value < props.maxNum) {
      currentNum.value++;
      emit('change-count', currentNum.value);
    }
  };
  const judgeInput = (e: any) => {
    console.log(e.target.value);
    if (e.target.value <= props.minNum) {
      currentNum.value = props.minNum;
      emit('change-count', currentNum.value);
    } else if (e.target.value >= props.maxNum) {
      currentNum.value = props.maxNum;
      emit('change-count', currentNum.value);
    }
  };
</script>
<style lang="scss">
  @import './counter.scss';
</style>
