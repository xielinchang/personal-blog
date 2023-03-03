'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const user = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },

    name: STRING(30),
    identity: STRING(30),
    password: STRING,
    username: STRING,
    portrait_url: STRING,
  });
  return user;
};
