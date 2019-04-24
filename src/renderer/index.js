// Initial welcome page. Delete the following line to remove it.
'use strict';

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


function addScriptToDocument(src) {
  let ascript = document.createElement('script');
  ascript.setAttribute('type', 'text/javascript');
  ascript.setAttribute('src', src);
  ascript.onload=init;
  document.head.appendChild(ascript);
}

const styles=document.createElement('style');
styles.innerText=`
  @import url("../../node_modules/@quasar/extras/material-icons/material-icons.css");
  @import url("../../node_modules/@quasar/extras/fontawesome-v5/fontawesome-v5.css");
  @import url("../../node_modules/@quasar/extras/ionicons-v4/ionicons-v4.css");
  @import url("../../node_modules/@quasar/extras/mdi-v3/mdi-v3.css");
  @import url("../../node_modules/quasar/dist/quasar.min.css");
  @import url("./css/w3.css");
  @import url("./css/app.css");
  
  `;

addScriptToDocument('../../node_modules/vue/dist/vue.min.js');
addScriptToDocument('../../node_modules/vue-router/dist/vue-router.min.js');
addScriptToDocument('../../node_modules/quasar/dist/quasar.umd.min.js');
addScriptToDocument('../../node_modules/quasar/dist/lang/it.umd.min.js');

document.head.appendChild(styles);

Quasar.lang.set(Quasar.lang.it) 
Quasar.iconSet.set(Quasar.iconSet.fontawesomeV5) 

function init(){
  Vue.config.devtools=false,
  Vue.config.productionTip=false,
  new Vue({
    router,
    data:{
      versions:{electron:process.versions.electron,electronWebpack:require('electron-webpack/package.json').version}
    },
    methods:{
      open(b){
        require('electron').shell.openExternal(b)
      }
    },
    template:
    `
      <div>
        <ul>
          <li><router-link to="/simboli" >Simboli</router-link></li>
          <li><router-link to="/testquasar">TestQuasar</router-link></li>
          <li><router-link to="/mag">Magazzino</router-link></li>
        </ul>
        <div>
          <router-view></router-view>
        </div>
      </div>`
    }).$mount('#app')
}