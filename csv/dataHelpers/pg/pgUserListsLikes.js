const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

var generateListName = () => {
  const list = ['Interesting', 'Wishlist', 'Vacation', 'Nice Places', 'Someday!', 'My Places', 'Honeymoon', 'Summer', 'Winter Getaway'];
  return list[Math.floor(Math.random()* list.length)];
}

const dataGen = (fileName, counterStart, numRecords, numLists, numPlaces) => {
  const writer = csvWriter();
  var counter = counterStart;
  writer.pipe(fs.createWriteStream(path.join(__dirname, '..', '..', 'data', 'pg', 'userLikes', `${fileName}`)));
  for (var i = 0; i < numRecords; i++) {
    writer.write({
      likeId: counter++,
      listId:  Math.floor(Math.random() * (numLists - 1) +1),
      placeId: Math.floor(Math.random() * (numPlaces - 1) +1)
    });
  }
  writer.end();
  console.log(`${fileName}: done`);
};

var generateFiles = (records, lists, places) => {
  var recordsPerFile = Math.floor(records/3);
  const file1Start = 1;
  const file2Start = file1Start + recordsPerFile;
  const file3Start = file2Start + recordsPerFile;

  dataGen('pgUserLikesData1.csv', file1Start, recordsPerFile, lists, places);
  dataGen('pgUserLikesData2.csv', file2Start, recordsPerFile, lists, places);
  dataGen('pgUserLikesData3.csv', file3Start, recordsPerFile, lists, places);
}

module.exports.generateFiles = generateFiles;
