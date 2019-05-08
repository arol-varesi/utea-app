<template>
  <div class="q-pa-md">
      <h4>Informazioni sull'applicazione</h4>
    <q-card class="electron-card">
      <q-card-section>
        <div class="text-h6">Electron</div>
      </q-card-section>
      <q-separator />
      <q-list>
         <q-item v-for="(info, name) in infos" :key="name">
          <q-item-section avatar>
            <q-icon name="folder"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{name}}</q-item-label>
            <q-item-label caption>{{ info }}</q-item-label>
            </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script>
const {app, process} = require('electron').remote

export default {
  name: 'Info', 
  data () {
    return {
      infos: {
        appData: app.getPath('appData'),
        appPath: app.getAppPath(),
        appVersion: app.getVersion(),
        appName: app.getName(),
        electronVersion: process.versions.electron,
        chromeversion: process.versions.chrome,
      }
    }
  }
}
</script>

<style scoped>
.electron-card {
 ;
}
</style>
