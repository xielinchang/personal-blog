<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { createNamespace } from '../../../assets/utils/components';

import type { Component, VNode } from 'vue'

defineOptions({
  name: 'JLayout',
})

const props = defineProps({
  /**
   * @description layout direction for child elements
   */
  direction: {
    type: String,
  },
})
const slots = useSlots()

const ns  = createNamespace('layout')

const isVertical = computed(() => {

  // 水平排列或者垂直排列
  if (props.direction === 'vertical') {
    return true
  } else if (props.direction === 'horizontal') {
    return false
  }

  if (slots && slots.default) {
    const vNodes: VNode[] = slots.default()
    return vNodes.some((vNode) => {
      const tag = (vNode.type as Component).name
      return tag === 'JHeader' || tag === 'JFooter'
    })
  } else {
    return false
  }
})
</script>

<template>
  <section :class="[ns.namespace, ns.is('vertical', isVertical)]">
    <slot></slot>
  </section>
</template>

<style lang="scss">
  @import "./layout.scss";
</style>
