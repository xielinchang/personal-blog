<template>
  <div>
    <div
      class="select-group"
    >
      <my-select
        :options="options"
        :selected="selected"
        @change-select="changeSelect"
      ></my-select>
      <my-select
        :options="searchOptions"
        :selected="searchSelected"
        type="search"
        @change-select="changeSearchSelect"
      ></my-select>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RaioTest',
  data () {
    return {
      options: [{
        label: '苹果',
        value: '1'
      }, {
        label: '香蕉',
        value: '2'
      }, {
        label: '橘子',
        value: '3'
      }],
      selected: {
        label: '橘子',
        value: '3'
      },
      searchOptions: [{
        label: '2个橘子',
        value: '1'
      }, {
        label: '香蕉',
        value: '2'
      }, {
        label: '橘子',
        value: '3'
      }],
      searchSelected: {
        label: '橘子',
        value: '3'
      }
    }
  },
  methods: {
    changeSelect(label, value) {
      console.log(label, value)
      this.selected.label = label
      this.selected.value = value
    },
    changeSearchSelect(label, value) {
      this.searchSelected.label = label
      this.searchSelected.value = value
    }
  }
}
</script>
<style lang='scss' scoped>
.select-group{
    width: 100%;
    display: flex;
    justify-content: space-around;
}
</style>

