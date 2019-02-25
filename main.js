'use strict';

const electron = require ('electron');
const { app, BrowserWindow } = electron;

// eslint-disable-next-line no-undef
require('electron-reload')(__dirname);

// When the 'electron' app is ready
app.on('ready', () => {
  ' create the mainWindow of the application'
  let mainWindow = new BrowserWindow({ 
    width: 800, 
    height: 600,
    minWidth: 500,
    minHeight: 200,
  });

  ' on closing thi mainWindows, relese the memory'
  mainWindow.on('closed', () => {
    mainWindow = null
  });

  ' open the content of the main window'
  // eslint-disable-next-line no-undef
  mainWindow.loadURL("file://" + __dirname + "/app/index.html");
});

