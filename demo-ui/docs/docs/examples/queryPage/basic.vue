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
      :page-size="pageSize"
      @change-page="changePage"
    ></j-query-page>
  </div>
</template>
