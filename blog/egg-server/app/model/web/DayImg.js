'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const msg = app.model.define('day_img', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    url: STRING,
  });
  return msg;
};
