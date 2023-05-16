
import store from '@/store'

// 输入白天，傍晚，晚上的开始时间，返回现在处于什么时候
/**
 *
 * @param {*} daytime
 * @param {*} dusk
 * @param {*} night
 * @returns {Object}
 */

export function isDay(daytime, dusk, night) {
  const date = new Date()
  const time = date.getHours()
  const ob = { date: date, time: time }
  if (time >= daytime && time < dusk) {
    return Object.assign(ob, { type: 'daytime' })
  } else if (time >= dusk && time < night) {
    return Object.assign(ob, { type: 'dusk' })
  } else {
    return Object.assign(ob, { type: 'night' })
  }
}

// 获取用户信息
export function getUser() {
  const getinfoTimer = setInterval(() => {
    if (store.state.user.user) {
      store.state.loading = false
      clearInterval(getinfoTimer)
      console.log(store.state.user)
      return store.state.user
    } else {
      store.state.loading = true
    }
  }, 10)
}

