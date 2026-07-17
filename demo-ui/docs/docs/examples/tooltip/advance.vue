<template>
  <j-tooltip :disabled="disabled" content="点击关闭提示框" placement="bottom" transition-name="myComponent">
    <j-button @click="disabled = !disabled"
      >点击 {{ disabled ? '开启' : '关闭' }} 提示功能</j-button
    >
  </j-tooltip>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const disabled = ref(false);
</script>

<style>
  .myComponent-enter-active {
    transition: all 0.3s ease;
  }
  .myComponent-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .myComponent-enter-from,
  .myComponent-leave-active {
    margin-left: 20px;
    opacity: 0;
  }
</style>
