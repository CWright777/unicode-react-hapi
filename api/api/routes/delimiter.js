import Boom from 'boom';
import qs from 'qs';

exports.routes = (server) => {
  server.route([
      {
        method: 'GET',
        path: '/delimiter',
        config: {
          description: 'Get all delimiters',
          tags: ['api'],
          auth: false,
          handler: (req, reply) => {
            const Delimiter = req.models.delimiter;
            const query = qs.parse(req.query);

            Delimiter.findAll({
              where: query,
              attributes: ['property','value','id'],
              include: [{
                model:  req.models.locale, as: 'locales',
                attributes: ['name','id'],
                include: [{
                  model: req.models.language,
                  attributes: ['name','id'],
                }]
              }],
          
            }).then(delimiters => {
              reply({
                delimiters,
              });
            }, err => {
              reply(
                Boom.badRequest(err)
              );
            });
          },
        },
      },
      //{
        //method: 'GET',
        //path: '/delimiter/:id/',
        //config: {
          //description: 'Get all delimiters',
          //tags: ['api'],
          //auth: false,
          //handler: (req, reply) => {
            //const Delimiter = req.models.delimiter;
            //const query = qs.parse(req.query);

            //Delimiter.findAll({
              //where: query,
              //attributes: ['property','value','id'],
              //include: [{
                //model:  req.models.locale, as: 'locales',
                //where: {
                  //delimiters:
                //}
                //attributes: ['name','id'],
                //include: [{
                  //model: req.models.language,
                  //attributes: ['name','id'],
                //}]
              //}],
          
            //}).then(delimiters => {
              //reply({
                //delimiters,
              //});
            //}, err => {
              //reply(
                //Boom.badRequest(err)
              //);
            //});
          //},
        //},
      //},
  //server.route([
   //{
      //method: 'GET',
      //path: '/',
      //config: {
        //description: 'Gets all address of a user.',
        //tags: ['api'],
      //},
      //handler: (req, reply) => {
        ////console.log(req.models)
        //req.models.locale.associate(req.models)
        //req.models.delimiter.associate(req.models)
        //const Delimiter = req.models.delimiter;
        //Delimiter.findOne({
          //where: {id: 1},
          //include: [{model:  req.models.locale, as: 'locales'}],
        //}).then((x)=>{
          //console.log(x)
        //})
      //},
    //},
  ]);
};