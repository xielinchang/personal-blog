'use strict';
const base = require('../base');
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const msg = app.model.define('casual',
    Object.assign(base(app), {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      author: STRING,
      sort: INTEGER,
      content: STRING,
    }));
  return msg;
};
