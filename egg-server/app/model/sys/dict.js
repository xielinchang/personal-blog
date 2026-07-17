/*
 * @Descripttion:
 * @version:
 * @Author: Liu ZiJie
 * @Date: 2022-03-25 14:40:06
 * @LastEditors: Liu ZiJie
 * @LastEditTime: 2022-07-15 09:30:06
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const SysDict = app.model.define('sys_dict',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      type: STRING(255),
      label: STRING(255),
      value: STRING(255),
      state: INTEGER,
    });
  return SysDict;
};
