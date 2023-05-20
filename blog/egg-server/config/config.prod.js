/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const prodConfig = exports = {};

  prodConfig.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: '123456',
    port: 3306,
    database: 'myblog',
    timezone: '+08:00',
    define: {
      freezeTableName: true,
      timestamps: false,
    },
  };

  return {
    ...prodConfig,
  };
};
