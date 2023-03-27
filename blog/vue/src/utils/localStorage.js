/* 重写localStorage方法 */
var orignalSetItem = localStorage.setItem
export default localStorage.setItem = function(key, newValue) {
  // 要监听的key
  if (key === 'user') {
    var setUser = new Event('setUser')
    setUser.newValue = newValue
    window.dispatchEvent(setUser)
    orignalSetItem.apply(this, arguments)
  }
}
