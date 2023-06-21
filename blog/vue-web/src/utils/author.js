import Cookies from 'js-cookie'

export function getToken(key) {
  return Cookies.get(key)
}

export function setToken(key, token) {
  // 经过seconds秒后过期
  const seconds = 60 * 60 * 24
  const expires = new Date(new Date() * 1 + seconds * 1000)
  return Cookies.set(key, token, { expires: expires })
}

export function removeToken(key) {
  return Cookies.remove(key)
}
