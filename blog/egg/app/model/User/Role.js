'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const msg = app.model.define('role', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    role_name: STRING,
    code: STRING,
  });
  msg.associate = () => {
    msg.belongsToMany(app.model.User.User, {
      through: app.model.User.UserRole,
      foreignKey: 'role_id',
      otherKey: 'user_id',
    });
  };
  return msg;
};
