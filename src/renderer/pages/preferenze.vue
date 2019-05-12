<template>
  <div class="q-pa-md">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="name"
        label="Il tuo nome *"
        hint="Nome e Cognome"
        :rules="[ val => val && val.length > 0 || 'Prego inserire qualcosa']"
      ></q-input>
      <q-input
        filled
        class="col"
        :value="magElePath"
        type="text"
        label="DB Magazzino Elettrico"
      >
      <input type="file" ref="file" style="display: none" @change="magEleSelected($event)">
      <q-btn filled icon="folder_open" flat class="col-1" @click="$refs.file.click()"></q-btn>
      </q-input>
      <q-toggle v-model="accept" label="Accetto la licenza ed i termini"></q-toggle>
      <div>
        <q-btn label="Salva" type="submit" color="primary"></q-btn>
        <q-btn label="Reset" type="reset" color= "primary" flat calss="q-ml-sm"></q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
import magEleVue from './magEle.vue';
const {app, process} = require('electron').remote
const Store = require('../../common/store')

const store = new Store({
  consigName: 'user-preferences',
  defaults: {}
})

let { width, height } = store.get('windowBounds')
let magElePath = store.get('magElePath')
  
export default {
  name: 'Info', 
  data () {
    return { 
      name: null,
      accept: false,
      store: store,
      width: width,
      height: height,
      magElePath: magElePath,
    }
  },
  methods: {
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Per procedere devi accettare la licenza ed i termini'
        })
      }
      else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Preferenze Salvate: ' + this.magElePath
        })
      }
    },

    onReset () {
      this.name = null
      this.accept = false
    },

    magEleSelected (event) {     
      this.$q.notify({
                color: 'purple-4',
                textColor: 'white',
                icon: 'fas fa-check-circle',
                message: 'magEleSelected: '+ event.target.files[0].path
              })
      this.magElePath = event.target.files[0].path
    }
  }
}
</script>

<style scoped>
</style>
