<script setup lang="ts" name="">
  import { ref } from 'vue';
  const currentPage = ref(1);
  const changePage = (val: number) => {
    currentPage.value = val;
  };
  const pageSize = ref(5);
</script>
<template>
  <div>
    <j-query-page
      style="width=100%"
      :page-count="5"
      :current-page="currentPage"
      :total="100"
      :item-style="{
        width: 30,
        height: 30,
        borderDefaultColor: '#fff',
        borderActiveColor: '#ada',
        defaultColor: '#fff',
        activeColor: '#FD8C01',
        fontSize: [18, 600],
        backgroundActiveColor: '#56C1FE',
        backgroundColor: '#56C1FD',
      }"
      :btn-style="{
        color: '#fff',
        background: '#51CAF3',
      }"
      :page-size="pageSize"
      @change-page="changePage"
    ></j-query-page>
  </div>
</template>
