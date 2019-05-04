'use strict';

const electron = require ('electron');
const { app, BrowserWindow, ipcMain } = electron;
const url = require('url');
const path = require('path');
const typeorm = require('typeorm');
const { createConnection, getRepository, getConnectionOptions} = typeorm;

const __appdirname = path.normalize(path.join(__dirname,"../renderer"));


// When the 'electron' app is ready
app.on('ready', () => {
  openMainWindow();
});

// Crea la connessione verso il database
exports.connectDatabase = connectDatabase;
async function connectDatabase(){
  // legge la configurazione dal file "ormconfig"
  const connectionOptions = await getConnectionOptions("default");
  // modifica la posizione del database 
  let databasePath = app.getPath("appData") + "/database.sqlite";
  console.error(databasePath)
  Object.assign(connectionOptions, {database: databasePath});
  const connection = await createConnection(connectionOptions);
}


function openWindow(window, htmlfile){
  if (window) {
    window.focus();
    return;
  }
  window = new BrowserWindow();
  // carica il file HTML
  window.loadURL(url.format({
    pathname: __appdirname + "/" + htmlfile,
    protocol: "file:",
    slashes: true
  }));
  // libera la memoria in caso di chiusura
  window.on('closed', () => {
    window = null
  }); 
}

var mainWindow = null;    // finestra principale
exports.openMainWindow = openMainWindow;
function openMainWindow() {
  openWindow(mainWindow,"mainWindow.html");
}

var simboliWindow = null;   // finestra di Info sull'applicazione
exports.openSimboliWindow = openSimboliWindow;
function openSimboliWindow() {
  openWindow(simboliWindow,"simboli.html");
}

var componentiWindow = null;   // finestra di Info sull'applicazione
exports.openComponentiWindow = openComponentiWindow;
function openComponentiWindow() {
  openWindow(componentiWindow,"componenti.html");
}

var componentiQWindow = null;   // finestra di Info sull'applicazione
exports.openComponentiQWindow = openComponentiQWindow;
function openComponentiQWindow() {
  openWindow(componentiQWindow,"componenti_q.html");
}

var testQuasarWindow = null;   // finestra di Info sull'applicazione
exports.openTestQuasarWindow = openTestQuasarWindow;
function openTestQuasarWindow() {
  openWindow(testQuasarWindow,"testquasar.html");
}
