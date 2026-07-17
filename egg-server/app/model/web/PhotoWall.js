'use strict';
const base = require('../base');
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const msg = app.model.define('photo_wall',
    Object.assign(base(app), {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      photo_caption: STRING,
      sort: INTEGER,
      photo_url: STRING,
    }));
  return msg;
};
