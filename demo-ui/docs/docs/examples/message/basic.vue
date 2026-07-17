<script setup lang="ts">
// import { jMessage } from '@joy';
// import { jMessage } from 'joyd-demo';

import * as JoydDesign from 'joyd-design';
const { jMessage } = JoydDesign;

const open = () => {
  jMessage.default({ duration: 1000, content: 'This is a message' });
};
</script>

<template>
  <j-button @click="open()">信息</j-button>
</template>
