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
      value: 'HTML'
    }, {
      label: 'CSS',
      value: 'CSS'
    }, {
      label: 'JS',
      value: 'JS'
    }, {
      label: 'VUE',
      value: 'VUE'
    }, {
      label: 'NODE',
      value: 'NODE'
    },{
      label: 'REACT',
      value: 'REACT'
    }, {
      label: '其他',
      value: '其他'
    }],
  },
  mutations: {
  }
}
