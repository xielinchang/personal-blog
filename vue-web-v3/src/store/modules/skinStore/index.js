import { defineStore } from 'pinia'

export const useSkinStore = defineStore('skinStore', {
  state: () => ({
    skin: []
  }),
  getters: {
  },
  actions: {
    setSkin(skin) {
      const list = []
      for (const key in skin) {
        const item = skin[key]
        list.push(`--${key}:${item}`)
      }
      const style = list.join(';')
      this.skin = style
      document.getElementsByTagName('body')[0].setAttribute('style', style)
    }
  }
})

