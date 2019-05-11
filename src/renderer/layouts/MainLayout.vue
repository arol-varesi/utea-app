<template>
  <q-layout view="lHh Lpr lFf" style="height: 400px" class="shadow-2 rounded-borders">
    <q-header elevated>
      <q-bar>
        <q-icon name="laptop_chromebook"></q-icon>
        <div>UTEA App</div>

        <q-space></q-space>
        <q-btn dense flat icon="minimize"></q-btn>
        <q-btn dense flat icon="crop_square"></q-btn>
        <q-btn dense flat icon="close"></q-btn>
      </q-bar>

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
        <!-- Il seguente menu viene creato automaticamente a partire da quanto definito in routes -->
        <div class="q-mr-md cursor-pointer non-selectable">
          Pagine 
          <q-menu>
            <q-list dense style="min-width: 100px">
              <div v-for="pagina in pages" :key='pagina.index'>
                <q-item dense v-if='pagina.menu === "Pagine"' clickable v-close-popup :to='pagina.path' >
                  <q-item-section>{{pagina.name}}</q-item-section>
               </q-item> 
              </div>
           </q-list>
          </q-menu>
        </div>
        <q-space></q-space>
        <div class="q-ml-md cursor-pointer non-selectable">
          ?
          <q-menu auto-close>
            <q-list dense>
              <q-item clickable v-close-popup to='/info'>
                <q-item-section>Info</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import routes from '../router/routes'
let pages = routes[0].children
export default {
  name: 'MainLayout',
  data () {
    return {
      name: "layout",
      pages: pages
    }
  }

}
</script>

<style>
</style>
