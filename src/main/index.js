'use strict'

const { app, BrowserWindow } = require ('electron')
const url = require('url')
const path = require('path')
const Store = require('../common/store')

const isDevelopment = process.env.NODE_ENV !== 'production';

let mainWindow = null;    // finestra principale

// instanzia la classe Store utilizzata per salvare le preferenze utente
const store = new Store({
  configName: 'user-preferences',
  defaults: {
    windowBounds: { width: 800, height: 600}
  }
})

function createMainWindow(){
  // Prima di tutto recupero i valori di configurazione
  let { width, height } = store.get('windowBounds')
 
  // passo i valori alla creazione della finestra
  const window = new BrowserWindow({ width, height })
  
  
  if (isDevelopment) {
    window.webContents.openDevTools()
  }
  
  // carica il file HTML
  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  } else {
    window.loadURL(url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    }))
  };

  // libera la memoria in caso di chiusura
  window.on('closed', () => {
    mainWindow = null;
  }); 

  // intercetta il ridimensionamento della finestra e ne salva la dimensione nelle preferenze utente
  window.on('resize', () => {
    // l'evento resize non passa il valore della dimensione per cui è necessario utilizzare il 
    // metodo `getBounds` che restituisce height, weight e coordinate x e y
    let { width, height } = mainWindow.getBounds()
    // Ed ora li salviamo ...
    store.set('windowBounds', {width, height })
  })

  window.webContents.on('devtools-opened', () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });
  
  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow()
})
