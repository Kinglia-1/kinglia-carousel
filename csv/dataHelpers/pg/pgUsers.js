const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const faker = require('faker');

const dataGen = (fileName, counterStart) => {
  var counter = counterStart;
  writer.pipe(fs.createWriteStream(path.join(__dirname, 'pg', `${fileName}`)));
  for (var i = 0; i < 10; i++) {
    writer.write({
      userId: counter++,
    });
  }
  writer.end();
  console.log('done');
};

dataGen('pgUsersData1.csv', 1);
