<template>
  <q-card class="formCard">
    <q-card-section class="row items-center">
      <q-toolbar class="bg-primary glossy text-white">
        <q-toolbar-title id="frmTitle">{{title}}</q-toolbar-title>
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
      <q-input filled
        v-model="frmSigla"
        label="Sigla"
        :rules="[val => validaSigla()]" />
      
      <q-input filled class="q-my-sm"
        v-model="frmDescrizione"
        label="Descrizione" />

      <q-input filled dense class="q-my-xs"
        v-for="tr in frmTraduzione" :key="tr.idLingua" 
        v-model="tr.traduzione"
        :label="tr.lingua"
        ></q-input>

      <div class="row">
        <q-btn label="Salva" type="submit" color="secondary"></q-btn>
        <q-btn v-if="isEditing" label="Undo" @click="btnUndo()" color="secondary" flat class="q-ml-sm" ></q-btn>
        <q-space />
        <q-btn v-if="isEditing" label="Elimina" @click.prevent="deleteConfirm = true" color="negative"></q-btn>
      </div>
    </q-form>
    </q-card-section>
    <q-dialog v-model="deleteConfirm" persistent>
      <q-card>
        <q-card-section>
          <span class="q-ml-sm">Confermi eliminazione del simbolo: {{frmSigla}} ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annulla" color="primary" v-close-popup />
          <q-btn flat label="Conferma" color="primary" v-close-popup @click="btnDelete()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
const { Simbolo, DescSimbolo, TradSimbolo, Lingua } = require('../js/dbSpecifiche') 
//const { DescSimbolo } = require('../../../models/specifiche_db/entity/DescSimbolo');


export default {

  name: 'formSimbolo',
  props: [
    'simboloID',
  ],   
  data () {
    return {
      lingue: [],
      title: "",
      isEditing: false,
      frmID: null,
      frmSigla: null,
      frmDescrizione: null,
      frmTraduzione: [],
      deleteConfirm: false
    }
  },
//  watch: {
//    simboloID: async function (value) {
//      // this.loadForm()
//    },
//  },

  created: async function () {
    this.lingue = await Lingua.find() 
    this.loadForm()
  },
  methods: {
    btnSave: async function (event) {
            // Check for correctness of values
      let simb = (this.frmID === null) ? new Simbolo : await Simbolo.findOne({id: this.frmID})
      let desc = (this.frmID === null) ? new DescSimbolo : simb.descrizione
      desc.testo = this.frmDescrizione
      await desc.save()
      simb.descrizione = desc
      simb.sigla = this.frmSigla
      await simb.save()
      // salva tutte le traduzioni 
      this.frmTraduzione.forEach(async tr => {
        let trad = (tr.idTrad === null) ? new TradSimbolo : desc.traduzioni.find(item => item.id === tr.idTrad) 
        trad.descrizione = desc
        trad.lingua = await Lingua.findOne({id: tr.idLingua})
        trad.traduzione = tr.traduzione
        await trad.save()
      })
      this.$q.notify("Salvato Simbolo: " + simb.id + " - " + simb.sigla)
      this.$emit("save")
    },
    btnDelete: async function (event) {      
      if (this.frmID !== null){        
        let simb = await Simbolo.findOne({id: this.frmID})
        let desc = simb.descrizione
        let sigla = simb.sigla
        desc.traduzioni.forEach(async tr => {
          await tr.remove()
        })
        await simb.remove()
        await desc.remove()
        this.$q.notify("Eliminato simbolo: " + sigla + " !!")
        this.$emit('delete')
      }
    },
    btnUndo: async function () {
      this.loadForm()
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
    } ,
    loadForm: async function () {
      if (this.simboloID !== -1) { // Nuovo Simbolo
        let simb = await Simbolo.findOne({id: this.simboloID})
        this.title = "Modifica Simbolo"
        this.frmID = simb.id
        this.frmSigla = simb.sigla
        this.frmDescrizione = simb.descrizione.testo
        this.frmTraduzione = []
        this.lingue.forEach((l) => {
          // controlla l'esistenza della Descrizione tradotta in lingua "l"
          let trad = simb.descrizione.traduzioni.find(item => item.lingua.id === l.id)
          if (trad) {
            // traduzione già esistente
            this.frmTraduzione.push({idTrad: trad.id, idLingua: trad.lingua.id , traduzione: trad.traduzione, lingua: trad.lingua.nomeIta})
          } else {
            // traduzione non esistente
            this.frmTraduzione.push({idTrad: null, idLingua: l.id,  traduzione: "", lingua: l.nomeIta})
          }
        })
        this.isEditing = true
      } else {
        this.title = "Aggiunta Simbolo"
        this.frmID = null
        this.frmSigla = null
        this.frmDescrizione = null
        this.frmTraduzione = []
        this.lingue.forEach((l) => {
          this.frmTraduzione.push({idTrad: null, idLingua: l.id,  traduzione: "", lingua: l.nomeIta})
        })
        this.isEditing = false
      }
    },
  }
}
</script>


<style scoped>
.formCard {
  width: 100%;
  max-width: 600px;
}
</style>
