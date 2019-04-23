const typeorm = require('typeorm');
const { createConnection, getConnection, getConnectionOptions} = typeorm;
const { codificati } = require('../../../models/magazzino_ele/codificati');

const headers = [
  {field: "ArolCode", label: "ArolCode"},
  {field: "Description", label: "Descrizione"},
  {field: "Manufacturer", label: "Manufacturer"},
  {field: "CommercialCode", label: "CommercialCode"},
]

let connection = null

async function getData() {
  if (connection === null){
    connection = await createConnection("magazzinoEle")
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

exports.getData = getData
exports.getHeaders = getHeaders