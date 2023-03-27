/*
 * @Descripttion: 
 * @version: 
 * @Author: Liu ZiJie
 * @Date: 2022-03-13 17:52:39
 * @LastEditors: Liu ZiJie
 * @LastEditTime: 2022-07-15 09:13:39
 */
'use strict';
const moment = require('moment');
// app 可以直接第一个形参可以拿到
module.exports = {

  // 时间格式化
  formatTime(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  },
  // 验证手机号
  validPhone(phone) {
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      return false;
    }
    return true;
  },
  /**
   * @descrption 条件查询过滤
   * @param {Array} array 
   * @param {Array} queryList 
   * @returns where
   */
  queryFilter(array,queryList){
    let where = {}
    Object.keys(array).forEach(e => {
      if(queryList.includes(e)){
        where[e] = array[e]
      }
    })
    return where
  }
};
