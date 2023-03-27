<template>
  <transition
    name="msg-box-fade"
  >
    <div
      v-show="isShow"
      class="mask"
      @touchmove.prevent
      @mousewheel.prevent
    >
      <div
        class="popup-message"
        :class="type"
      >
        <div class="pop-view">
          <span class="pop-title">{{ title || '' }}</span>
          <p
            v-if="content"
            class="pop-content"
          >{{ content }}</p>
          <div
            class="pop-btn"
          >
            <my-button
              :type="type"
              plain
              size="mini"
              @click="handleCancel"
            >取消</my-button>
            <my-button
              :type="type"
              size="mini"
              @click="handleConfirm"
            >确定</my-button>
          </div>
          <svg-icon
            icon-name="close"
            class="close"
            size="20px"
            @click="handleCancel"
          ></svg-icon>
        </div>

      </div>
    </div>
  </transition>

</template>

<script>
// 解决消息弹框报错未注册此组件（但是能显示）
import MyButton from '../myButton/MyButton.vue'
import SvgIcon from '../SvgIcon/SvgIcon.vue'
const Message = {
  name: 'MessageBox',
  components: {
    MyButton,
    SvgIcon
  },
  data() {
    return {
      isShow: false,
      title: '',
      type: 'success',
      content: ''
    }
  },
  computed: {
    //
  },
  mounted() {
  },
  // install(Vue) {
  //   var that = this
  //   let popupMessage = null
  //   const init = () => {
  //     const MessageConstructor = Vue.extend(Message)
  //     popupMessage = new MessageConstructor({})
  //     popupMessage.$mount()
  //     document.body.appendChild(popupMessage.$el)
  //   }
  //   const caller = (options) => {
  //     console.log(options)
  //     init(options)
  //     popupMessage.getParams(options)
  //   }
  //   Vue.prototype.$msgBox = caller
  // },
  methods: {
    // getParams(options) {
    //   this.type = options.type
    //   this.title = options.title
    //   this.content = options.content
    //   this.promiseStatus = options.promiseStatus
    // },
    handleCancel() {
      this.isShow = false
      if (this.onCancel) {
        this.onCancel()
      }
      // this.$destroy(true)
      // this.$el.parentNode.removeChild(this.$el)
    },
    handleConfirm() {
      this.isShow = false
      if (this.onOK) {
        this.onOK()
      }
      // this.$destroy(true)
      // this.$el.parentNode.removeChild(this.$el)
    }
  }
}
export default Message
</script>
<style lang="scss" scoped>
@import './messageBox.scss';
</style>
