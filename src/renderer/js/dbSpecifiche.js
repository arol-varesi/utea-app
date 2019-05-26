const typeorm = require('typeorm');
const { createConnection, getConnection, Connection} = typeorm;
const { Simbolo } = require('../../../models/specifiche_db/entity/Simbolo');
const { DescSimbolo } = require('../../../models/specifiche_db/entity/DescSimbolo');
const { TradSimbolo } = require('../../../models/specifiche_db/entity/TradSimbolo');
const { Lingua } = require('../../../models/specifiche_db/entity/Lingua');

const path = require('path')

const { app } = require('electron').remote;

let dbConnection = null
const fileSpecificheDB = "database.sqlite"
const connectionOption = {
  name: "dbSpecifiche",
  type: "sqlite",
  database: fileSpecificheDB,
  synchronize: true,
  logging: false,
  logger: "simple-console",
  entities: [ Simbolo, DescSimbolo, TradSimbolo, Lingua ],
}


// const __appPath = app.getPath("desktop");
// const __appPath = app.getAppPath();
// const __appPath = path.normalize(path.join(__dirname,"../../../"))


var dbSpecifiche = {
  get isConnected() {
    return (dbConnection !== null)
  },
  get simboli() {
    return (async () => await _getData(Simbolo))()
  },
  get lingue() {
    return (async () => await _getData(Lingua))()
  },
  get databasePath() {
    return fileSpecificheDB
  },
}


async function connectDB() {
  if (dbConnection === null){
    try {
      dbConnection = await createConnection(connectionOption);
    } catch (err){
      dbConnection = await getConnection(connectionOption.name)
    }
  }
  // Per usare la modalità ActiveRecord con un database diverso da "default"
  // occorre indicare per ogni Recor la connessione da usare
  Lingua.useConnection(dbConnection)
  Simbolo.useConnection(dbConnection)
  DescSimbolo.useConnection(dbConnection)
  TradSimbolo.useConnection(dbConnection)

  return dbConnection
}


async function _getData(table, filter={}) {
  let connection = await connectDB()
  data = await connection.getRepository(Simbolo).find();
  return data
}


exports.dbSpecifiche = dbSpecifiche
exports.connectDB = connectDB
exports.Lingua = Lingua
exports.Simbolo = Simbolo
exports.DescSimbolo = DescSimbolo
exports.TradSimbolo = TradSimbolo
