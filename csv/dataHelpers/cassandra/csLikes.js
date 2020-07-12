const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

var generateListName = () => {
  const list = ['Interesting', 'Wishlist', 'Vacation', 'Nice Places', 'Someday!', 'My Places', 'Honeymoon', 'Summer', 'Winter Getaway'];
  return list[Math.floor(Math.random()* list.length)];
}

const dataGen = (fileName, counterStart, numRecords, numLists, numPlaces, numUsers) => {
  const writer = csvWriter();
  var counter = counterStart;
  writer.pipe(fs.createWriteStream(path.join(__dirname, '..', '..', 'data', 'cassandra', `${fileName}`)));
  for (var i = 0; i < numRecords; i++) {
    writer.write({
      likeId: counter++,
      listId: Math.floor(Math.random() * (numLists - 2) +1),
      listName: generateListName(),
      placeId: Math.floor(Math.random() * (numPlaces - 2) +1),
      userId: Math.floor(Math.random() * (numUsers - 2) +1)
    });
  }
  writer.end();
  console.log(`${fileName}: done`);
};

var generateFiles = (records, lists, places, users) => {
  var recordsPerFile = Math.floor(records/3);
  const file1Start = 1;
  const file2Start = file1Start + recordsPerFile;
  const file3Start = file2Start + recordsPerFile;

  dataGen('cassandraLikesData1.csv', file1Start, recordsPerFile, records, lists, places, users);
  dataGen('cassandraLikesData2.csv', file2Start, recordsPerFile, records, lists, places, users);
  dataGen('cassandraLikesData3.csv', file3Start, recordsPerFile, records, lists, places, users);
}

module.exports.generateFiles = generateFiles;
