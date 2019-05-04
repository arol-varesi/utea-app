const {getData, getHeaders} = require("../js/databaseMag")
var databaseMag = require ("../js/databaseMag").default


var MagEle = {
  data: function () {
    return {
      error: false,
      databasePath: databaseMag.databasePath,
      componenti: [],
      // headers: getHeaders(type="qtable", sortable=true),
      // componenti: databaseMag.dati,
      headers: databaseMag.colonneQtable,
      icon: false,
      bar: false,
      bar2: false,
      toolbar: false,
    }
  },
  methods: {
    async loadComponenti() {
      try {
        this.componenti = await getData()
 //         this.componenti = await databaseMag.dati
      } catch {
        this.componenti = []
        this.error = true
      }
    }
  },
  created () {      
    this.loadComponenti()
    // add sortable to headers
  },
  template:
  `
  <div class="q-pa-md">
    <p v-if="error">Errore !!! : {{ databasePath }}</p>
    <q-table
      title="Componenti"
      :data="componenti"
      :columns="headers"
      row-key="name" >
    </q-table>
  </div>
  `
}
exports.MagEle = MagEle
