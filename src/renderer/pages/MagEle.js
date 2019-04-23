const {getData, getHeaders} = require("../js/databaseMag")

var MagEle = {
  data: function () {
    return {
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
      this.componenti = await getData()
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
  </div>
  `
}
exports.MagEle = MagEle
