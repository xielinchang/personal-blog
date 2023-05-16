'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const user = app.model.define('user_detail', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    user_id: INTEGER,
    collect: STRING,
    good: STRING,
  });

  return user;
};
