'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  // {app_root}/config/plugin.js
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
/*   swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc',
  }, */
};
