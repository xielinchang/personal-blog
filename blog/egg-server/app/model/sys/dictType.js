/*
 * @Descripttion:
 * @version:
 * @Author: Liu ZiJie
 * @Date: 2022-07-14 16:49:27
 * @LastEditors: Liu ZiJie
 * @LastEditTime: 2022-07-14 16:50:19
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const SysDictType = app.model.define('sys_dict_type',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      dict_name: STRING(255),
      dict_type: STRING(255),
      state: INTEGER,
      remark: STRING(255),
    });
  return SysDictType;
};
