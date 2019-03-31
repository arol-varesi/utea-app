
// import Vue from 'vue';
//import Vuetify from 'vuetify';

const typeorm = require('typeorm');
const { createConnection, getConnection, getConnectionOptions} = typeorm;
const { codificati } = require('../models/magazzino_ele/codificati');

const mainProcess = require('electron').remote.require('../main/index')

Vue.use(Vuetify);


async function loadComponenti() {
  componenti = await getConnection("magazzinoEle").getRepository(codificati).find();
  return componenti
}

// -------------------------------------
// Vue.js instanza #app
var VueApp = new Vue({
  el: "#app",
  data: {
    componenti: [], 
    headers: [
      { text: 'ArolCode', value: 'ArolCode' },
      { text: 'Descrizione', value: 'Description'},
      { text: 'Manufacturer', value: 'Manufacturer'},
      { text: 'CommercialCode', value: 'CommercialCode'}
    ],
    mieidati: [
      {
        ArolCode: "B1",
        Descrizione: "Mancanza tappi",
        Manufacturer: "IFM",
        CommercialCode: "BRT456"
      },
      {
        ArolCode: "SQ15",
        Descrizione: "dajhkjds dfssfdf",
        Manufacturer: "IFM",
        CommercialCode: "BRT456"
      },
      {
        ArolCode: "B21",
        Descrizione: "ManPoistrecanza tapsdfsdfpi",
        Manufacturer: "OMRON",
        CommercialCode: "OMR65412"
      },
      {
        ArolCode: "TR1",
        Descrizione: "Trasformatore tappi",
        Manufacturer: "POIL",
        CommercialCode: "TR34WE78"
      }
    ]
  }
})
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^



// -------------------------------------
// Crea la connessione verso il database
createConnection("magazzinoEle").then(async connection => {
  VueApp.componenti = await connection.getRepository(codificati).find();
})
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


Vue.component('button-counter', {
  data: function() {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">Mi hai premito {{count}} volte. </button>'
})

Vue.component('table-componenti', {
  data: function() {
    return {
      componenti: []
    }
  },
  template:
  ` 
  <div> 
    {{data}}
    <table class="w3-table w3-bordered w3-margin-top">
      <thead>                 
        <th>ArolCode</th>
        <th>Descrizione</th>
        <th>Manufacturer</th>
        <th>CommercialCode</th>
      </thead>
      <tbody>
        <tr v-for="componente in compdata" :key="componente.ID">
          <td>{{componente.ArolCode}}</td>
          <td>{{componente.Description}}</td>
          <td>{{componente.Manufacturer}}</td>
          <td>{{componente.CommercialCode}}</td>
        </tr>          
      </tbody>
    </table>
  </div>  
  `
})