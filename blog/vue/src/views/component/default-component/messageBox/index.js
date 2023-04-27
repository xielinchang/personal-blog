import Vue from 'vue'
import messageBox from './messageBox'

const MessageBox = Vue.extend(messageBox)
const instance = new MessageBox({}).$mount()
document.body.appendChild(instance.$el)
messageBox.confirm = function (option) {
  Object.assign(instance, option)
  instance.isShow = true
}
Vue.prototype.$msgBox = messageBox
export default messageBox
