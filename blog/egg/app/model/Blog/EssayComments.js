'use strict';
const base = require('../base');
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const msg = app.model.define('essay_comments',
    Object.assign(base(app), {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      essay_id: INTEGER,
      user_id: INTEGER,
      address: STRING,
      message: STRING,
    }));
  return msg;
};
