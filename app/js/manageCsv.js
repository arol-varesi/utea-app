'strict on'

const fs = require('fs');
const path = require('path');
const parse = require('csv-parser');
const results = [];

function readCsvFile(inputFile) {
  fs.createReadStream(inputFile)
  .pipe(parse({ separator: ';'}))
  .on('headers', (headers) => console.log('headers : ' + headers))
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
  });
}
