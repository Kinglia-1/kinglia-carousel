const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

var generateListName = () => {
  const list = ['Interesting', 'Wishlist', 'Vacation', 'Nice Places', 'Someday!', 'My Places', 'Honeymoon', 'Summer', 'Winter Getaway'];
  return list[Math.floor(Math.random()* list.length)];
}

const dataGen = (fileName, counterStart, numRecords, numUsers, last) => {
  const writer = csvWriter();
  var counter = counterStart;
  numRecords = last ? numRecords + 1 : numRecords;
  writer.pipe(fs.createWriteStream(path.join(__dirname, '..', '..', 'data', 'pg', 'userLists', `${fileName}`)));
  for (var i = 0; i < numRecords; i++) {
    writer.write({
      listId: counter++,
      listName: generateListName(),
      userId: Math.floor(Math.random() * (numUsers - 1) +1)
    });
  }
  writer.end();
  console.log(`${fileName}: done`);
};

var generateFiles = (records, users) => {
  var recordsPerFile = Math.floor(records/3);
  const file1Start = 1;
  const file2Start = file1Start + recordsPerFile;
  const file3Start = file2Start + recordsPerFile;

  dataGen('pgUserListsData1.csv', file1Start, recordsPerFile, users);
  dataGen('pgUserListsData2.csv', file2Start, recordsPerFile, users);
  dataGen('pgUserListsData3.csv', file3Start, recordsPerFile, users, true);
}

module.exports.generateFiles = generateFiles;
