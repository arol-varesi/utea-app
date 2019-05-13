<template>
  <div class="q-pa-md">
    
    <q-markup-table flat bordered>
      <thead class="bg-blue">
        <tr >
          <th colspan="3">
          <div class="q-mx-auto text-h4 text-white text-center">
            Simboli
          </div>
          </th>
        </tr>
        <tr>
          <th class="text-left">Sigla</th>
          <th class="text-left">Descrizione</th>
          <th class="text-center">Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="simbolo in simboli" :key="simbolo.id">
          <td>{{simbolo.sigla}}</td>
          <td>{{simbolo.descrizione.testo}}</td>
          <td class="text-center"><i @click="editSimbolo($event)" class="far fa-edit" :sid="simbolo.id"></i></td>
        </tr>
      </tbody>
    </q-markup-table>
    <q-btn color="primary" @click="newSimbolo()" icon="far fa-plus-square" label="Simbolo"></q-btn>
    

    <!-- Form modale per inserimento -->
    <div id="idModal" class="w3-modal">
      <div class="w3-modal-content w3-card-4 w3-animate-top">
        <header class="w3-container w3-teal">
          <span @click.prevent="btnCancel($event)"
            class="w3-button w3-display-topright">&times;</span>
          <h2 id="frmTitle" class="w3-center">Aggiungi Simbolo</h2>
        </header>

        <form class="w3-container">
          <input style="display: none" id="frmId">
          
          <label for="frmSigla">Sigla</label>
          <input type="text" id="frmSigla" class="w3-input">

          <label for="frmDescrizione">Descrizione</label>
          <input type="text" id="frmDescrizione" class="w3-input">
        </form>
        <div class="w3-container">
          <div class="w3-section w3-margin">
            <button @click.prevent="btnSave($event)" class="w3-btn w3-blue-gray">Salva</button>
            <button @click.prevent="btnCancel($event)" class="w3-btn w3-gray">Annulla</button>
            <button @click.prevent="btnDelete($event)" id="btnDelete" class="w3-btn w3-red w3-right">Elimina</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { async } from 'q';
const { createConnection, getRepository, getConnection, getConnectionOptions} = require('typeorm')
const { Simbolo } = require('../../../models/specifiche_db/entity/Simbolo');
const { Descrizione } = require('../../../models/specifiche_db/entity/Descrizione');

const databasePath = "database.sqlite"

const connection = null

async function loadSimboli() {
  let simboli = await getConnection("default").getRepository("Simbolo").find();
  return simboli
}

export default {
  data () {
    return {
      simboli: [],
    }
  },
  methods: {
    editSimbolo: function (event) {
      let idSimbolo = event.target.getAttribute('sid')
      this.$q.notify('Edit Simbolo:' + idSimbolo)
      editSimbolo(idSimbolo)
    },
    newSimbolo: async function (event) {
      newSimbolo()
      this.simboli = await loadSimboli()
    },
    btnCancel: function (event) {
      document.getElementById('idModal').style.display='none';
    },
    btnSave: async function (event) {
      btnSave(event)
      this.simboli = await loadSimboli()
    },
    btnDelete: async function (event) {
      btnDelete(event)
      this.simboli = await loadSimboli()
    }

  },
  created () {
    if (!connection) {
      getConnectionOptions("default").then(async connectionOptions => {
        Object.assign(connectionOptions, {database: databasePath});
        Object.assign(connectionOptions, {entities: [Simbolo, Descrizione]});
        const connection = await createConnection(connectionOptions);
      }).then( async () => {
        this.simboli = await loadSimboli();
      })
    } else {
        (async () => {this.simboli = await loadSimboli()})()
    }
  } 
}

// -------------------------------------
// Crea la connessione verso il database
// getConnectionOptions("default").then(async connectionOptions => {
//   Object.assign(connectionOptions, {database: databasePath});
//   const connection = await createConnection(connectionOptions);
// }).then( async () => {
//   VueApp.simboli = await loadSimboli();
// })
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

async function btnSave(event) {
  // legge i valori del form
  //event.preventDefault();
  let simboloID = document.getElementById('frmId').value;  
  let sigla = document.getElementById('frmSigla').value;
  let descrizione = document.getElementById('frmDescrizione').value;
  let simb, desc
  if(simboloID == "new") {
    desc = new Descrizione();
    simb = new Simbolo();
  } else {
    simb = await Simbolo.findOne({id: simboloID});
    desc = simb.descrizione;
  }
  desc.testo = descrizione;
  await getConnection().manager.save(desc);
  simb.sigla = sigla;
  simb.descrizione = desc;
  await getConnection().manager.save(simb);
  document.getElementById('idModal').style.display='none';

  // this.simboli = await loadSimboli();
}


async function btnDelete(event) {
  let simboloID = document.getElementById('frmId').value;  
  let sigla = document.getElementById('frmSigla').value;
  let descrizione = document.getElementById('frmDescrizione').value;
  if(simboloID != "new") {
    let simb = await Simbolo.findOne({id: simboloID});
    let desc = simb.descrizione;
    alert("removing: " + simb.sigla );
    await getConnection().manager.remove(simb);
    await getConnection().manager.remove(desc);
  }
  document.getElementById('idModal').style.display='none';

  // VueApp.simboli = await loadSimboli();

}


async function editSimbolo(simboloID) {
  console.log("editSimbol: " + simboloID)
  let simb = await Simbolo.findOne({id: simboloID})
  // let simb = await getConnection("default").getRepository(Simbolo).findOne({id: simboloID})
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
</script>

<style scoped>
@import "../css/w3.css"
</style>
