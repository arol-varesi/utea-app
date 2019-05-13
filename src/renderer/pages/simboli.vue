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
          <td class="text-center"><i @click="editSimbolo($event, simbolo.id)" class="far fa-edit" :sid="simbolo.id"></i></td>
        </tr>
      </tbody>
    </q-markup-table>
    <q-btn color="primary" @click="newSimbolo()" icon="far fa-plus-square" label="Simbolo"></q-btn>
    

    <!-- Form modale per inserimento -->
    <q-dialog 
      v-model="editForm" 
      transition-show="slide-down" 
      transition-hide="slide-up">
      <q-card class="formCard">
        <q-card-section class="row items-center">
          <q-toolbar class="bg-primary glossy text-white">
            <q-toolbar-title id="frmTitle">{{formTitle}}</q-toolbar-title>
            <q-btn flat round v-close-popup>&times;</q-btn>
          </q-toolbar>
          <q-space />
        </q-card-section>

        <q-separator />
        <q-card-section>

        <q-form
          @submit="btnSave"
          @reset="btnCancel"
          class="q-gutter-md">

          <input v-model="frmID" style="display: none" id="frmId">
          <q-input
            filled
            v-model="frmSigla"
            label="Sigla" />
          
          <q-input
            filled
            v-model="frmDescrizione"
            label="Descrizione" />

          <div class="row">
            <q-btn label="Salva" type="submit" color="secondary"></q-btn>
            <q-btn label="Reset" type="reset" color="secondary" flat class="q-ml-sm" ></q-btn>
            <q-space />
            <q-btn label="Elimina" @click.prevent="btnDelete($event)" color="negative"></q-btn>
          </div>
        </q-form>
        <form class="w3-container">
          
          <label for="frmSigla">Sigla</label>
          <input type="text" id="frmSigla" class="w3-input">

          <label for="frmDescrizione">Descrizione</label>
          <input type="text" id="frmDescrizione" class="w3-input">
        </form>
        <div class="w3-container">
          <div class="w3-section w3-margin">
            <button @click.prevent="btnSave($event)" class="w3-btn w3-blue-gray">Salva</button>
            <button @click.prevent="btnCancel($event)" class="w3-btn w3-gray">Annulla</button>
           
            <button v-show="frmEnableDelete"  @click.prevent="btnDelete($event)" id="btnDelete" class="w3-btn w3-red w3-right">Elimina</button>
          </div>
        </div>
        </q-card-section>
      </q-card>
    </q-dialog>
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
      editForm: false,
      formTitle: "",
      frmID: null,
      frmSigla: null,
      frmDescrizione: null,
      frmEnableDelete: false,
    }
  },
  methods: {
    editSimbolo: async function (event, idSimbolo) {
      //let idSimbolo = event.target.getAttribute('sid')
      this.$q.notify('Edit Simbolo:' + idSimbolo)
      let simb = await Simbolo.findOne({id: idSimbolo})
      this.frmID = simb.id
      this.frmSigla = simb.sigla
      this.frmDescrizione = simb.descrizione.testo
      //editSimbolo(idSimbolo)
      this.formTitle = "Modifica Simbolo"
      this.frmEnableDelete = true
      this.editForm = true
    },
    newSimbolo: async function (event) {
      this.frmID = null
      this.frmSigla = null
      this.frmDescrizione = null
      newSimbolo()
      this.formTitle = "Aggiungi Simbolo"
      this.frmEnableDelete = false
      this.editForm = true
      this.simboli = await loadSimboli()
    },
    btnCancel: function (event) {
      
      this.editForm = false
      //document.getElementById('idModal').style.display='none';
    },
    btnSave: async function (event) {
      btnSave(event)
      this.editForm = false
      this.simboli = await loadSimboli()
    },
    btnDelete: async function (event) {
      btnDelete(event)
      this.editForm = false
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
  // document.getElementById('idModal').style.display='none';

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
  // document.getElementById('idModal').style.display='none';

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
  //document.getElementById('idModal').style.display='block';
}

async function newSimbolo() {
  document.getElementById('frmTitle').innerHTML = "Aggiungi Simbolo";
  document.getElementById('frmId').value = "new";
  document.getElementById('frmSigla').value = "";
  document.getElementById('frmDescrizione').value = "";
  
  // nascondi pulsante "Elimina"
  document.getElementById('btnDelete').style.display='none';
  // attiva visualizzazione form
  //document.getElementById('idModal').style.display='block';
}
</script>

<style scoped>
@import "../css/w3.css";
.formCard {
  width: 100%;
  max-width: 600px;
}
</style>
