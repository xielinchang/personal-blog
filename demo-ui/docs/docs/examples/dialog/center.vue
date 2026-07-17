<script lang="ts" setup>
import { ref } from 'vue';

const centerDialogVisible = ref(false);
</script>

<template>
  <div>
    <j-button text @click="centerDialogVisible = true"> 打开对话框 </j-button>
    <j-dialog
      v-if="centerDialogVisible"
      v-model="centerDialogVisible"
      title="Warning"
      width="30%"
      center
    >
      <span> 默认情况下，内容不会居中对齐 </span>
      <template #footer>
        <span class="dialog-footer">
          <j-button @click="centerDialogVisible = false">取消</j-button>
          <j-button type="primary" @click="centerDialogVisible = false"> 确认 </j-button>
        </span>
      </template>
    </j-dialog>
  </div>
</template>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
