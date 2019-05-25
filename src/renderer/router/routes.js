/**
 * routes.js
 * ---------
 * Apportare a questo file tutte le modifiche necessarie aggiungendo tutti 
 * i link utilizzati dal router
 * 
 **/

const routes = [
  { path: '/preferenze',
  component: () => import("../pages/preferenze.vue")},
  { path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      { menu: 'Pagine',
        name: 'Componenti', 
        path: 'mag', 
        component: () => import('../pages/magEle.vue')},
      { menu: 'Pagine',
        name: 'TestQuasar', 
        path: 'testquasar', 
        component: () => import('../pages/testquasar.vue') },
      { menu: 'Pagine',
        name: 'Simboli',
        path: 'simboli',  
        component: () => import('../pages/simboli.vue')},
      { menu: 'Sistema',
        name: 'Lingue',
        path: 'lingue',  
        component: () => import('../pages/lingue.vue')},
      { menu: '?',
        name: 'Info',
        path: 'info', 
        component: () => import("../pages/info.vue")},
    ]
  }
]

export default routes
