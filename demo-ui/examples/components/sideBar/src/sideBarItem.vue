<template>
    <div class="tab-item">
        <slot />
    </div>
</template>
<script setup lang="ts">
import { onMounted, inject, ref, watch, computed, reactive } from 'vue'
const currentActive = inject('currentActive')
watch(() => currentActive, () => {
    console.log('变化啦')
console.log(currentActive)
})

const props = defineProps({
    title:  [String, Number],
    disabled: {
        default:false,
        type:Boolean
    }
})

defineOptions({
    name: 'JSideBarItem',
  });
</script>


<style lang="scss" scoped>

</style>