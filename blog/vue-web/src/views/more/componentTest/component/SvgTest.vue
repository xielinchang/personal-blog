<template>
  <div>
    <div class="svg-group">
      <div
        v-for="(item,index) in iconList"
        :key="index"
        class="svg-item"
      >
        <svg-icon
          :title="item"
          :icon-name="item"
          size="24px"
        ></svg-icon>
      </div>
    </div>
  </div>
</template>
<script>
import '@/assets/scss/main.scss'
export default {
  name: 'SvgTest',
  data () {
    return {
      iconList: []
    }
  },
  mounted () {
    const requireAll = requireContext => requireContext.keys().map(requireContext)
    // map传入一个函数，遍历数组中的每个对象，被webpack自动进行导入
    // eslint-disable-next-line
    const req = require.context('@/components/default-component/SvgIcon/icons', true, /\.svg$/)
    // 图标的id由icon-前缀和名字组成
    const prefix = 'icon-'
    requireAll(req).forEach(element => {
      var item = element.default.id.slice(prefix.length)
      this.iconList.push(item)
    })
  }
}
</script>
<style lang='scss' scoped>
.svg-group{
    display: flex;
    flex-wrap: wrap;
    .svg-item{
        width: 50px;
        height: 50px;
    }
}
</style>
