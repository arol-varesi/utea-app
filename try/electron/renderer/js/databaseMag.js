const typeorm = require('typeorm');
const { createConnection, getConnection, getConnectionOptions} = typeorm;
const { codificati } = require('../../../../models/magazzino_ele/codificati');
const path = require('path')

const { app } = require('electron').remote;

// const __appPath = app.getPath("desktop");
// const __appPath = app.getAppPath();
const __appPath = path.normalize(path.join(__dirname,"../../../../"))

const headers = [
  {field: "ArolCode", label: "ArolCode"},
  {field: "Description", label: "Descrizione"},
  {field: "Manufacturer", label: "Manufacturer"},
  {field: "CommercialCode", label: "CommercialCode"},
]

var databaseMag = {
  _dati : [],
  isConnected: true,
  get dati() {
    try {
      this._dati = (async () => await getData())()
      this.isConnected = true
    } catch {
      this.isConnected = false
    }
    return this._dati
  },
  get databasePath() {
    return fileMagEleDB
  },
  get colonne() {
    return getHeaders()
  },
  get colonneQtable() {
    return getHeaders("qtable", true)
  },
  get colonneVuetify() {
    return getHeaders("vuetify")
  }
}

let connection = null
let fileMagEleDB


// try { 
//   fileMagEleDB = path.join(__static, "db/MagazzinoEle.db")
//  fileMagEleDB = path.join(__appPath, "MagazzinoEle.db")
// }
// catch(err) {
  fileMagEleDB = path.join(__appPath, "static/db/MagazzinoEle.db")
  console.log(fileMagEleDB)
// }

async function getData() {
  if (connection === null){
    const connectionOption = await getConnectionOptions("magazzinoEle");
    Object.assign(connectionOption, {database: fileMagEleDB});
    Object.assign(connectionOption, { entities: [codificati]})
    try {
      connection = await createConnection(connectionOption);
    } catch (err){
      throw(err)
    }
  }
  data = await connection.getRepository(codificati).find();
  return data
}

function getHeaders(type = null, sortable = false) {
  let retvalue = []
  if (type === "qtable") {
    headers.forEach( h => {
      let header = { 'name': h.field, 'label': h.label, 'field': h.field}
      if (sortable) {
        header["sortable"] = true
      }
      retvalue.push(header)
      // retvalue.push({ 'name': h.field, 'label': h.label, 'field': h.field})
    })
  } else if (type == "vuetify") {
    headers.forEach( h => {
      retvalue.push({ 'text': h.label, 'value': h.field})
    })   
  } else {
    headers.forEach( h => {
      retvalue.push(h.field)
    })
  }
  return retvalue
}

exports.default = databaseMag
exports.getData = getData
exports.getHeaders = getHeaders