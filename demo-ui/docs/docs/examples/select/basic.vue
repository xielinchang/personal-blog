<template>
  <div>
    <j-select :options="options" :selected="selectedValue" @change-select="changeSelect"> </j-select
  ></div>
</template>
<script setup lang="ts" name="">
  import { ref } from 'vue';
  const selectedValue = ref({ label: '苹果', value: 1 });
  const changeSelect = (label: string, value: any) => {
    selectedValue.value.label = label;
    selectedValue.value.value = value;
  };
  const options = [
    { label: '苹果', value: 1 },
    { label: '香蕉', value: 2 },
    { label: 'abc', value: 3 },
    { label: '123', value: 4 },
    { label: 'abc123', value: 5 },
  ];
</script>
<style></style>
