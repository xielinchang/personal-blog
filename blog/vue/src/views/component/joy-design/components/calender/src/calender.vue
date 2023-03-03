<script lang="ts" setup>
import days from './calender-days.vue'
import week from './calender-week.vue'
import Cheader from './calender-header.vue'


defineOptions({
  name: ' JCalender',
});
</script>

<template>
  <div class="calenderbox">
    <Cheader></Cheader>
    <week></week>
    <days></days>
  </div>
</template>


<style scoped lang="scss">
.calenderbox {
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 300px;
}
</style>