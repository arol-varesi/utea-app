const sqlite = require('sqlite3')
const typeorm = require('typeorm');
const { createConnection, getRepository } = typeorm;


createConnection().then(() => {
  var commessa = {
    matricola:   "12345",
    tipo:        "TSI",
    cliente:     "Nestlè",
    riferimento: "Waterfall"
  }
  return getRepository("Commessa").save(commessa);

}).then(() => {
  console.log("Salvata correttamente!");
  return getRepository("Commessa").find();

}).then(commesse => {
  console.log("Commesse :", commesse);

  let ul = document.getElementById('matricoleList');
  commesse.forEach(matricola => {
    var li = document.createElement('li');
    li.innerText = matricola.id + ". " + matricola.matricola;
    ul.appendChild(li);
  });

}).catch( error => {
  console.error("Error: ", error);
});