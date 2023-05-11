'use strict';
const base = require('./base');
module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  const msg = app.model.define('blog_essay',
    Object.assign(base(app), {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      html: TEXT,
      coverUrl: STRING,
      title: STRING,
      subtitle: STRING,
      digest: STRING,
      tags: STRING,
      domain: STRING,
      radio: STRING,

    }));
  msg.associate = function() {
    app.model.BlogEssay.hasOne(app.model.EssayDetail, {
      foreignKey: 'essay_id',
      targetKey: 'id',
    });
  };
  return msg;
};
