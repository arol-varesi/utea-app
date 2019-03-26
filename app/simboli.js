// const sqlite = require('sqlite3');
const { app } = require('electron').remote;
const typeorm = require('typeorm');
const { createConnection, getRepository, getConnection, getConnectionOptions} = typeorm;
const { Simbolo } = require('../models/entity/Simbolo');
const { Descrizione } = require('../models/entity/Descrizione');

const mainProcess = require('electron').remote.require('../main/index')
// const databasePath = app.getPath("appData") + "/database.sqlite";
const databasePath = "database.sqlite";


async function loadSimboli() {
  simboli = await getConnection("default").getRepository("Simbolo").find();
  return simboli
}

// var simboli = []
var VueApp = new Vue({
  el: "#app",
  data: {
    simboli: []
  }
})
// Crea la connessione verso il database


getConnectionOptions("default").then(async connectionOptions => {
  Object.assign(connectionOptions, {database: databasePath});
  const connection = await createConnection(connectionOptions);
}).then( async () => {
  VueApp.simboli = await loadSimboli();
})


function openInsertForm() {
  document.getElementById('idModal').style.display='block';
}

function formCancel(event) {
  event.preventDefault();
  document.getElementById('idModal').style.display='none';
}

async function formSave(event) {
  // legge i valori del form
  event.preventDefault();
  sigla = document.getElementById('frmSigla').value;
  descrizione = document.getElementById('frmDescrizione').value;
  const desc = new Descrizione();
  desc.testo = descrizione;
  await getConnection().manager.save(desc);
  const simb = new Simbolo();
  simb.sigla = sigla;
  simb.descrizione = desc;
  await getConnection().manager.save(simb);

  
  document.getElementById('idModal').style.display='none';
  VueApp.simboli = await loadSimboli();
}