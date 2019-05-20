<template>
  <div class="q-pa-md">    
    <q-table class="my-table-header" dense
      title="Simboli"
      :data="simboli"
      :columns="columns"
      :filter="filter"
      row-key="id"
      selection= "single"
      :selected.sync="selected"      
      :loading="loading"
      no-results-label="La ricerca non ha prodotto risultati"
      rows-per-page-label="Simboli per pagina"
      :rows-per-page-options="[20,50,0]"
      :pagination.sync= "myPagination"
      @selection="editSimbolo"
      >

        <!-- Personalizzazione dello slot superiore 'top'
             - aggiunta di campo ricerca
             - aggiunto pulsante 'aggiungi simbolo'
             - aggionta pulsante 'fullscreen'  -->
        <template v-slot:top="props" class="row">
        <div class="q-table__title q-mr-md col-auto">Simboli</div>
        <q-input _borderless dense class="col" debounce="300" v-model="filter">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-space />
        <q-btn _flat dense _color="primary" class="q-ml-md" 
          _icon="far fa-plus-square" 
          label="Aggiungi Simbolo" no-caps

          :disable="loading" 
          @click="newSimbolo()" 
          ></q-btn>
        <q-btn flat round dense class="q-ml-md"
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"></q-btn>
        </template>

        <!-- Personalizzazione dello slot 'body' per personalizzare la gestione
             della editing della riga, aggiunta selezione sotto forma di icona 
             'edit' e forzatura deselezione della linea che comunque genera
             comunque l'evento 'selection' che opportunamente intercettato
             attiva form di editing -->
        <template v-slot:body="props" >
            <q-tr :props="props">
              <template >
                <q-td auto-width>
                  <q-btn cursor-pointer size="xs" dense flat icon="edit" @click="props.selected = false"></q-btn>
                </q-td>
                <q-td key="sigla" :props="props" >{{ props.row.sigla }}</q-td>
                <q-td key="descrizione" :props="props">{{ props.row.descrizione.testo }}</q-td>
              </template>
            </q-tr>
        </template>
    </q-table>
    
    <!-- Form inserimento tramite l'uso del componente 'formSimbolo' -->
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
const { DescSimbolo } = require('../../../models/specifiche_db/entity/DescSimbolo');
const { TradSimbolo } = require('../../../models/specifiche_db/entity/TradSimbolo')
const { Lingua } = require('../../../models/specifiche_db/entity/Lingua')
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
      selected: [],
      loading: true,
      filter: '',
      editForm: false,
      selectedSimbolo: null,
      columns: [
        { name: 'sigla', label: 'Sigla', field: row => row.sigla, align: 'left', sortable: true , style: "width: 60px"},
        { name: 'descrizione', label: 'Descrizione', field: row => row.descrizione.testo, align: 'left', sortable: false},
      ],
      myPagination: {
        rowsPerPage: 20
      }
    }
  },
  components: {
    formSimbolo,
  },
  methods: {
    editSimbolo: function(props) {
      this.selectedSimbolo = props.rows[0].id
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
      this.loading = true
      this.simboli = await Simbolo.find()
      this.loading = false
    },
  },
  created () {
    if (connection == null) {
      getConnectionOptions("default").then(async connectionOptions => {
        Object.assign(connectionOptions, {database: databasePath});
        Object.assign(connectionOptions, {entities: [Simbolo, DescSimbolo, TradSimbolo, Lingua]});
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

<style>
.formCard {
  width: 100%;
  max-width: 600px;
} 

.my-table-header .q-table__middle {
    max-height: 800px;
} 

/* Colore di sfondo di Header e Footer  */
.my-table-header .q-table__top,
.my-table-header .q-table__bottom,
.my-table-header thead tr:first-child th {
    background-color: #3cc3f8;
}

/* Colore di sfondo della prima colonna */
.my-table-header td:first-child,
.my-table-header td:first-child + td {
  background-color: #d0d0d0;
}

.my-table-header thead tr:first-child th {
    position: sticky;
    top: 0;
    opacity: 1;
    z-index: 1;
} 
</style>
