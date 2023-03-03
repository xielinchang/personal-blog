import Vue from 'vue'
import SvgIcon from '@/views/component/SvgIcon/index'// svg组件

// 注册到全局
Vue.component('SvgIcon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
// map传入一个函数，遍历数组中的每个对象，被webpack自动进行导入
// eslint-disable-next-line
const req = require.context('./svg', false, /\.svg$/)
/*
 第一个参数是:'./svg' => 需要检索的目录，
 第二个参数是：false => 是否检索子目录,
 第三个参数是: /\.svg$/ => 匹配文件的正则
 返回值有三个属性： resolve/keys/id
 resolve是一个函数，返回已解析请求的模块id
 keys是一个函数，它返回上下文模块可以处理的所有可能请求的数组
*/
console.log(requireAll(req))
requireAll(req)

