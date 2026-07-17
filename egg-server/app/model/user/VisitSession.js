'use strict';
const base = require('../base');
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const VisitSession = app.model.define('visit_session',
    Object.assign(base(app), {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      visit_id: INTEGER,
      start_time: STRING,
      visit_page: STRING,
    }));
  VisitSession.associate = function() {
    // 每个 VisitSession 属于一个 Visit
    VisitSession.belongsTo(app.model.User.Visit, {
      foreignKey: 'visit_id', // VisitSession 表中的外键字段
      targetKey: 'id', // Visit 表中的主键字段
    });
  };
  return VisitSession;
};
