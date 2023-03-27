'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const msg = app.model.define('blog_record', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    message: STRING,
  });
  return msg;
};
