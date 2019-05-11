const electron = require('electron')
const path = require('path')
const fs = require('fs')

class Store {
  constructor(opts) {
    // per il processo Renderer è necessario recuperare il modulo `app` tramite `remote`
    // app.getPath('userData') restituisce la directory utilizzata per il salvataggio della configurazione
    const userDataPath = (electron.app || electron.remote.app).getPath('userData')
    // si usa la proprietà `configName` per costruire il nome file seguito da estensione .json
    this.path = path.join(userDataPath, opts.configName + '.json')

    this.data = parseDataFile(this.path, opts.defaults)
  }

  // Restituisce la proprietà `key` dell'oggetto `data`
  get(key) {
    return this.data[key]
  }
  // ... e questa la scrive
  set(key,val) {
    this.data[key] = val
    try { 
      fs.writeFileSync(this.path, JSON.stringify(this.data, undefined, 2))
    } catch (error) {
      alert(error)
    }
  }
}

function parseDataFile(filePath, defaults) {
  try {
    return JSON.parse(fs.readFileSync(filePath))
  } catch (error) {
    return defaults
  }
}

// esponi la classe
module.exports = Store