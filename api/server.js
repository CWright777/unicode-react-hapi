'use strict';

require('dotenv').config();
const Glue = require('glue');
const manifest = require('./config/manifest.js');

Glue.compose(manifest, { relativeTo: __dirname }, (err, server) => {

  if (err) {
    return console.log(err);
  }

  server
    .ext('onPreHandler',
         (function addModelsToAllRequests(modelCollections) {
           return function addModelsToRequest(request, reply) {
             request.models = modelCollections;
             request.sequelize = server.plugins['hapi-sequelize'].db.sequelize;
             request.Sequelize = server.plugins['hapi-sequelize'].db.Sequelize;

             reply.continue();
           };
         }(server.plugins['hapi-sequelize'].db.sequelize.models))
        );

  //const db = server.plugins['hapi-sequelize'].db;
   //db.sequelize.sync({ force: true }).then(() => {
      //console.log('models synced');
  //});


  server.start(() => {
    console.log(`server running at: ${server.info.host}`);
  });
});
