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
  },
  methods: {
    editSimbolo: function (event) {
      let idSimbolo = event.target.getAttribute('sid');
      editSimbolo(idSimbolo);
    } 
  }
})
// Crea la connessione verso il database

createConnection("default").then(async () => {
  app.simboli = await loadSimboli();
})

// function openInsertForm(simbolo) {
//   document.getElementById('idModal').style.display='block';
// }

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
  simboloID = document.getElementById('frmId').value;  
  sigla = document.getElementById('frmSigla').value;
  descrizione = document.getElementById('frmDescrizione').value;
  if(simboloID == "new") {
    desc = new Descrizione();
    simb = new Simbolo();
  } else {
    simb = await Simbolo.findOne(id = simboloID);
    desc = simb.descrizione;
  }
  desc.testo = descrizione;
  await getConnection().manager.save(desc);
  simb.sigla = sigla;
  simb.descrizione = desc;
  await getConnection().manager.save(simb);
  document.getElementById('idModal').style.display='none';

  document.getElementById('frmSigla').value = "";
  document.getElementById('frmDescrizione').value = "";

  app.simboli = await loadSimboli();
}


async function editSimbolo(simboloID) {
  simb = await Simbolo.findOne(id = simboloID);
  //desc = simb.descrizione;
  document.getElementById('frmTitle').innerHTML = "Modifica Simbolo";
  document.getElementById('frmId').value = simboloID;
  document.getElementById('frmSigla').value = simb.sigla;
  document.getElementById('frmDescrizione').value = simb.descrizione.testo;
  // attiva visualizzazione form
  document.getElementById('idModal').style.display='block';
}

async function newSimbolo() {
  document.getElementById('frmTitle').innerHTML = "Aggiungi Simbolo";
  document.getElementById('frmId').value = "new";
  document.getElementById('frmSigla').value = "";
  document.getElementById('frmDescrizione').value = "";
  // attiva visualizzazione form
  document.getElementById('idModal').style.display='block';
}

