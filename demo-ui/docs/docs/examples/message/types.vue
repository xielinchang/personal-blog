<script setup lang="ts">
// import { jMessage } from '@joy';
// import  { jMessage } from 'joyd-design';
import * as JoydDesign from 'joyd-design';
const { jMessage } = JoydDesign;


const open = (type: string) => {
  jMessage.default[type]('This is a message');
};
</script>

<template>
  <div>
    <j-button @click="open('info')">信息</j-button>
    <j-button type="success" @click="open('success')">成功</j-button>
    <j-button type="warning" @click="open('warning')">警告</j-button>
    <j-button type="error" @click="open('error')">错误</j-button>
    <j-button type="primary" @click="open('loading')">加载中</j-button>
  </div>
</template>
