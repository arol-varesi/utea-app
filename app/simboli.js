// const sqlite = require('sqlite3');
const typeorm = require('typeorm');
const { createConnection, getRepository, getConnection} = typeorm;
const { Simbolo } = require('../models/entity/Simbolo');
const { Descrizione } = require('../models/entity/Descrizione');

async function loadSimboli() {
  simboli = await getConnection("default").getRepository("Simbolo").find();
  return simboli
}

var simboli = []

createConnection("default").then(async () => {
  simboli = await loadSimboli();

  var app = new Vue({
    el: "#app",
    data: {
      simboli: simboli
    }
  })
    // var simboli = await connection.getRepository("Simbolo").find();
  // // crea la lista con tutti i simboli presenti nel database
  // let ul = document.getElementById("listaSimboli");
  // simboli.forEach(simbolo => {
  //   var li = document.createElement('li');
  //   var testo = simbolo["sigla"] + ": "+ simbolo.descrizione["testo"];
  //   li.innerHTML = testo;
  //   ul.appendChild(li);
  // })
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
  simboli = await loadSimboli();
}