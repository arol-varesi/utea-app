'strict on'

const fs = require('fs');
const path = require('path');
const parse = require('csv-parser');


// la funzione ritorna un "promise" 
exports.readCsvFile = (inputFile) => {
  let headers = [];
  let results = [];
  let fileName = path.basename(inputFile);
  let promise = new Promise(resolve => {
    fs.createReadStream(inputFile)
    .pipe(parse({ separator: ';'}))
    .on('headers', (h) => headers = h)
    .on('data', (data) => results.push(data))
    .on('end', () => {
      resolve([fileName, headers, results]);
    })
  }, reject => {})

  // wait for the promise to resolve
  return promise;
}