<template>
  <footer :class="ns.namespace" :style="{ height }">
    <slot></slot>
  </footer>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { createNamespace } from "../../../assets/utils/components";

import type { CSSProperties } from 'vue'

defineOptions({
  name: 'JFooter',
})

const props = defineProps({
  /**
   * @description height of the footer
   */
  height: {
    type: String,
    default: "50px" ,
  },
})

const ns = createNamespace('footer')

</script>

<style lang="scss">
  @import "./footer.scss";
</style>
