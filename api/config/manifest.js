'use strict';
const dbConfig = require('./db');

module.exports = {
  connections: [
    {
      host: 'localhost',
      port: 3000,
      labels: ['api'],
      routes: {
        cors: true,
      },
    },
  ],
  registrations: [
    {
      plugin: {
        register: 'hapi-sequelize',
        options: dbConfig,
      },
    },
    {
      plugin: {
        register: 'hapi-routes',
        options: {
          dir: 'api/routes',
        },
      },
    },
  ],
};
