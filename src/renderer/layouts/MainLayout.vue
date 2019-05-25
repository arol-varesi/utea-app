<template>
  <q-layout view="lHh Lpr lFf" class="rounded-borders">
    <q-header elevated>
      <!-- <q-bar style="-webkit-app-region: drag">
        <q-icon name="laptop_chromebook"></q-icon>
        <div>UTEA App</div>

        <q-space></q-space>
        <div style="-webkit-app-region: no-drag">
          <q-btn dense flat icon="minimize" @click="minimize"><q-tooltip>riduci a icona</q-tooltip></q-btn>
          <q-btn v-if="isMaximized" dense flat icon="far fa-window-restore" @click="unmaximize"><q-tooltip>dimensione normale</q-tooltip></q-btn>
          <q-btn v-else dense flat icon="far fa-window-maximize" @click="maximize"><q-tooltip>schermo intero</q-tooltip></q-btn>
          <q-btn dense flat icon="close" @click="close"><q-tooltip>chiudi</q-tooltip></q-btn>
        </div>
      </q-bar> -->

      <div class="q-pa-sm q-pl-md row items-center">
        <div class="q-mr-md cursor-pointer non-selectable">
          Edit
          <q-menu auto-close>
            <q-list dense style="min-width: 100px">
              <q-item clickable>
                <q-item-section>Cut</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Copy</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Paste</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>Select All</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
        <!-- I seguenti menu vengono creati automaticamente a partire da quanto definito in routes -->
        <menu-list
          menuName="Pagine">
        </menu-list>       
        <menu-list
          menuName="Sistema">
        </menu-list>       
        <q-space></q-space>
        <menu-list
          menuName="?">
        </menu-list> 
        <!-- <div class="q-ml-md cursor-pointer non-selectable">
          ?
          <q-menu auto-close>
            <q-list dense>
              <q-item clickable v-close-popup to='info'>
                <q-item-section>Info</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div> -->
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer></q-footer>
  </q-layout>
</template>

<script>
const thisWindow = require('electron').remote.getCurrentWindow()
import routes from '../router/routes'
import menuList from '../components/menuList.vue'
let pages = routes[1].children
export default {
  name: 'MainLayout',
  data () {
    return {
      name: "layout",
      pages: pages,
      isMaximized: thisWindow.isFullScreen()
    }
  },
  components: {
    menuList,
  },
  methods: {
     minimize: function () {
       thisWindow.minimize()
     },
     maximize: function () {
       thisWindow.setFullScreen(true)
       this.isMaximized = thisWindow.isFullScreen()
     },
     unmaximize: function () {
       thisWindow.setFullScreen(false)
       this.isMaximized = thisWindow.isFullScreen()
     },
     close: function () {
       thisWindow.close()
     }
  }
}
</script>

<style>
</style>
