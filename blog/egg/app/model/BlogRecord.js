'use strict';
const base = require('./base');
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  
  const msg = app.model.define('blog_record',
    Object.assign(base(app), {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      message: STRING,
    }));
  return msg;
};
