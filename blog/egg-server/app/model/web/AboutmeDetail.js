'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const msg = app.model.define('aboutme_detail', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    email: STRING,
    qq: STRING,
    phone: STRING,
    techniques: STRING,
    web_declare: STRING,
  });
  return msg;
};
