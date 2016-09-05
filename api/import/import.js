import fs from 'fs';
import Delimiter from '../api/models/delimiter';
import Sequelize from 'sequelize';
import db from '../api/models/index'
import Bluebird from 'bluebird'

const targets = 'node_modules/cldr-misc-full/main/';

const sequelize = new Sequelize(require('../config/db'))


            //db.delimiter.create({property:"ds",value:'3'})
fs.readdir( targets, (err,files) => {
  if( err ) {
    throw err
  }

  files.forEach( (file, idx) => {
    fs.stat(targets+file+'/delimiters.json', (err,stats) => {
      fs.open(targets+file+'/delimiters.json', 'r', (err,temp) => {
        const buffer = new Buffer(stats.size);
        fs.read(temp,buffer, 0, buffer.length, null, (err, bytesRead, buffer) => {
          const data = buffer.toString('utf8', 0, buffer.length);
          const parsedObject = JSON.parse(data)['main'];
          const localeKey = Object.keys(parsedObject)[0];
          const localeInfo = parsedObject[localeKey]

            total(db,localeInfo,file).then((locale)=>{
              Object.keys(localeInfo.delimiters).forEach( (property) => {
                db.delimiter.findOne({
                  where: {
                    property: property,
                    value: localeInfo.delimiters[property]
                  }
                }).then((delimiter) => {
                  if(delimiter){
                    delimiter.addLocale(locale[0].dataValues.id)
                  } else {
                    db.delimiter.create({
                      property: property,
                      value: localeInfo.delimiters[property],
                    }).then((newDelimiter)=>{
                     newDelimiter.addLocale(locale[0].dataValues.id)
                    })
                  }
                })
              })
            })
          fs.close(temp)
        })
      })
    })
  })
})

const total = (db,localeInfo,localeName) => {
  return Bluebird.coroutine(function* () {
      try {
        const identity = yield createOrFindIdentityRecords(db,localeInfo);
        const locale = yield createLocale(identity,localeName);
        return locale
        //Object.keys(localeInfo.delimiters).forEach( (property) => {
        //}
      } catch (err) {
        throw err;
      }
  })();
}

const createOrFindIdentityRecords = (db,localeInfo) => {
    const langName = localeInfo.identity.language;
    const terrName = localeInfo.identity.territory;
    const scriptName = localeInfo.identity.script;
    return Bluebird.coroutine(function* () {
      try {
        const identity = {}
        let language, territory, script
        if(langName) {
          language = yield db.language.findOrCreate({
            where: {name: langName}
          })
          identity.language = language[0]
        }
        if(scriptName) {
          script = yield db.script.findOrCreate({
            where: {name: scriptName}
          })
          identity.script = script[0]
        }
        if(terrName) {
          territory = yield db.territory.findOrCreate({
            where: {name: terrName}
          })
          identity.territory = territory[0]
        }
        //const identity = {
          //language: language[0],
          //territory: territory[0],
          //script: script[0]
        //}
        return identity
      } catch (err) {
        throw err;
      }
  })();
}

const createLocale = (identity,localeName) => {
  return Bluebird.coroutine(function* () {
    try {
      const locale = yield db.locale.findOrCreate({
        where: { 
          name: localeName,
          language_id: identity.language ? identity.language.dataValues.id : null,
          territory_id: identity.territory ? identity.territory.dataValues.id : null,
          script_id: identity.script ? identity.script.dataValues.id : null,
        }
      })
      return locale
      } catch (err) {
        throw err;
      }
  })();
}

const findDelimiter = (db,property,value) => {
    //console.log(localeInfo.delimiters[property])
  db.delimiter.findOne({
    where: {
      property: property,
      value: localeInfo.delimiters[property]
    }
  })
}


const digDeep = (e,callback) => {
  let result =[];
  Object.keys(e).forEach((key) => {
    if(typeof e[key] === 'object'){
      result.push(e,e[key])
    }
  })
  callback(result)
}
