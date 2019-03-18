'use strict';

const electron = require ('electron');
const { app, BrowserWindow, ipcMain } = electron;
var url = require('url');
const path = require('path');

const __appdirname = path.normalize(path.join(__dirname,""));

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
  // activate Vue-devTools
  if (process.env.NODE_ENV !== 'production'){
    require('vue-devtools').install()
    mainWindow.toggleDevTools();
  }

  mainWindow.loadURL(url.format({
    pathname: __appdirname + "/vue.html",
    protocol: "file:",
    slashes: true
  }));


});


