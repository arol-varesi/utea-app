
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
      <q-input
        filled
        v-model="frmLingua"
        label="Lingua"
        mask="AAA"
        :rules="[val => validaLingua()]" />
      
      <q-input
        filled
        v-model="frmNomeITA"
        label="Nome (italiano)" />
      
      <q-input
        filled
        v-model="frmNome"
        label="Nome (in lingua)" />

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
          <span class="q-ml-sm">Confermi eliminazione della lingua {{frmSigla}} ?</span>
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
const { Lingua } = require('../js/dbSpecifiche') 

export default {

  name: 'formLingua',
  props: [
    'linguaID',
  ],   
  data () {
    return {
      title: "",
      isEditing: false,
      frmID: null,
      frmLingua: null,
      frmNomeITA: null,
      frmNome: null,
      deleteConfirm: false
    }
  },

  created: async function () {
    this.loadForm()
  },
  methods: {
    btnSave: async function (event) {
            // Check for correctness of values
      let lingua = (this.frmID === null) ? new Lingua : await Lingua.findOne({id: this.frmID})
      lingua.sigla = this.frmLingua
      lingua.nomeIta = this.frmNomeITA
      lingua.nome = this.frmNome
      await lingua.save()
      this.$q.notify("Salvata Lingua: " + lingua.id + " - " + lingua.sigla)
      this.$emit("save")
    },
    btnDelete: async function (event) {      
      if (this.frmID !== null){        
        let lingua = await Lingua.findOne({id: this.frmID})
        let sigla = lingua.sigla
        await lingua.remove()
        this.$q.notify("Eliminata lingua " + sigla + " !!")
        this.$emit('delete')
      }
    },
    btnUndo: async function () {
      this.loadForm()
    },
    validaLingua: async function () {
      if (this.frmLingua){
        let stessaLingua= await Lingua.findOne({sigla: this.frmLingua})
        if (!stessaLingua) {
          return true
        } else if (stessaLingua.id != this.frmID) {
          return 'Lingua già presente!'
        } else {
          return true
        }
      } else { 
        return 'Campo obbligatorio!'
      }
    } ,
    loadForm: async function () {
      if (this.linguaID !== -1) { // Nuovo Simbolo
        let lingua = await Lingua.findOne({id: this.linguaID})
        this.title = "Modifica Lingua"
        this.frmID = lingua.id
        this.frmLingua = lingua.sigla
        this.frmNomeITA = lingua.nomeIta
        this.frmNome = lingua.nome
        this.isEditing = true
      } else {
        this.title = "Aggiunta Lingua"
        this.frmID = null
        this.frmLingua = null
        this.frmNomeITA = null
        this.frmNome = null
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
