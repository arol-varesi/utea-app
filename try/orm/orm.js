// const sqlite = require('sqlite3')
const typeorm = require('typeorm');
const { createConnection, getConnection, getRepository } = typeorm;



createConnection("try_orm").then(connection => {
  console.log("Salvata correttamente!");
  return connection.getRepository("Commessa").find();

}).then(commesse => {
  console.log("Commesse :", commesse);

  let tb = document.getElementById('matricoleList');
  commesse.forEach(commessa => {
    var tr = document.createElement('tr');
    Object.keys(commessa).forEach(key => {
      var td = document.createElement('td');
      var txt = document.createTextNode(commessa[key]);
      td.appendChild(txt);
      tr.appendChild(td);
    })
    id = commessa["id"];
    var x = document.createElement('button');
    x.innerHTML = "X";
    x.setAttribute("onclick","removeCommessa("+id+")");

    x.className = "btn btn-outline-danger btn-sm"

    // x.addEventListener("click", async () =>  {
    //   console.log("Target:"+this);
    //   // let rep = getRepository("Commessa");
    //   // let toremove = await rep.findOne(id);
    //   // await rep.remove(toremove);
    // })
    
    tr.appendChild(x);

    tb.appendChild(tr);
  });

}).catch( error => {
  console.error("Error: ", error);
});

async function removeCommessa(id) {
  let con = getConnection("try_orm");
  let rep = con.getRepository("Commessa");
  let toremove = await rep.findOne(id);
  await rep.remove(toremove);
  location.reload();
}

async function addCommessa() {
  var commessa = {
    matricola:   "12345",
    tipo:        "TSI",
    cliente:     "Nestlè",
    riferimento: "Waterfall"
  }
  let con = getConnection("try_orm");
  await con.getRepository("Commessa").save(commessa);
  location.reload();
}