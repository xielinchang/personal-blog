<template>
  <div>
    <div class="btns">
      <my-button
        name="成功"
        icon="edit"
        type="success"
      ></my-button>
      <my-button
        name="警告"
        icon="edit"
        type="warning"
      ></my-button>
      <my-button
        name="信息"
        icon="edit"
        type="info"
      ></my-button>
      <my-button
        name="危险"
        icon="edit"
        icon-position="right"
        type="danger"
        plain
      ></my-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ButtonTest'
}
</script>
<style scoped>
  .btns{
      width: 80%;
      margin: 20px;
      margin-left: 10%;
      height: 60px;
      display: flex;
      justify-content: space-around;
  }
</style>
