'use strict';

module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const msg = app.model.define('home_bg_now_night', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    bg_id: INTEGER,
  });

  return msg;
};
