'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const msg = app.model.define('user_role', {
    user_id: INTEGER(11),
    role_id: INTEGER(11),
  });
  return msg;
};
