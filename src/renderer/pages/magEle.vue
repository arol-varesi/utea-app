<template>
  <div class="q-pa-md">
    <p v-if="error">Errore ({{errortext}}) : {{ databasePath }}</p>
    <q-table
      dense
      title="Componenti"
      :data="componenti"
      :columns="headers"
      :filter="filter"
      row-key="name" >
        <!-- Personalizzazione dello slot superiore 'top'
             - aggiunta di campo ricerca -->
        <template v-slot:top="props" class="row">
        <div class="q-table__title q-mr-md col-auto">Componenti</div>
        <q-input _borderless dense class="col" debounce="300" v-model="filter">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        </template>


    </q-table>
  </div>
</template>

<script>
  var databaseMag = require ("../js/dbMagazzino").default

export default {
  name: 'magEle',
  data: function () {
    return {
      error: false,
      errortext: "",
      databasePath: databaseMag.databasePath,
      componenti: [],
      // headers: getHeaders(type="qtable", sortable=true),
      // componenti: databaseMag.dati,
      headers: databaseMag.colonneQtable,
      icon: false,
      bar: false,
      bar2: false,
      toolbar: false,
      filter: '',
    }
  },
  methods: {
    async loadComponenti() {
      try {
        // this.componenti = await getData()
        this.componenti = await databaseMag.dati
      } catch (err) {
        this.componenti = []
        this.error = true
        this.errortext = err
      }
    }
  },
  created () {      
    this.loadComponenti()
    // add sortable to headers
  },
}
</script>

<style scoped>

</style>
