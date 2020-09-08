const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-write-stream');

const dataGen = (fileName, counterStart, numRecords, numLists, numPlaces, last) => {
  const writer = csvWriter();
  let counter = counterStart;
  numRecords = last ? numRecords + 1 : numRecords;
  writer.pipe(fs.createWriteStream(path.join(__dirname, '..', '..', 'data', 'pg', 'userLikes', `${fileName}`)));
  for (let i = 0; i < numRecords; i++) {
    writer.write({
      likeId: counter++,
      listId: Math.floor(Math.random() * (numLists - 1) + 1),
      placeId: Math.floor(Math.random() * (numPlaces - 1) + 1),
    });
  }
  writer.end();
  console.log(`${fileName}: done`);
};

const generateFiles = (records, lists, places) => {
  const recordsPerFile = Math.floor(records / 3);
  const file1Start = 1;
  const file2Start = file1Start + recordsPerFile;
  const file3Start = file2Start + recordsPerFile;

  dataGen('pgUserLikesData1.csv', file1Start, recordsPerFile, lists, places);
  dataGen('pgUserLikesData2.csv', file2Start, recordsPerFile, lists, places);
  dataGen('pgUserLikesData3.csv', file3Start, recordsPerFile, lists, places, true);
};

module.exports.generateFiles = generateFiles;
