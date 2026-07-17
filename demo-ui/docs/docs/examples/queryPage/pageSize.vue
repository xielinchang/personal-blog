<script setup lang="ts" name="">
  import { ref } from 'vue';
  const currentPage = ref(1);
  const changePage = (val: number) => {
    currentPage.value = val;
  };
  const changePageSize = (val: number) => {
    pageSize.value = val;
  };
  const sizeOptions = [
    { label: '5条/页', value: 5 },
    { label: '10条/页', value: 10 },
    { label: '20条/页', value: 20 },
  ];
  const pageSize = ref(5);
</script>
<template>
  <div>
    <j-query-page
      style="width=100%"
      :page-count="5"
      :current-page="currentPage"
      :total="100"
      :page-size="pageSize"
      :size-options="sizeOptions"
      @change-page="changePage"
      @change-page-size="changePageSize"
    ></j-query-page>
  </div>
</template>
