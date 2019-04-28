/** 
 * THIS FILE IS THE ENTRY FOR THE RENDERER TASK
 * 
 **/

'use strict';
import Vue from 'vue'
import "./import-quasar"

import App from './App.vue'

import "./css/w3.css"
import "./css/app.css"

import createRouter from './router/index'

const router = createRouter()

const app = new Vue({
  el: '#app',
  router,
  
  render: h => h(App)
}).$mount('#app')

