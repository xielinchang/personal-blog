'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;
  const EssaynoteUser = app.model.define('note_user', {
    note_id: INTEGER(11),
    user_id: INTEGER(11),

  });

  return EssaynoteUser;
};
