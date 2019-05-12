<template>
  <q-page>
    <div class="q-mx-md">
        <h4 class="q-mt-none q-mb-sm">Informazioni sull'applicazione</h4>
      <q-card  class="electron-card shadow-8">
        <div class="gt-xs">
          <q-card-section>
            <div class="text-h6">Electron</div>
          </q-card-section>
        <q-separator />
        </div>
        <q-list>
          <q-item v-for="(info, index) in infos" :key="index">
            <q-item-section avatar>
              <q-icon :name="info.icon"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{info.label}}</q-item-label>
              <q-item-label caption>{{ info.value }}</q-item-label>
              </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
</q-page>
</template>

<script>
const {app, process} = require('electron').remote
import  Vue  from 'vue'

export default {
  name: 'Info', 
  data () {
    return {
      infos: [
        {label: "Node.js version", value: process.version, icon: "ion-logo-nodejs"},
        {label: "Electron version", value: process.versions.electron, icon: "mdi-alert-circle-outline"},
        {label: "Chrome version", value: process.versions.chrome, icon: "fab fa-chrome"},
        {label: "Vue version", value: Vue.version, icon: "ti-hand-point-up"},
        {label: "Quasar version", value: this.$q.version, icon: "ti-hand-point-up"},
        {label: "appName", value: app.getName(), icon: "eva-shield-outline"},
        {label: "appVersion", value: app.getVersion(), icon: "ion-logo-npm"},
        {label: "appPath" , value: app.getAppPath(), icon: "folder"},
        {label: "userData" , value: app.getPath('userData'), icon: "folder"},
      ]
    }
  }
}
</script>

<style scoped>
.electron-card {
  color:indigo;
}
</style>
