const path = require('path')

const APP_NAME = 'UTEA App'

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  APP_ICON: path.join(__dirname, '..', 'static/icons', 'UteaApp'),

  APP_WINDOW_TITLE: APP_NAME
}


