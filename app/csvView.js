// needed for Datatables
var $ = require('jquery');
require('datatables.net-dt')();
require('datatables.net-colreorder-dt')();



const { ipcRenderer } = require('electron');
var [csv_name, csv_headers, csv_contents] = ipcRenderer.sendSync('csv-file-get', "test");

document.getElementById('fileName').innerHTML = csv_name;

csv_columns = [];
csv_headers.forEach( (h) => {
  csv_columns.push({ data: h, title: h });
})

// Using DataTables
$(document).ready(function() {
  $('#example').DataTable({
    info: false,
    colReorder: true,
    data: csv_contents,
    paginate: false,
    columns: csv_columns
  });
});


// let tr = document.createElement('tr');
// csv_headers.forEach((h) => {
//   let th = document.createElement('th');
//   let txt = document.createTextNode(h);
//   th.appendChild(txt);
//   tr.appendChild(th);
// })     
// document.getElementById('tHead').appendChild(tr);
// document.write(csv_contents[0].Sigla)

// csv_contents.forEach( (r) => {
//   let tr = document.createElement('tr');
//   csv_headers.forEach( (h) => {
//     let td = document.createElement('td');
//     let txt = document.createTextNode(r[h]);
//     td.appendChild(txt);
//     tr.appendChild(td);
//   })
//   document.getElementById('tBody').appendChild(tr);     
// })


// ipcRenderer.on('csv-file-name', (event,arg) => {
//   document.getElementById('param').innerHTML = arg;
// })
