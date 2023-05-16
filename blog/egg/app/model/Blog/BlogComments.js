'use strict';
const base = require('../base');
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const comment = app.model.define('blog_comments',
    Object.assign(base(app), {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      content: STRING,
      address: STRING,
      user_id: INTEGER,
    }));
  comment.associate = function() {
    // 留言暂时只能是博主才能回复,所以是一对一
    app.model.Blog.BlogComments.hasOne(app.model.Blog.CommentsReply, {
      foreignKey: 'comment_id',
      targetKey: 'id',
    });
  };
  return comment;
};
