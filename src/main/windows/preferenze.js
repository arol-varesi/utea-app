'use strict'

const preferenze = module.exports = {
  init,
  win: null
}

const config = require('../../config')
const electron = require('electron')

const isDevelopment = process.env.NODE_ENV !== 'production';

function init () {
  // Se la finestra è già stata creata allora viene visualizzata
  if (preferenze.win) {
    return preferenze.win.show()
  }
 
  const win = preferenze.win = new electron.BrowserWindow ({
    // backgroundColor: '#ECECEC',
    // center: true,
    // fullscreen: false,
    width: 400,
    height: 320,
    // icon: getIconPath(),
    maximizable: false,
    minimizable: false,
    resizable: false,
    show: false,
    // skipTaskbar: true,
    title: 'Configurazione di ' + config.APP_WINDOW_TITLE,
    webPreferences: {nodeIntegration: true}
    // useContentSize: true,
  })

  const modalPath = isDevelopment
  ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}/#/preferenze`
  : `file://${__dirname}/index.html#preferenze`

  win.loadURL(modalPath)
  // nessun menu per la finestra "Configurazione"
  win.setMenu(null)

  win.once('ready-to-show', function () {
    win.show()
  })

  win.once('closed', function () {
    preferenze.win = null
  })
}

function getIconPath () {
  return process.platform === 'win32'
    ? config.APP_ICON + '.ico'
    : config.APP_ICON + '.png'
}

