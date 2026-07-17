'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const EssaycommentUser = app.model.define('comment_user', {
    comment_id: INTEGER(11),
    user_id: INTEGER(11),

  });

  return EssaycommentUser;
};
