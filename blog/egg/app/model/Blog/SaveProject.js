'use strict';
const base = require('../base');
module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  const project = app.model.define('save_project',
    Object.assign(base(app), {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      title: STRING,
      link: STRING,
      coverUrl: STRING,
      html: TEXT,
    }));
  return project;
};
