/**
 * ALL THE IMPORT FOR QUASAR FRAMEWORK (UMD Version)
 * 
 **/

import Vue from 'vue'
import Quasar from 'quasar/dist/quasar.umd'

//import '@quasar/extras/roboto-font/roboto-font.css'
// Fonts library import!!!
import "@quasar/extras/material-icons/material-icons.css" // prefix: none
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css" // prefix: fa[s,r,l,b] fa-
import "@quasar/extras/ionicons-v4/ionicons-v4.css" // prefix: ion-, ion-md-, ion-ios, ion-logo
import "@quasar/extras/mdi-v3/mdi-v3.css" // prefix: mdi-
import "@quasar/extras/eva-icons/eva-icons.css" // prefix: eva-
import "@quasar/extras/themify/themify.css" // prefix: ti-

import "quasar/dist/quasar.min.css"

Quasar.lang.set(Quasar.lang.it) 
Quasar.iconSet.set(Quasar.iconSet.fontawesomeV5) 

Vue.use(Quasar)
