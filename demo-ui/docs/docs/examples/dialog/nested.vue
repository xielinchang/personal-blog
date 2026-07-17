<script lang="ts" setup>
import { ref } from 'vue';

const outerVisible = ref(false);
const innerVisible = ref(false);
</script>

<template>
  <div>
    <j-button text @click="outerVisible = true">打开对话框</j-button>

    <j-dialog v-if="outerVisible" v-model="outerVisible" title="Outer Dialog">
      <j-dialog v-if="innerVisible" v-model="innerVisible" width="30%" title="jnner Dialog" />
      内容部分
      <template #footer>
        <div class="dialog-footer">
          <j-button @click="outerVisible = false">Cancel</j-button>
          <j-button type="primary" @click="innerVisible = true">打开内部对话框</j-button>
        </div>
      </template>
    </j-dialog>
  </div>
</template>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
