<template>
  <main :class="ns.namespace">
    <slot></slot>
  </main>
</template>
<script setup lang="ts" >
import { createNamespace } from "../../../assets/utils/components";

defineOptions({
  name: 'JMain',
})

const ns = createNamespace('content')
</script>

<style lang="scss">
  @import "./content.scss";
</style>