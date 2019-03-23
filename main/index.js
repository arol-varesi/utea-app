'use strict';

const electron = require ('electron');
const { app, BrowserWindow, ipcMain } = electron;
const url = require('url');
const path = require('path');

const __appdirname = path.normalize(path.join(__dirname,"../app"));

var mainWindow = null;    // finestra principale
var aboutWindow = null;   // finestra di Info sull'applicazione

exports.openAboutWindow = openAboutWindow;
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



function openAboutWindow() {
  if (aboutWindow) {
    aboutWindow.focus();
    return;
  }
  aboutWindow = new BrowserWindow({
    height: 185,
    resizable: false,
    width: 270,
    title: '',
    minimizable: false,
    fullscreenable: false
  })
  aboutWindow.loadURL('file://' + __dirname + '/views/about.html')
  aboutWindow.on('closed', function() {
    aboutWindow = null
  })
}
