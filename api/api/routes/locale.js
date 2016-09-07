import Boom from 'boom';
import qs from 'qs';

exports.routes = (server) => {
  server.route([
      {
        method: 'GET',
        path: '/locale',
        config: {
          description: 'Get all locales',
          tags: ['api'],
          auth: false,
          handler: (req, reply) => {
            const Locale = req.models.locale;
            const query = qs.parse(req.query);

            Locale.findAll({
              where: query,
              include: [{
                model:  req.models.language,
              }]
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
