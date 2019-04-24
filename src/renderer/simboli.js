// const sqlite = require('sqlite3');
const { app } = require('electron').remote;
const typeorm = require('typeorm');
const { createConnection, getRepository, getConnection, getConnectionOptions} = typeorm;
const { Simbolo } = require('../../models/specifiche_db/entity/Simbolo');
const { Descrizione } = require('../../models/specifiche_db/entity/Descrizione');

const mainProcess = require('electron').remote.require('../main/main')
// const databasePath = app.getPath("appData") + "/database.sqlite";
const databasePath = "database.sqlite";

async function loadSimboli() {
  simboli = await getConnection("default").getRepository("Simbolo").find();
  return simboli
}

// -------------------------------------
// Vue.js instanza #app
var VueApp = new Vue({
  el: "#app",
  data: {
    simboli: [],
  },
  methods: {
    editSimbolo: function (event) {
      let idSimbolo = event.target.getAttribute('sid');
      editSimbolo(idSimbolo);
    } 
  }
})
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^



// -------------------------------------
// Crea la connessione verso il database
getConnectionOptions("default").then(async connectionOptions => {
  Object.assign(connectionOptions, {database: databasePath});
  const connection = await createConnection(connectionOptions);
}).then( async () => {
  VueApp.simboli = await loadSimboli();
})
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


// function openInsertForm() {
//   document.getElementById('idModal').style.display='block';
// }''

// -------------------------------------
// Form editing/aggiunta Simbolo

function btnCancel(event) {
  event.preventDefault();
  document.getElementById('idModal').style.display='none';
}

async function btnSave(event) {
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

  VueApp.simboli = await loadSimboli();
}

async function btnDelete(event) {
  event.preventDefault();
  simboloID = document.getElementById('frmId').value;  
  sigla = document.getElementById('frmSigla').value;
  descrizione = document.getElementById('frmDescrizione').value;
  if(simboloID != "new") {
    simb = await Simbolo.findOne(id = simboloID);
    desc = simb.descrizione;
    alert("removing: " + simb.sigla );
    await getConnection().manager.remove(simb);
    await getConnection().manager.remove(desc);
  }
  document.getElementById('idModal').style.display='none';

  VueApp.simboli = await loadSimboli();

}


async function editSimbolo(simboloID) {
  simb = await Simbolo.findOne(id = simboloID);
  //desc = simb.descrizione;
  document.getElementById('frmTitle').innerHTML = "Modifica Simbolo";
  document.getElementById('frmId').value = simboloID;
  document.getElementById('frmSigla').value = simb.sigla;
  document.getElementById('frmDescrizione').value = simb.descrizione.testo;

  // visualizza pulsante "Elimina"
  document.getElementById('btnDelete').style.display='block';
  // attiva visualizzazione form
  document.getElementById('idModal').style.display='block';
}

async function newSimbolo() {
  document.getElementById('frmTitle').innerHTML = "Aggiungi Simbolo";
  document.getElementById('frmId').value = "new";
  document.getElementById('frmSigla').value = "";
  document.getElementById('frmDescrizione').value = "";
  
  // nascondi pulsante "Elimina"
  document.getElementById('btnDelete').style.display='none';
  // attiva visualizzazione form
  document.getElementById('idModal').style.display='block';
}

