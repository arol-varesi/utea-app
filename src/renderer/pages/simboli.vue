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
          class="q-gutter-md">

          <input v-model="frmID" style="display: none" id="frmId">
          <q-input
            filled
            v-model="frmSigla"
            label="Sigla"
            :rules="[val => validaSigla()]" />
          
          <q-input
            filled
            v-model="frmDescrizione"
            label="Descrizione" />

          <div class="row">
            <q-btn label="Salva" type="submit" color="secondary"></q-btn>
            <q-btn v-if="isEditingMode" label="Undo" @click="btnUndo()" color="secondary" flat class="q-ml-sm" ></q-btn>
            <q-space />
            <q-btn v-if="isEditingMode" label="Elimina" @click.prevent="btnDelete($event)" color="negative"></q-btn>
          </div>
        </q-form>
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
      isEditingMode: false,
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
      this.formTitle = "Modifica Simbolo"
      this.isEditingMode = true
      this.editForm = true
    },
    newSimbolo: async function (event) {
      this.frmID = null
      this.frmSigla = null
      this.frmDescrizione = null
      this.formTitle = "Aggiungi Simbolo"
      this.isEditingMode = false
      this.editForm = true
      this.simboli = await Simbolo.find()
    },
    btnCancel: function (event) {
      this.editForm = false
    },
    btnSave: async function (event) {
      // Check for correctness of values
      let simb = (this.frmID === null) ? new Simbolo : await Simbolo.findOne({id: this.frmID})
      let desc = (this.frmID === null) ? new Descrizione : simb.descrizione
      desc.testo = this.frmDescrizione
      await desc.save()
      simb.sigla = this.frmSigla
      simb.descrizione = desc
      await simb.save()
      this.editForm = false
      this.simboli = await Simbolo.find()
    },
    btnDelete: async function (event) {      
      if (this.frmID !== null){
        this.$q.notify('Elimino Simbolo:' + this.frmID)
        let simb = await Simbolo.findOne({id: this.frmID})
        let desc = simb.descrizione
        alert("Elimino dal database : "+ simb.id + ": " + simb.sigla + " ?")
        await simb.remove()
        await desc.remove()
      }
      this.editForm = false
      this.simboli = await Simbolo.find()
    },
    btnUndo: async function () {
      let simb = await Simbolo.findOne({id: this.frmID})
      this.frmSigla = simb.sigla
      this.frmDescrizione = simb.descrizione.testo
    },
    validaSigla: async function () {
      if (this.frmSigla){
        let stessaSigla = await Simbolo.findOne({sigla: this.frmSigla})
        if (!stessaSigla) {
          return true
        } else if (stessaSigla.id != this.frmID) {
          return 'Sigla già presente!'
        } else {
          return true
        }
      } else { 
        return 'Campo obbligatorio!'
      }
    }

  },
  created () {
    if (!connection) {
      getConnectionOptions("default").then(async connectionOptions => {
        Object.assign(connectionOptions, {database: databasePath});
        Object.assign(connectionOptions, {entities: [Simbolo, Descrizione]});
        const connection = await createConnection(connectionOptions);
      }).then( async () => {
        this.simboli = await Simbolo.find();
      })
    } else {
        (async () => {this.simboli = await Simbolo.find()})()
    }
  } 
}

</script>

<style scoped>
.formCard {
  width: 100%;
  max-width: 600px;
}
</style>
