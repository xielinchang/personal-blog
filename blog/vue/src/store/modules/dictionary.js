export const dictionary = {
  namespaced: true,
  state: {
    menu: [{
      menuicon: 'home-filled',
      color: '#F5A7B2',
      title: '首页',
      router: '/home',
      id: 0
    },
    {
      menuicon: 'about-me',
      color: '#00B753',
      title: '关于我',
      router: '/aboutme',
      id: 1
    },
    {
      menuicon: 'comment-filled',
      color: '#1DA9E0',
      title: '留言',
      router: '/comments',
      id: 2
    },
    {
      menuicon: 'setting-filled',
      color: '#7184AD',
      title: '管理',
      router: '/control/essay',
      id: 3
    },
    {
      menuicon: 'more-filled',
      color: '#FC9709',
      title: '更多',
      router: '/more',
      id: 4
    }],
    secondMenu: [
      {
        title: '文章管理',
        router: '/control/essay',
        id: 0
      },
      {
        title: '留言管理',
        router: '/control/comments',
        id: 1
      },
      {
        title: '记录管理',
        router: '/control/record',
        id: 2
      },
      {
        title: '用户管理',
        router: '/control/user',
        id: 3
      }
    ],
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
      label: 'NODE',
      value: 'node'
    }, {
      label: '其他',
      value: 'other'
    }],
    // 搜索文章的可选选项
    essaySearchList: [{
      label: '内容',
      value: 'html'
    }, {
      label: '标题',
      value: 'title'
    }, {
      label: '领域',
      value: 'domain'
    }, {
      label: '标签',
      value: 'tags'
    }]
  },
  mutations: {
  }
}
