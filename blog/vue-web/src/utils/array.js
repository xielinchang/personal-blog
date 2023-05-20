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
