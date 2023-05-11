'use strict';
const base = require('./base');
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const user = app.model.define('user',
    Object.assign(base(app), {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      identity: STRING(30),
      password: STRING,
      username: STRING,
      portrait: STRING,
    }));
  user.associate = function() {
    app.model.User.hasOne(app.model.UserDetail, {
      foreignKey: 'user_id',
      targetKey: 'id',
    });
  };
  return user;
};
