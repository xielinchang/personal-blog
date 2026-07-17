'use strict';
const base = require('../base');
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Visit = app.model.define('visit',
    Object.assign(base(app), {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      ip: STRING(30),
      visit_address: STRING,
      visit_count: STRING,
    }));
  Visit.associate = function() {
    // 一个 Visit 可以有多个 VisitSession
    Visit.hasMany(app.model.User.VisitSession, {
      foreignKey: 'visit_id', // VisitSession 表中的外键字段
      sourceKey: 'id', // Visit 表中的主键字段
    });
  };
  return Visit;
};
