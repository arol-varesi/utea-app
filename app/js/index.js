let Console = console; // eslint no-console: "error"

const fs = require('fs');
const path = require('path');

// const manageCsv = require('electron').remote.require('./manageCsv.js')
// const manageCsv = require("./manageCsv.js");
const csvView = require('electron').remote.require('./index').csvView;

// eslint-disable-next-line no-undef
let dir = __dirname;  // starting directory

readDir(dir);

// eslint-disable-next-line no-unused-vars
function chDir(dir) {
  // clean the table
  let table = document.getElementById("table-content");  
  while (table.lastChild) {
    table.removeChild(table.lastChild);
  }
  readDir(dir);
}

function readDir(dir){
  fs.readdir(dir, { withFileTypes: true }, (err, dirent) => {
    // using option "withFileTypes" readdir returns a fs.Dirent object
    if (err) {
      Console.log('fs.readir: Errore di lettura directory: ' + dir);
      return;
    }
    addFilesToPage(dirent, dir);
    document.getElementById('header').innerHTML = dir;
  });  
}

function addFilesToPage(files, dir) {
  // files is an array of fs.Dirent objects
  let table = document.getElementById("table-content"); 
  let tr, td, node;

  // Add .. (previous dir)
  if (dir != "/" ){
    tr = document.createElement('tr');
    td = document.createElement('td');
    node = document.createTextNode("..");
    td.appendChild(node);
    tr.style.color = "red"
    tr.setAttribute("ondblclick", 'chDir("'+path.dirname(dir)+'")');
    tr.appendChild(td);
    table.appendChild(tr);  
  }
  // Add all other files
  files.forEach((file) => {
    let p = path.join(dir,file.name);
    fs.stat(p, (err, stats) => {
      if (err) {
        Console.log('fs.stat error on reading "' + p + '" : ' + err.code);
        return;
      }
      tr = document.createElement('tr');
      // add FileName
      td = document.createElement('td');
      node = document.createTextNode(file.name);
      td.appendChild(node);
      tr.appendChild(td);
      // add Type
      td = document.createElement('td');
      if(file.isFile()) {
        let extension = path.extname(file.name)
        node = document.createTextNode(extension);
        if (extension.toLowerCase() === ".csv") {
          tr.style.color = "green"
          tr.setAttribute("ondblclick", 'csvView("' + p + '")');
        }
      } else if(file.isDirectory()) {
        node = document.createTextNode("DIR");
        tr.style.color = "red"
        tr.setAttribute("ondblclick", 'chDir("'+ p + '")');
      } else {
        node = document.createTextNode("?");
      }
      td.appendChild(node);
      tr.appendChild(td);
      // add Size
      td = document.createElement('td');
      node = document.createTextNode(stats["size"]);
      td.appendChild(node);
      tr.appendChild(td);
      table.appendChild(tr);
    })
  })
}