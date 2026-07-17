'use strict';
const base = require('../base');
module.exports = app => {
  const { TEXT, INTEGER, STRING } = app.Sequelize;

  const map = app.model.define('gaming_supermarry_map',
    Object.assign(base(app), {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      map_data: TEXT,
      level: INTEGER,
      name: STRING,
    }));
  return map;
};
