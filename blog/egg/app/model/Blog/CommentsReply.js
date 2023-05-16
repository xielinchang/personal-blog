'use strict';
const base = require('../base');
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const reply = app.model.define('comment_reply',
    Object.assign(base(app), {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      comment_id: INTEGER,
      user_id: INTEGER,
      reply: STRING,
    }));

  return reply;
};
