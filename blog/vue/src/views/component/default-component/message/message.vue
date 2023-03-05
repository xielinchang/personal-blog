<template>
  <div>
    <div
      class="welcome-msg animated"
      :class="welcomeShow ? 'animate__bounceInDown' : 'animate__hinge'"
    >
      <span v-if="defaultMsg">欢迎来自 &nbsp; <strong> {{ address }} </strong>&nbsp;
        的小朋友!</span>
      <span v-else>{{ message }}</span>
    </div>
  </div>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Message',
  props: {
    defaultMsg: {
      type: Boolean,
      default: true
    },
    message: {
      type: String,
      default: null
    },
    address: {
      type: String,
      default: null
    },
    /* true代表执行移入动画 false表示执行离开动画 */
    welcomeShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style>
.welcome-msg {
  position: fixed;
  margin: auto;
  left: 40%;
  top: 100px;
  width: 380px;
  height: 40px;
  border-radius: 8px;
  box-shadow: 0 0 3px 1px rgb(164, 228, 255);
  background: rgb(164, 228, 255, 0.5);
  color: #006c97;
  z-index: 999999;
  line-height: 40px;
}
.welcome-icon {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 10px;
  top: 5px;
}
.welcome-icon img {
  width: 100%;
  height: 100%;
}
.welcome-msg span {
  width: 80%;
  position: absolute;
  height: 100%;
  left: 40px;
  line-height: 40px;
  font-size: 16px;
}
.welcome-msg span strong {
  font-family: YouYuan;
  color: #004a75;
  font-size: 18px;
}
</style>
