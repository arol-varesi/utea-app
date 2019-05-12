<template>
  <div class="q-my-none q-mx-sm">
    <h6>Preferenze</h6>
    {{store}}
    <ul>
      <li>width = {{ width }}</li>
      <li>height = {{ height }}</li>
    </ul>
  </div>
</template>

<script>
const {app, process} = require('electron').remote
const Store = require('../../common/store')

const store = new Store({
  consigName: 'user-preferences',
  defaults: {}
})

let { width, height } = store.get('windowBounds')
  
export default {
  name: 'Info', 
  data () {
    return { 
      store: store,
      width : width,
      height : height
    }
  },
}
</script>

<style scoped>
</style>
