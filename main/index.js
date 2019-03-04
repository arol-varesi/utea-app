'use strict';

const electron = require ('electron');
const { app, BrowserWindow, ipcMain } = electron;
const path = require('path');
const fs = require('fs');
const parse = require('csv-parser');


const __appdirname = path.normalize(path.join(__dirname,"../app"));


// eslint-disable-next-line no-undef
// require('electron-reload')(__dirname);

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
  mainWindow.loadURL(`file://${__appdirname}/index.html`);
});



exports.csvView = (filename) => {
  ' create the mainWindow of the application'
  let mainWindow = new BrowserWindow({ 
    width: 800, 
    height: 600,
    minWidth: 500,
    minHeight: 200,
  });
  ' on closing this mainWindows, relese the memory'
  mainWindow.on('closed', () => {
    mainWindow = null
  });

//  var retValue = await readCsvFile(filename);
 
  ipcMain.on('csv-file-get', async (event,arg) => {
    // la funzione aspetta che venga completamente letta il file CSV 
    event.returnValue = JSON.stringify(await readCsvFile(filename));
  })
  
  ' open the content of the main window'
  mainWindow.loadURL(`file://${__appdirname}/csvView.html?filename=${filename}`);


}


// la funzione ritorna un "promise" 
function readCsvFile(inputFile) {
  let headers = [];
  let results = [];
  let promise = new Promise(resolve => {
    fs.createReadStream(inputFile)
    .pipe(parse({ separator: ';'}))
    .on('headers', (h) => headers = h)
    .on('data', (data) => results.push(data))
    .on('end', () => {
      resolve([headers, results]);
    })
  }, reject => {})

  // wait for the promise to resolve
  return promise;
}