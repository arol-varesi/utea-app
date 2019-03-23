// const sqlite = require('sqlite3');
const typeorm = require('typeorm');
const { createConnection, getRepository } = typeorm;


createConnection().then(async connection => {
  let simboli = await connection.getRepository("Simbolo").find();
  // crea la lista con tutti i simboli presenti nel database
  let ul = document.getElementById("listaSimboli");
  ul.innerHTML = simboli;

})


