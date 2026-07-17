<script lang="ts" setup>
import { ref } from 'vue';

const dialogVisible = ref(false);
const handleClick = () => {
  dialogVisible.value = true;
};

const handleClose = (done: () => void) => {
  // dialogVisible.value = false
  confirm('确认关闭？') && done();
};
</script>

<template>
  <div>
    <j-button text @click="handleClick"> 打开对话框 </j-button>
    <j-dialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      title="标题"
      width="30%"
      :before-close="handleClose"
    >
      <span>消息内容</span>
      <template #footer>
        <span class="dialog-footer">
          <j-button @click="dialogVisible = false">取消</j-button>
          <j-button type="primary" @click="dialogVisible = false"> 确认 </j-button>
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
