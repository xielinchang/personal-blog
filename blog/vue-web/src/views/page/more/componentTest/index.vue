<template>
  <div class="component-test">
    <TemplatePage></TemplatePage>
    <div class="component-box block">
      <div class="block">
        <button-test></button-test>
      </div>
      <div class="block">
        <input-test></input-test>
      </div>
      <div class="block">
        <textarea-test></textarea-test>
      </div>
      <div class="block">
        <tags-test></tags-test>
      </div>
      <div class="block">
        <upload-test></upload-test>
      </div>
      <div class="block">
        <radio-test></radio-test>
      </div>
      <div class="block">
        <select-test></select-test>
      </div>
      <div class="block">
        <icon-button-test></icon-button-test>
      </div>
      <div class="block">
        <msg-test></msg-test>
      </div>
      <div class="block">
        <msg-box-test></msg-box-test>
      </div>
      <div class="block">
        <svg-test></svg-test>
      </div>
    </div>

  </div>
</template>
<script>
import './component/index.js'
export default {
  name: 'ComponentTest',
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>
<style lang='scss' scoped>
@import './index.scss'
</style>
