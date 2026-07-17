export const dictionary = {
  namespaced: true,
  state: {
    //发布状态
    states: [
      {
        value: 1,
        label: "已发布",
      },
      {
        value: 2,
        label: "未发布",
      },
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
    }]
  },
  mutations: {
  }
}
