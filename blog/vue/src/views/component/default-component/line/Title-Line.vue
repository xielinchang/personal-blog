<template>
  <div>
    <div class="tit-line-name">{{ name }}</div>
    <div class="tit-line block"></div>
  </div>
</template>

<script>
export default {
  name: 'TitleLine',
  props: ['name']
}
</script>

<style>
.block {
  border-radius: 20px;
  background: #D8E0EA;
}
.tit-line{
    width: 90%;
    margin-left: 5%;
    height: 1px;
    border-radius: 30px;
}
.tit-line-name{
    font-size: 14px;
    font-family: YouYuan;
    font-weight: 600;
    color: rgb(126, 127, 128);
}

</style>
