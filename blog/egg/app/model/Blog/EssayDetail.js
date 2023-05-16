'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Detail = app.model.define('essay_detail', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    essay_id: INTEGER,
    good: STRING,
    collect: STRING,
  });

  return Detail;
};
