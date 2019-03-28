// const sqlite = require('sqlite3');
const typeorm = require('typeorm');
const { createConnection, getRepository, getConnection} = typeorm;
const { Simbolo } = require('../models/entity/Simbolo');
const { Descrizione } = require('../models/entity/Descrizione');

async function loadSimboli() {
  simboli = await getConnection("default").getRepository("Simbolo").find();
  return simboli
}


// var simboli = []
var app = new Vue({
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

createConnection("default").then(async () => {
  app.simboli = await loadSimboli();
})

// function openInsertForm(simbolo) {
//   document.getElementById('idModal').style.display='block';
// }

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
