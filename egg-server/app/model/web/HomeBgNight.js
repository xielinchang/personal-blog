'use strict';
const base = require('../base');
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const msg = app.model.define('home_bg_night',
    Object.assign(base(app), {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      url: STRING,
    }));
  return msg;
};
