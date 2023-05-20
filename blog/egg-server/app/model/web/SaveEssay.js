'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  const msg = app.model.define('save_essay', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    html: TEXT,
    coverUrl: STRING,
    title: STRING,
    subtitle: STRING,
    digest: STRING,
    tags: STRING,
    domain: STRING,
    radio: STRING,
  });
  return msg;
};
