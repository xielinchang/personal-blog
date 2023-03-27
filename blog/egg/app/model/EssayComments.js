'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const msg = app.model.define('essay_comments', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    essay_id: INTEGER,
    name: STRING,
    portrait: STRING,
    address: STRING,
    message: STRING,
  });
  return msg;
};
