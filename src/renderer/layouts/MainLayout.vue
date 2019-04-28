

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
        <div class="cursor-pointer non-selectable">
          Open
          <q-menu>
            <q-list dense style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>
                  <router-link tag="q-item-section" to="/simboli" >Simboli</router-link>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <router-link tag="q-item-section" to="/testquasar">TestQuasar</router-link>
                </q-item-section>
              </q-item> 
              <q-item clickable v-close-popup>
                <q-item-section>
                  <router-link tag="q-item-section" to="/mag">Magazzino</router-link>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
        <div class="q-ml-md cursor-pointer non-selectable">
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
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      name: "layout"
    }
  }
}
</script>

<style>
</style>
