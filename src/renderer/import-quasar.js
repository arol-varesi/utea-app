/**
 * ALL THE IMPORT FOR QUASAR FRAMEWORK (UMD Version)
 * 
 **/

import Vue from 'vue'
import Quasar from 'quasar/dist/quasar.umd'

// import '@quasar/extras/roboto-font/roboto-font.css'

import "@quasar/extras/material-icons/material-icons.css"
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css"
import "@quasar/extras/ionicons-v4/ionicons-v4.css"
import "@quasar/extras/mdi-v3/mdi-v3.css"
import "quasar/dist/quasar.min.css"

Quasar.lang.set(Quasar.lang.it) 
Quasar.iconSet.set(Quasar.iconSet.fontawesomeV5) 

Vue.use(Quasar)
