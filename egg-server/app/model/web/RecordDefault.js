'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const msg = app.model.define('record_default', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    content: STRING,
    title: STRING,
    img: STRING,
  });
  return msg;
};
