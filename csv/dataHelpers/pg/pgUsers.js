const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const dataGen = (fileName, counterStart, numRecords, last) => {
  const writer = csvWriter();
  let counter = counterStart;
  numRecords = last ? numRecords + 1 : numRecords;
  writer.pipe(fs.createWriteStream(path.join(__dirname, '..', '..', 'data', 'pg', 'users', `${fileName}`)));
  for (let i = 0; i < numRecords; i++) {
    writer.write({
      userId: counter++,
      userName: faker.internet.userName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
    });
  }
  writer.end();
  console.log(`${fileName}: done`);
};

const generateFiles = (records) => {
  const recordsPerFile = Math.floor(records / 3);
  const file1Start = 1;
  const file2Start = file1Start + recordsPerFile;
  const file3Start = file2Start + recordsPerFile;

  dataGen('pgUsersData1.csv', file1Start, recordsPerFile);
  dataGen('pgUsersData2.csv', file2Start, recordsPerFile);
  dataGen('pgUsersData3.csv', file3Start, recordsPerFile, true);
};

module.exports.generateFiles = generateFiles;
