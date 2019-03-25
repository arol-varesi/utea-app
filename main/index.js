'use strict';

const electron = require ('electron');
const { app, BrowserWindow, ipcMain } = electron;
const url = require('url');
const path = require('path');

const __appdirname = path.normalize(path.join(__dirname,"../app"));

var mainWindow = null;    // finestra principale
var simboliWindow = null;   // finestra di Info sull'applicazione

exports.openSimboliWindow = openSimboliWindow;
exports.openMainWindow = openMainWindow;

// When the 'electron' app is ready
app.on('ready', () => {
  openMainWindow();
});

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
    require('vue-devtools').install()
    // simbolWindow.toggleDevTools();
  }

  simboliWindow.loadURL(url.format({
    pathname: __appdirname + "/simboli.html",
    protocol: "file:",
    slashes: true
  }));
 
}
