<template>
  <div
    class="back-top"
    :style="{transform:`translateY(${back}px)`,'transition':'310ms'}"
    @click="backtop"
  >
    <img
      src="../../../assets/images/章鱼猫.png"
      alt=""
    >
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  data () {
    return {
      back: -310
    }
  },
  async mounted () {
    var backtop = document.querySelector('.back-top')
    document.onmousewheel = function () {
      if (
        document.documentElement.scrollTop > 0 ||
          document.body.scrollTop > 0
      ) {
        backtop.style.transform = 'translateY(-135px)'
      }
      if (document.documentElement.scrollTop < 200) {
        backtop.style.transform = 'translateY(-310px)'
      }
    }
  },
  methods: {
    backtop() {
      var backtop = document.querySelector('.back-top')
      backtop.style.transform = 'translateY(-310px)'
      const timer = setInterval(function () {
        const backTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        const speedTop = backTop / 10
        document.documentElement.scrollTop = backTop - speedTop
        if (backTop <= 10) {
          clearInterval(timer)
        }
      }, 10)
    }
  }
}
</script>

/* 蜘蛛侠 */
<style scoped>
.back-top{
  position: fixed;
  top: 0;
  right: 30px;
  width: 66px;
  height: 400px;
  z-index: 999;
  cursor: pointer;
}
.back-top img{
  width: 100%;
  height: 400px;
  z-index: 2333;
}
</style>

