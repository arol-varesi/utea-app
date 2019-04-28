const {getData, getHeaders} = require("../js/databaseMag")

var MagEle = {
  data: function () {
    return {
      error: false,
      errortext: "",
      componenti: [],
      headers: getHeaders(type="qtable", sortable=true),
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
      } catch (err){
        this.error = false
        this.errortext = err
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
    <q-table
      title="Componenti"
      :data="componenti"
      :columns="headers"
      row-key="name" >
    </q-table>
    <div v-if="error">
      Error apertura Database: {{errortext}}
    </div>
  </div>
  `
}
exports.MagEle = MagEle
