<script lang="ts" setup>
import { ref } from 'vue';
import jButton from '../../button';
import { defineEmits } from 'vue';
let emit = defineEmits(['submitinputcontent'])
const submit = (a) => {
  emit('submitinputcontent', a);
}
const props = defineProps({

  disable: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: "请输入内容"
  },
  type: {
    type: String,
    default: 'text'
  }

})
let inputcontent: any = ref('')
defineOptions({
  name: ' JInput',
});
</script>

<template>
  <input :disabled="props.disable" checked :type="props.type" :placeholder="props.placeholder" class="inputbox"
    v-model="inputcontent">
  <j-button type="primary" @click="submit(inputcontent)" style="height: 38px; margin-left: 10px;">确认</j-button>
</template>


<style scoped lang="scss">
.inputbox {
  height: 38px;
  border-radius: 5px;
  width: 240px;
  line-height: 38px;
  padding: 0 15px;
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  cursor: pointer;
  outline: none;

  &::placeholder {
    color: #cccccc;
  }

  &:focus {
    border-color:  #019aff;;
    // box-shadow: 0 0 3px skyblue;
  }

}
</style>