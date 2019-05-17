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
    
    <!-- Form inserimento tramite l'usp del componente 'formSimbolo' -->
    <q-dialog v-model="editForm" 
      transition-show = "slide-down" 
      transition-hide = "slide-up">
      <!-- Forza la creazione del componente con l'uso del v-if 
        --  così viene ricreata da nuovo e elimita le latenze
        --  dovute ai tempi di aggiornamento del parametro simboloID -->
      <form-simbolo
          v-if="editForm"
          :simboloID = "selectedSimbolo" 
          @save = "editForm = false; updateTable()"
          @delete = "editForm = false; updateTable()">
      </form-simbolo>  
    </q-dialog>
  </div>
</template>


<script>
import formSimbolo from '../components/formSimbolo.vue'

const { createConnection, getRepository, getConnection, getConnectionOptions} = require('typeorm')
const { Simbolo } = require('../../../models/specifiche_db/entity/Simbolo');
const { Descrizione } = require('../../../models/specifiche_db/entity/Descrizione');

const databasePath = "database.sqlite"

var connection = null

async function loadSimboli() {
  let simboli = await getConnection("default").getRepository("Simbolo").find();
  return simboli
}

export default {
  data () {
    return {
      simboli: [],
      editForm: false,
      editFormOld: false,
      selectedSimbolo: null,
    }
  },
  components: {
    formSimbolo,
  },
  methods: {
    editSimbolo: async function (event, idSimbolo) {
      this.selectedSimbolo = idSimbolo
      this.editForm = true
    },
    newSimbolo: async function (event) {
      this.selectedSimbolo = -1
      this.editForm = true
    },
    btnCancel: function (event) {
      this.editForm = false
    },
    updateTable: async function () {
      this.simboli = await Simbolo.find()
    }
  },
  created () {
    if (!connection) {
      getConnectionOptions("default").then(async connectionOptions => {
        Object.assign(connectionOptions, {database: databasePath});
        Object.assign(connectionOptions, {entities: [Simbolo, Descrizione]});
        connection = await createConnection(connectionOptions);
      }).then(() => {
        this.updateTable()
      })
    } else {
        this.updateTable()
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
