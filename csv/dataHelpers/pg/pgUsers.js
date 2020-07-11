const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const dataGen = (fileName, counterStart) => {
  const writer = csvWriter();
  var counter = counterStart;
  writer.pipe(fs.createWriteStream(path.join(__dirname, '..', '..', 'data', 'pg', 'users', `${fileName}`)));
  for (var i = 0; i < 10; i++) {
    writer.write({
      userId: counter++,
    });
  }
  writer.end();
  console.log('done');
};

var generateFiles = () => {
  dataGen('pgUsersData1.csv', 1);
  dataGen('pgUsersData2.csv', 11);
  dataGen('pgUsersData3.csv', 21);
};

module.exports.generateFiles = generateFiles;
