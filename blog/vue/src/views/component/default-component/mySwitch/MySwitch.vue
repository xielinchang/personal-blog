<template>
  <div>
    <div
      class="wrap"
      :style="{ backgroundColor: type.bgcolor }"
      @click="wrap"
    >
      <div
        class="wrap-btn"
        :style="{
          backgroundColor: type.btncolor,
          transform: `translateX(${type.btnlocation}px)`,
        }"
      >
        <svg-icon
          :icon-name="type.icon"
          :color="type.bgcolor"
          size="24px"
          alt=""
        />
      </div>
      <div
        class="wrap-title"
        :style="{
          transform: `translateX(${type.namelocation}px)`,
          color: type.color,
        }"
      >
        {{ type.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MySwitch',
  emits: ['change'],
  data () {
    return {
      value: true,
      type: {
        bgcolor: '#03c0f4',
        btncolor: '',
        icon: 'book',
        title: '文 章',
        btnlocation: 0,
        namelocation: 0,
        color: '#fff'
      }
    }
  },
  methods: {
    judgeType() {
      var that = this
      if (this.value) {
        this.type.bgcolor = '#03c0f4'
        this.type.btncolor = '#fff'
        this.type.color = '#fff'
        this.type.icon = 'book'
        this.type.title = '文 章'
        this.type.btnlocation = 0
        this.type.namelocation = 0
      } else {
        this.type.bgcolor = '#fff'
        this.type.btncolor = '#03c0f4'
        this.type.color = '#03c0f9'
        this.type.icon = 'pen'
        this.type.title = '随 笔'
        this.type.btnlocation = 60
        this.type.namelocation = -30
      }
    },
    wrap() {
      if (this.value) {
        this.value = false
      } else {
        this.value = true
      }
      this.$emit('change', this.value)
      this.judgeType()
    }
  }
}
</script>

<style lang="scss" scpoed>
 .wrap {
      width: 100px;
      height: 40px;
      border-radius: 60px;
      background: #03c0f4;
      margin-left: 50px;
      position: relative;
      box-shadow: 0 1px rgb(255 255 255 / 50%), 0 8px 13px rgb(0 0 0 / 15%) inset;
      .wrap-btn {
        width: 34px;
        height: 34px;
        position: absolute;
        left: 3px;
        top: 3px;
        border-radius: 50%;
        background: white;
        transition: 800ms;
        box-shadow: 0 1px rgb(255 255 255 / 50%),
          0 8px 13px rgb(0 0 0 / 15%) inset;

        & svg {
          width: 25px;
          height: 25px;
          margin: 4px;
          margin-left: 4px;
        }
      }
      .wrap-title {
        width: 50px;
        height: 30px;
        position: absolute;
        right: 10px;
        top: 5px;
        text-align: center;
        text-shadow: 0 1px rgb(255 255 255 / 50%);
        line-height: 30px;
        color: #fb61f6;
        font-size: 18px;
        font-weight: 500;
        transition: 800ms;
      }
    }
</style>
