<template>
  <div
    class="back-top"
    :class="props.direction"
    :style="{ display: btnShow, borderRadius: props.type == 'round' ? '50%' : '4px' }"
    @click="backTop()"
  >
    <j-icon name="caret-top" size="20px" :color="props.color"></j-icon>
  </div>
</template>
<script setup lang="ts" name="">
  import jIcon from '../../icon';
  import { backTopProp } from './backTop';
  import { onMounted, ref } from 'vue';
  const props = defineProps(backTopProp);
  const btnShow = ref('none');
  const onScroll = () => {
    if (document.documentElement.scrollTop > 50 || document.body.scrollTop > 50) {
      btnShow.value = 'block';
    } else {
      btnShow.value = 'none';
    }
  };
  onMounted(() => {
    console.log(props.direction);

    window.addEventListener('scroll', onScroll);
  });
  const backTop = () => {
    const timer = setInterval(function () {
      const backTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      const speedTop = backTop / 10;
      document.documentElement.scrollTop = backTop - speedTop;
      if (backTop <= 10) {
        clearInterval(timer);
      }
    }, 10);
  };
</script>
<style lang="scss" scoped>
  @import './backTop.scss';
</style>
