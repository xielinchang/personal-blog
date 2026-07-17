<template>
    <div class="tab-item" v-show="show">
        <slot />
    </div>
</template>
<script setup lang="ts">
import jTab from './TabBar.vue'
import { getCurrentInstance, onMounted, inject, ref, watch, computed, reactive } from 'vue'
const instance = getCurrentInstance()
const tabIndex = instance?.parent?.props?.curActive
const temps = inject('temps')

onMounted(() => {
    if (props.name == tabIndex) { show.value = true }
    else { show.value = false }
})
//tabs组件告诉目前哪一个是高亮的
const show = ref(false)
const navData = inject('navData')
watch(() => navData.name, () => {
    if (props.name == navData.name) { show.value = true }
    else { show.value = false }
})

const props = defineProps({
    label:  String,
    name:  [String, Number],
    disabled: {
        default:false,
        type:Boolean
    }
})
defineOptions({
    name: 'JTabItem',
  });
</script>


<style lang="scss" scoped>

</style>