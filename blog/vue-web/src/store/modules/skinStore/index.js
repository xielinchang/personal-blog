
import { colors_light } from '@/style/colors_light.js'

const defaultList = []

for (const key in colors_light) {
  const item = colors_light[key]
  defaultList.push(`--${key}:${item}`)
}
const defaultStyle = defaultList.join(';')

export default {
  state: {
    skin: defaultStyle
  },
  actions: {},
  mutations: {
    setSkin(state, skin) {
      const list = []
      for (const key in skin) {
        const item = skin[key]
        list.push(`--${key}:${item}`)
      }
      const style = list.join(';')
      state.skin = style
      document.getElementsByTagName('body')[0].setAttribute('style', style)
    }
  }
}

