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
      {
        method: 'POST',
        path: '/delimiter',
        config: {
          tags: ['api'],
          auth: false,
          description: 'Create a new delimiter',
          handler: (req, reply) => {
            const Delimiter = req.models.delimiter;
            
            const delimiterInfo = req.payload
            Delimiter.create(delimiterInfo).then(delimiter => {
              reply({
                delimiter: delimiter.dataValues,
              });
            }, err => {
              reply({
                status: 500,
                message: err,
              });
            });
          },
        },
      },
      {
        method: 'DELETE',
        path: '/delimiter/{property}',
        config: {
          tags: ['api'],
          description: 'Delete a delimiter based on its property',
          handler: (req, reply) => {
            const Delimiter = req.models.delimiter;
            const property = req.params.property;
            console.log(req.params)

            Delimiter.destroy({
              where: { property },
            }).then(() => {
              reply({
                status: '200',
              });
            }, err => {
              reply({
                status: '500',
                message: err,
              });
            });
          },
        },
      },
      {
        method: 'GET',
        path: '/delimiter/{id}/',
        config: {
          description: 'Get all delimiters',
          tags: ['api'],
          auth: false,
          handler: (req, reply) => {
            const Delimiter = req.models.delimiter;
            const query = qs.parse(req.query);
            query.id = req.params.id;

            Delimiter.findOne({
              where: query,
              attributes: ['property','value','id'],
              include: [{
                model:  req.models.locale, as: 'locales',
                attributes: ['name','id'],
                include: [
                  {
                    model: req.models.language,
                    attributes: ['name','id'],
                  }, {
                    model: req.models.territory,
                    attributes: ['name','id'],
                    
                  }, {
                    model: req.models.script,
                    attributes: ['name','id'],
                  }
                ]
              }],
            }).then(delimiter => {
              reply({
                delimiter,
              });
            }, err => {
              reply(
                Boom.badRequest(err)
              );
            });
          },
        },
      },

              //include: [{
                //model:  req.models.locale, as: 'locales',
                //attributes: ['name','id'],
                //include: [{
                  //model: req.models.language,
                  //attributes: ['name','id'],
                //}]
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
