'use strict';
const base = require('../base');
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const message = app.model.define('message',
    Object.assign(base(app), {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      content: STRING,
      address: STRING,
    }));
  message.associate = function() {
    app.model.Web.Message.hasOne(app.model.Web.MessageReply, {
      foreignKey: 'message_id',
      targetKey: 'id',
    });
    message.belongsToMany(app.model.User.User, {
      through: app.model.Web.MessageUser,
      foreignKey: 'message_id',
      otherKey: 'user_id',
    });
  };

  return message;
};
