module.exports = [
  {
    "name": "default",
    "type": "sqlite",
    "database": "database.sqlite",
    "synchronize": true,
    "logging": false,
    "logger": "simple-console",
    "entities": [
       "models/specifiche_db/entity/**/*.js"
    ],
    "migrations": [
       "models/specifiche_db/migration/**/*.js"
    ],
    "subscribers": [
       "models/specifiche_db/subscriber/**/*.js"
    ],
    "cli": {
       "entitiesDir": "models/specifiche_db/entity",
       "migrationsDir": "models/specifiche_db/migration",
       "subscribersDir": "models/specifiche_db/subscriber"
    }
 
 },
 {
    "name": "magazzinoEle",
    "type": "sqlite",
    "host": "127.0.0.1",
    "port": 0,
    "username": "0",
    "password": "null",
    "database": "static/db/MagazzinoEle.db",
    "synchronize": false,
    "logging": true,
    "logger": "simple-console",
    "entities": [
      "models/magazzino_ele/*.js"
    ]
 },
 {
    "name": "try_orm",
    "type": "sqlite",
    "database": "try_orm.sqlite",
    "synchronize": true,
    "logging": false,
    "entities": [
       "try/orm/entity/**/*.js"
    ],
    "migrations": [
       "try/orm/migration/**/*.js"
    ],
    "subscribers": [
       "try/orm/subscriber/**/*.js"
    ],
    "cli": {
       "entitiesDir": "try/orm/entity",
       "migrationsDir": "try/orm/migration",
       "subscribersDir": "try/orm/subscriber"
    }
  }
]