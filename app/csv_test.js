const path = require('path');
const parse = require('csv-parse');
const assert = require('assert');

const output = [];
// Create the parser
const parser = parse({
  delimiter: ';'
})

// Use the readable stream api
parser.on('readable', () => {
  let record;
  while (record = parser.read()) {
    output.push(record)
  }
})



const fileName =  'DISTINTA.CSV';
filePath = path.normalize(path.join(__dirname, '../files/', fileName));

console.log(filePath);
let obj;

