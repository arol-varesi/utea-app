
// import Vue from 'vue';
//import Vuetify from 'vuetify';
const {getData, getHeaders} = require("./js/databaseMag")

Vue.use(Vuetify);


// -------------------------------------
// Vue.js instanza #app
var VueApp = new Vue({
  el: "#app",
  data: {
    componenti: [], 
    headers: []
  }
})
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//VueApp.headers = getHeaders("vuetify")

VueApp.headers = getHeaders("vuetify")

async function _getComponenti() {
  VueApp.componenti = await getData()
}
_getComponenti()

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