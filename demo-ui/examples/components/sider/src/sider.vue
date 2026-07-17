<template>
  <aside :class="ns.namespace" :style="{ width }">
    <slot></slot>
  </aside>
</template>
<script setup lang="ts">
import { computed } from 'vue'
// import { useNamespace } from '@element-plus/hooks'
import { createNamespace } from "../../../assets/utils/components";

import type { CSSProperties } from 'vue'

defineOptions({
  name: 'JSider',
})

const props = defineProps({
  /**
   * @description width of the side section
   */
  width: {
    type: String,
    default: '200px',
  },
})

const ns = createNamespace('sider')
// const style = computed(
//   () =>
//     (props.width ? ns.cssVarBlock({ width: props.width }) : {}) as CSSProperties
// )
</script>

<style lang="scss">
  @import "./sider.scss";
</style>