/**
 * routes.js
 * ---------
 * Apportare a questo file tutte le modifiche necessarie aggiungendo tutti 
 * i link utilizzati dal router
 * 
 **/

const { MagEle } = require('../pages/MagEle')
const { TestQuasar } = require('../pages/testquasar')
const { ComponentA }  = require('../pages/prova') 

const routes = [
  { path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
//      { path: '', component: () => import('pages/Index.vue') }
      { path: '/mag', component: MagEle },
      { path: '/testquasar', component: TestQuasar },
      { path: '/simboli',  component: ComponentA },
      { path: '/info', component: () => import("../pages/info.vue")}
    ]
 }
]

export default routes
