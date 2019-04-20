const { TestQuasar } = require('./pages/testquasar')
const { ComponentA }  = require('./pages/prova') 

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
  { path: '/testquasar', component: TestQuasar },
  { path: '/simboli',  component: ComponentA }
]

const router = new VueRouter({
  routes: routes
})

const app = new Vue({
  router
}).$mount('#app')

