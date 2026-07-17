<script lang="ts" setup>
import { ref } from 'vue';

const dialogVisible = ref(false);
</script>

<template>
  <div>
    <j-button text @click="dialogVisible = true">打开对话框</j-button>

    <j-dialog v-if="dialogVisible" v-model="dialogVisible" title="标题" width="30%" draggable>
      <span>这是一个可拖拽的对话框</span>
      <template #footer>
        <span class="dialog-footer">
          <j-button @click="dialogVisible = false">取消</j-button>
          <j-button type="primary" @click="dialogVisible = false">确认</j-button>
        </span>
      </template>
    </j-dialog>
  </div>
</template>
