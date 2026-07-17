'use strict';
const base = require('../base');
module.exports = app => {
  const { INTEGER, TEXT } = app.Sequelize;

  const msg = app.model.define('essay_note',
    Object.assign(base(app), {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      essay_id: INTEGER,
      html: TEXT,
    }));
  msg.associate = function() {
    msg.belongsToMany(app.model.User.User, {
      through: app.model.Web.NoteUser,
      foreignKey: 'note_id',
      otherKey: 'user_id',
    });
  };
  return msg;
};
