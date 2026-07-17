import { defineStore } from 'pinia'

export const useDictionaryStore = defineStore('dictionary', {
  state: () => ({
    menu: [{
      menuicon: 'home-filled',
      color: 'var(--theme0)',
      title: 'Home',
      router: '/home',
      id: 0
    },
    {
      menuicon: 'info-filled',
      color: 'var(--rainbow6)',
      title: 'About Me',
      router: '/aboutme',
      id: 1
    },
    {
      menuicon: 'comment',
      color: 'var(--rainbow5)',
      title: 'Message',
      router: '/message',
      id: 2
    },
    {
      menuicon: 'user-filled',
      color: 'var(--rainbow4)',
      title: 'Management',
      router: '/user',
      id: 3
    }],
    // 文章的领域
    domain: [{
      label: 'HTML',
      value: 'html'
    }, {
      label: 'CSS',
      value: 'css'
    }, {
      label: 'JS',
      value: 'js'
    }, {
      label: 'VUE',
      value: 'vue'
    }, {
      label: 'REACT',
      value: 'react'
    }, {
      label: 'NODE',
      value: 'node'
    }, {
      label: 'JAVA',
      value: 'java'
    }, {
      label: '浏览器',
      value: 'browser'
    }, {
      label: '其他',
      value: 'other'
    }],
    // 搜索文章的可选选项
    essaySearchList: [{
      label: 'Content',
      value: 'html'
    }, {
      label: 'Title',
      value: 'title'
    }, {
      label: 'Domain',
      value: 'domain'
    }, {
      label: 'Tags',
      value: 'tags'
    }, {
      label: 'Keyword',
      value: 'keyword'
    }]
    // 原创还是转载
    // permission: [{
    //   label: '原创',
    //   value: 1
    // }, {
    //   label: '转载',
    //   value: 2
    // }]
  }),
  getters: {
  },
  actions: {
  }
})
