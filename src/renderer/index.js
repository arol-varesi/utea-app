'use strict';

const Quasar = require('quasar/dist/quasar.umd')
import VueRouter from 'vue-router'
import Vue from 'vue'

import "@quasar/extras/material-icons/material-icons.css"
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css"
import "@quasar/extras/ionicons-v4/ionicons-v4.css"
import "@quasar/extras/mdi-v3/mdi-v3.css"
import "quasar/dist/quasar.min.css"
import "./css/w3.css"
import "./css/app.css"

Quasar.lang.set(Quasar.lang.it) 
Quasar.iconSet.set(Quasar.iconSet.fontawesomeV5) 

const { MagEle } = require('./pages/MagEle')
const { TestQuasar } = require('./pages/testquasar')
const { ComponentA }  = require('./pages/prova') 

const routes = [
  { path: '/mag', component: MagEle },
  { path: '/testquasar', component: TestQuasar },
  { path: '/simboli',  component: ComponentA }
]

const router = new VueRouter({
  routes: routes
})

document.getElementById('app').innerHTML = 
`<h1> Prova importazione</h1>
<p> {{versions.electron}} </p>     
<div>
  <ul>
    <li><router-link to="/simboli" >Simboli</router-link></li>
    <li><router-link to="/testquasar">TestQuasar</router-link></li>
    <li><router-link to="/mag">Magazzino</router-link></li>
  </ul>
  <div>
    <router-view></router-view>
  </div>
</div> 
`
Vue.use(VueRouter)

const app = new Vue({
  router,
  data:{
    versions:{electron:process.versions.electron,electronWebpack:require('electron-webpack/package.json').version}
  }
}).$mount('#app')

