// const sqlite = require('sqlite3');
// const { app } = require('electron').remote;
const typeorm = require('typeorm');
const { createConnection, getConnection, getConnectionOptions} = typeorm;
const { codificati } = require('../models/magazzino_ele/codificati');

const mainProcess = require('electron').remote.require('../main/index')


async function loadComponenti() {
  componenti = await getConnection("magazzinoEle").getRepository(codificati).find();
  return componenti
}

// -------------------------------------
// Vue.js instanza #app
var VueApp = new Vue({
  el: "#app",
  data: {
    componenti: []
  }
})
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^



// -------------------------------------
// Crea la connessione verso il database
createConnection("magazzinoEle").then(async connection => {
  VueApp.componenti = await connection.getRepository(codificati).find();
})
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

