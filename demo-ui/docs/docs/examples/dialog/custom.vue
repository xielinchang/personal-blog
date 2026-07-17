<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const handleClose = (done: () => void) => {
  // dialogVisible.value = false
  confirm('确认关闭？') && done();
};
</script>

<template>
  <div>
    <j-button text @click="visible = true"> 打开自定义头部对话框 </j-button>
    <j-dialog v-if="visible" v-model="visible" :show-close="false" :before-close="handleClose">
      <template #header="{ close }">
        <div class="my-header">
          <h4>自定义头部</h4>
          <j-button type="danger" @click="close">
            <j-icon class="j-icon--left" name="circle-close-filled"></j-icon>
            关闭
          </j-button>
        </div>
      </template>
      内容部分
      <template #footer>
        <span class="dialog-footer">
          <j-button @click="visible = false">取消</j-button>
          <j-button type="primary" @click="visible = false"> 确认 </j-button>
        </span>
      </template>
    </j-dialog>
  </div>
</template>

<style scoped>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
