// BEGIN import-quasar.js
const Vue = require('vue/dist/vue')


const { Quasar, 
         QLayout, 
         QHeader, 
         QDrawer, 
         QPageContainer,
         QPage,
         QToolbar,
         QToolbarTitle, 
         QBtn, 
         QIcon, 
         QList, 
         QItem, 
         QItemSection, 
         QItemLabel, 
         Ripple, 
         Notify} 
         =  require('quasar')

Vue.use(Quasar, { 
  config: {},
  components: { QLayout,
                QHeader,
                QDrawer,
                QPageContainer,
                QPage,
                QToolbar,
                QToolbarTitle,
                QBtn,
                QIcon,
                QList,
                QItem,
                QItemSection,
                QItemLabel},
  directives: {Ripple},
  plugins: {Notify} 
})
// END import-quasar.js

require('./pages/prova.js')

const app = {
  el: '#q-app'
}
var VueApp = new Vue(app)