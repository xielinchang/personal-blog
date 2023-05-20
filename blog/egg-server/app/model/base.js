'use strict';
const moment = require('moment');

module.exports = app => {
  const { STRING, DATE } = app.Sequelize;

  return {
    upt_act: { type: STRING(2), defaultValue: () => 'I' },
    created_at: {
      type: DATE,
      defaultValue: () => {
        return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
      },
      get() {
        return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    updated_at: {
      type: DATE,
      defaultValue: () => {
        return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
      },
      get() {
        return moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  };
};
