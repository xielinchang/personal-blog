'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const MessageUser = app.model.define('message_user', {
    message_id: INTEGER(11),
    user_id: INTEGER(11),

  });

  return MessageUser;
};
