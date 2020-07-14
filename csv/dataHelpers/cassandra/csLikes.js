const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

var generateListName = () => {
  const list = ['Interesting', 'Wishlist', 'Vacation', 'Nice Places', 'Someday!', 'My Places', 'Honeymoon', 'Summer', 'Winter Getaway'];
  return list[Math.floor(Math.random()* list.length)];
}

const dataGen = (fileName, numRecords, numLists, numPlaces, numUsers) => {
  const writer = csvWriter();
  writer.pipe(fs.createWriteStream(path.join(__dirname, '..', '..', 'data', 'cassandra', `${fileName}`)));
  for (var i = 0; i < numRecords; i++) {
    writer.write({
      likeId: faker.random.uuid(),
      listId: Math.floor(Math.random() * (numLists - 1) +1),
      listName: generateListName(),
      placeId: Math.floor(Math.random() * (numPlaces - 1) +1),
      userId: Math.floor(Math.random() * (numUsers - 1) +1),
      userName: faker.internet.userName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email()
    });
  }
  writer.end();
  console.log(`${fileName}: done`);
};

var generateFiles = (records, lists, places, users) => {
  var recordsPerFile = Math.floor(records/3);

  dataGen('cassandraLikesData1.csv', recordsPerFile, records, lists, places, users);
  dataGen('cassandraLikesData2.csv', recordsPerFile, records, lists, places, users);
  dataGen('cassandraLikesData3.csv', recordsPerFile, records, lists, places, users);
}

module.exports.generateFiles = generateFiles;
