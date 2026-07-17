import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/default/user'
import { photoQuery } from '@/api/main/photoWall.js'

export const useMainStore = defineStore('main', {
  state: () => ({
    user: {},
    loginInvalidBox: false, // 登录失效盒子，只要显示一次
    isHead: true, // 是显示头部栏还是侧边栏
    imageIsLoaded: false, // 背景图片是否加载完成
    skinType: 'day',
    photoWall: []
  }),
  getters: {
  },
  actions: {
    setLoginInvalidBox(flag) {
      this.loginInvalidBox = flag
    },
    setUserInfo(user) {
      this.user = user
    },
    reSetUserInfo() {
      this.user = {}
    },
    changeTab() {
      this.isHead = !this.isHead
    },
    changeSkin() {
      this.skinType === 'day' ? this.skinType = 'night' : this.skinType = 'day'
    },
    setPhotoWall(photoWall) {
      this.photoWall = photoWall
    },
    async getUserInfo() {
      try {
        const response = await getUserInfo()
        if (response && response.data && response.data.data) {
          this.setUserInfo(response.data.data)
          return response.data.data
        }
      } catch (error) {
        throw error
      }
    },
    async getPhotoWall() {
      try {
        const response = await photoQuery({ limit: 999, offset: 1 })
        response.data.rows.forEach((element) => {
          element.photo_url = import.meta.env.VITE_APP_BASE_API + element.photo_url
        })
        this.setPhotoWall(response.data.rows)
        return response.data.rows
      } catch (error) {
        throw error
      }
    }
  },
  persist: [
    {
      key: 'isHead',
      paths: ['isHead']
    },
    {
      key: 'skinType',
      paths: ['skinType']
    }
  ]
})

// 导入并导出dictionary模块
import { useDictionaryStore } from './modules/dictionary/index'
export { useDictionaryStore }

// 导入并导出skinStore模块
import { useSkinStore } from './modules/skinStore/index'
export { useSkinStore }
