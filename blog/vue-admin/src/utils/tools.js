/**
 * @params string
 * @description 秒 转 时分秒 格式
*/
export function secondToHours(second) {
    const hours = Math.floor((second % 86400) / 3600)
    const minutes = Math.floor(((second % 86400) % 3600) / 60)
    const seconds = Math.floor(((second % 86400) % 3600) % 60)
    const duration = hours + ':' + minutes + ':' + seconds
    return duration
}
