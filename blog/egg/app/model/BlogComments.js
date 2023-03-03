'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const msg = app.model.define('blog_comments', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    content: STRING,
    portrait_url: STRING,
    name: STRING,
    address: STRING,
    reply: STRING,
    isreply: STRING,
  });
  return msg;
};
