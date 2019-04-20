const path = require('path')
const mainConfig = {
  mode: 'none',
  entry: './src/main/index.js',
  target: 'electron-main',
  externals: {
    sqlite3: 'commonjs sqlite3',
    typeorm: 'commonjs2 typeorm'
  },
  output : {
    path: path.resolve(__dirname,'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/
      }

    ]
  }
}
const rendererConfig = {
  mode: 'none',
  entry: './main/index.js',
  target: 'electron-main',
  externals: {
    sqlite3: 'commonjs sqlite3',
    typeorm: 'commonjs2 typeorm'
  },
  output : {
    path: path.resolve(__dirname,'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/
      }

    ]
  }
}

module.exports = [
  serverConfig
]
