


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

// 打乱数组
/**
 *
 * @param {*} arr
 * @returns {Array}
 */
export function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // 生成随机索引
    [arr[i], arr[j]] = [arr[j], arr[i]] // 交换元素位置
  }
  return arr
}
// 设置带过期时间的 localStorage
export function setItemWithExpiry(key, value, ttl) {
  const now = new Date()

  // `ttl` 是以毫秒为单位的时间
  const item = {
    value: value,
    expiry: now.getTime() + ttl
  }
  localStorage.setItem(key, JSON.stringify(item))
}

// 获取带过期时间的 localStorage
export function getItemWithExpiry(key) {
  const itemStr = localStorage.getItem(key)

  // 如果没有找到值，返回 null
  if (!itemStr) {
    return null
  }

  const item = JSON.parse(itemStr)
  const now = new Date()

  // 比较当前时间和过期时间
  if (now.getTime() > item.expiry) {
    // 如果过期了，删除这个存储项并返回 null
    localStorage.removeItem(key)
    return null
  }

  return item.value
}
