'use strict';
const base = require('../base');
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define('user',
    Object.assign(base(app), {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      password: STRING,
      username: STRING,
      portrait: STRING,
    }));
  User.associate = function() {
    User.hasOne(app.model.User.UserDetail, {
      foreignKey: 'user_id',
      targetKey: 'id',
    });
    User.belongsToMany(app.model.User.Role, {
      through: app.model.User.UserRole,
      foreignKey: 'user_id',
      otherKey: 'role_id',
    });
  };
  return User;
};
