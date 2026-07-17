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
    // 由于一对多模型是每个用户有多条留言，通过查询用户才能获取
    // 对应的留言，不是想要的效果，只能通过多对多模型，才能通过查询
    // 留言获取对应的用户
    User.belongsToMany(app.model.Web.Message, {
      through: app.model.Web.MessageUser,
      foreignKey: 'user_id',
      otherKey: 'message_id',
    });
    User.belongsToMany(app.model.Web.EssayComments, {
      through: app.model.Web.CommentUser,
      foreignKey: 'user_id',
      otherKey: 'comment_id',
    });
  };

  return User;
};
