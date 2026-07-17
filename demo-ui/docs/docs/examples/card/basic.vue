<template>
  <j-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Card name</span>
        <j-button class="button" text>Operation button</j-button>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </j-card>
</template>

<style>
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    width: 480px;
  }
</style>
