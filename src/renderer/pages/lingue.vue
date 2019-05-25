<template>
  <div class="q-pa-md">    
    <q-table class="my-table-header" dense
      title="Lingue"
      :data="lingue"
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
      @selection="editLingua"
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
          label="Aggiungi Lingua" no-caps

          :disable="loading" 
          @click="newLingua()" 
          ></q-btn>
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
                <q-td key="nomeIta" :props="props">{{ props.row.nomeIta }}</q-td>
                <q-td key="nome" :props="props">{{ props.row.nome }}</q-td>
              </template>
            </q-tr>
        </template>
    </q-table>
    
    <!-- Form inserimento tramite l'uso del componente 'formLingua' -->
    <q-dialog v-model="editForm" 
      transition-show = "slide-down" 
      transition-hide = "slide-up">
      <!-- Forza la creazione del componente con l'uso del v-if 
        --  così viene ricreata da nuovo e elimita le latenze
        --  dovute ai tempi di aggiornamento del parametro simboloID -->
      <form-lingua
          v-if="editForm"
          :linguaID = "selectedLingua" 
          @save = "editForm = false; updateTable()"
          @delete = "editForm = false; updateTable()">
      </form-lingua>  
    </q-dialog>
  </div>
</template>


<script>
import formLingua from '../components/formLingua.vue'

const { Lingua, connectDB } = require('../js/dbSpecifiche')

export default {
  data () {
    return {
      lingue: [],
      selected: [],
      loading: true,
      filter: '',
      editForm: false,
      selectedLingua: null,
      columns: [
        { name: 'sigla', label: 'Lingua', field: row => row.sigla, align: 'left', sortable: true , style: "width: 60px"},
        { name: 'nomeIta', label: 'Nome (italiano)', field: row => row.nomeIta, align: 'left', sortable: false},
        { name: 'nome', label: 'Nome (in lingua)', field: row => row.nome, align: 'left', sortable: false},
      ],
      myPagination: {
        rowsPerPage: 0
      }
    }
  },
  components: {
    formLingua,
  },
  methods: {
    editLingua: function(props) {
      this.selectedLingua = props.rows[0].id
      this.editForm = true
    },
    newLingua: async function (event) {
      this.selectedLingua = -1
      this.editForm = true
    },
    btnCancel: function (event) {
      this.editForm = false
    },
    updateTable: async function () {
      this.loading = true
      this.lingue = await Lingua.find()
      this.loading = false
    },
  },
  created: async function () {
    connectDB().then(() => {
      this.updateTable()
    })
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
