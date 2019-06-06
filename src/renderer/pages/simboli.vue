<template>
  <div class="q-pa-md">    
    <q-table class="my-table-header" dense
      title="Simboli"
      :data="simboli"
      :columns="columns"
      :visible-columns="visibleColumns"
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
        <q-select class="q-ml-md" outlined
          v-model="visibleColumns"
          multiple flat dense _borderless options-dense
          emit-value
          map-options
          display-value="Lingue"
          :options="selectOptions"
          ></q-select>
        <q-space />
        <q-btn flat round dense class="q-ml-md"
          icon="fas fa-file-download"
          @click="saveCsv">
          <q-tooltip>Esporta CSV</q-tooltip>
        </q-btn>
        <q-btn flat round dense class="q-ml-md" 
          icon="add_circle_outline"
          :disable="loading" 
          @click="newSimbolo()" >
          <q-tooltip>Aggiungi Simbolo</q-tooltip>
        </q-btn>
        <q-btn flat round dense class="q-ml-md"
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen">
          <q-tooltip>{{props.inFullscreen ? 'Schermo Normale' : 'Fullscreen'}}</q-tooltip>
        </q-btn>
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
                <!-- <q-td v-for="l in lingue" :key="l.sigla" :props="props"> {{ props.row.descrizione.traduzioni.find(item => item.lingua.id === l.id).traduzione }}</q-td> -->
                <q-td v-for="l in lingue" :key="l.sigla" :props="props"> {{ props.row[l.sigla] }}</q-td>
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
          @save = "updateTable()"
          @delete = "updateTable()">
      </form-simbolo>  
    </q-dialog>
  </div>
</template>


<script>
import formSimbolo from '../components/formSimbolo.vue'

const { Simbolo, DescSimbolo, Lingua, TradSimbolo, connectDB } = require('../js/dbSpecifiche')

const createCsvWriter = require('csv-writer').createObjectCsvWriter

export default {
  name : "pageSimboli",
  data () {
    return {
      selectOptions: [],
      lingue: [],
      //traduzioni : [],
      simboli: [],
      selected: [],
      loading: true,
      filter: '',
      editForm: false,
      selectedSimbolo: null,
      visibleColumns: [],
      columns: [
        { name: 'sigla', label: 'Sigla',required: true, field: row => row.sigla, align: 'left', sortable: true , style: "width: 60px"},
        { name: 'descrizione', label: 'Descrizione',required: true, field: row => row.descrizione.testo, align: 'left', sortable: false},
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
    editSimbolo: async function(props) {
      this.selectedSimbolo = props.rows[0].id
      this.editForm = true
    },
    newSimbolo: async function (event) {
      this.selectedSimbolo = null // con selectedSimbolo = null -> Nuovo Simbolo
      this.editForm = true
    },
    btnCancel: function (event) {
      this.editForm = false
    },
    updateTable: async function () {
      this.loading = true
      // carica i simboli
      this.simboli = await Simbolo.find()
      //this.simboli = await simboloRep.find()
      //this.traduzioni = await TradSimbolo.find()
      // in ogni simbolo vengono aggiunte le traduzioni nelle lingue presenti
      this.simboli.forEach (async simb => {
        let trads = await TradSimbolo.find({descrizione: simb.descrizione.id})
        trads.forEach(trad => {
          this.$set(simb, trad.lingua.sigla, trad.traduzione)
          // simb[trad.lingua.sigla] = trad.traduzione
        })
        this.$set(simb, "ITA", simb.descrizione.testo)
      })
      // this.simboli = await dbSpecifiche.simboli
      this.loading = false
      // chiude l'eventuale form attivo
      this.editForm = false
      // this.$q.notify({position: "top-right", message: "DEBUG: Force UPDATE"})

    },
    saveCsv: function () {
      let heads = [ 
        {id: 'sigla', title: 'Sigla'},
        {id: 'ITA', title: 'ITA'}
      ]
      this.lingue.forEach(l => {
        let h = {id: l.sigla, title: l.sigla}
        heads.push(h)
      })
      const csvWriter = createCsvWriter({
        path: 'simboli.csv',
        header: heads,
        fieldDelimiter: ';',
      })
      csvWriter.writeRecords(this.simboli)
        .then(() => {
            this.$q.notify({position: "top-right", message: "CSV Esportato"})
        })
    },
  },
  created: async function () {
      let connect = await connectDB()
      // simboloRep = connect.getRepository(Simbolo)
      this.lingue = await Lingua.find()
      // this.traduzioni = await TradSimbolo.find()
      this.lingue.forEach((l) => {
        // Aggiungi le lingue nelle colonne della tabella
        let col = {name: l.sigla, label: l.nomeIta}
        this.columns.push(col)
        // Aggiungi le lingue nelle opzioni di vilualizzazione delle colonne
        let opt = {value: l.sigla, label: l.nomeIta}
        this.selectOptions.push(opt)
      })
    //connectDB().then(() => {
      this.updateTable()
    //})
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
