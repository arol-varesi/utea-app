'use strict';

const electron = require ('electron');
const { app, BrowserWindow, ipcMain } = electron;
const url = require('url');
const path = require('path');
const typeorm = require('typeorm');
const { createConnection, getRepository, getConnectionOptions} = typeorm;

const __appdirname = path.normalize(path.join(__dirname,"../app"));

var mainWindow = null;    // finestra principale
var simboliWindow = null;   // finestra di Info sull'applicazione

exports.openSimboliWindow = openSimboliWindow;
exports.openMainWindow = openMainWindow;
exports.connectDatabase = connectDatabase;

// When the 'electron' app is ready
app.on('ready', () => {
  openMainWindow();
});

// Crea la connessione verso il database

async function connectDatabase(){
  // legge la configurazione dal file "ormconfig"
  const connectionOptions = await getConnectionOptions("default");
  // modifica la posizione del database 
  let databasePath = app.getPath("appData") + "/database.sqlite";
  console.error(databasePath)
  Object.assign(connectionOptions, {database: databasePath});
  const connection = await createConnection(connectionOptions);
}

function openMainWindow() {
  if (mainWindow) {
    mainWindow.focus();
    return;
  }
  mainWindow = new BrowserWindow({
    width: 800
  });
  // carica il file HTML
  mainWindow.loadURL(url.format({
    pathname: __appdirname + "/mainWindow.html",
    protocol: "file:",
    slashes: true
  }));
  // libera la memoria in caso di chiusura
  mainWindow.on('closed', () => {
    mainWindow = null
  }); 
}



function openSimboliWindow() {
  if (simboliWindow) {
    simboliWindow.focus();
    return;
  }

  simboliWindow = new BrowserWindow()

  simboliWindow.on('closed', function() {
    simboliWindow = null;
  })
  
  // activate Vue-devTools
  if (process.env.NODE_ENV !== 'production'){
  //  require('vue-devtools').install()
    // simbolWindow.toggleDevTools();
  }

  simboliWindow.loadURL(url.format({
    pathname: __appdirname + "/simboli.html",
    protocol: "file:",
    slashes: true
  }));
 
}
