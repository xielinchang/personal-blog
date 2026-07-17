<script setup lang="ts">
// import { computed } from 'vue'
import { createNamespace } from '../../../assets/utils/components';

// import type { CSSProperties } from 'vue'
// import { type } from 'os';

defineOptions({
  name: 'JHeader',
})

const props = defineProps({
  /**
   * @description height of the header
   */
  height: {
    type: String,
    default: '50px',
  },
})

const ns = createNamespace('header')

</script>

<template>
  <header :class="ns.namespace" :style="{ height }">
    <slot></slot>
  </header>
</template>

<style lang="scss">
  @import "./header.scss";
</style>