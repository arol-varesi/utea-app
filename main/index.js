'use strict';

const electron = require ('electron');
const { app, BrowserWindow, ipcMain } = electron;
var url = require('url');
const path = require('path');

const __appdirname = path.normalize(path.join(__dirname,"../app"));

// When the 'electron' app is ready
app.on('ready', () => {
  // create the mainWindow of the application
  let mainWindow = new BrowserWindow({
    width: 1000
  });
  // on closing thi mainWindows, relese the memory
  mainWindow.on('closed', () => {
    mainWindow = null
  });
  
  mainWindow.loadURL(url.format({
    pathname: __appdirname + "/index.html",
    protocol: "file:",
    slashes: true
  }));

});


