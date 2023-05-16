'use strict';
const base = require('../base');
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const project = app.model.define('project',
    Object.assign(base(app), {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING,
      link: STRING,
      cover_url: STRING,
      html: STRING,
    }));
  return project;
};
