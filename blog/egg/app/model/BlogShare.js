'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  const msg = app.model.define('blog_share', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    html: TEXT,
    url: STRING,
    title: STRING,
    tags: STRING,
  });
  return msg;
};
