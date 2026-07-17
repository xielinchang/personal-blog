'use strict';
const base = require('../base');
module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const msg = app.model.define('banner_essay',
    Object.assign(base(app), {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      essay_id: INTEGER,
    }));
  msg.associate = function() {
    app.model.Web.Banner.belongsTo(app.model.Web.BlogEssay, {
      foreignKey: 'essay_id',
      targetKey: 'id',
    });
  };
  return msg;
};
