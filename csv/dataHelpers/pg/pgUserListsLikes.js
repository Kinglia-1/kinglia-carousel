const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

var generateListName = () => {
  const list = ['Interesting', 'Wishlist', 'Vacation', 'Nice Places', 'Someday!', 'My Places', 'Honeymoon', 'Summer', 'Winter Getaway'];
  return list[Math.floor(Math.random()* list.length)];
}

const dataGen = (fileName, counterStart) => {
  const writer = csvWriter();
  var counter = counterStart;
  writer.pipe(fs.createWriteStream(path.join(__dirname, '..', '..', 'data', 'pg', 'userLikes', `${fileName}`)));
  for (var i = 0; i < 10; i++) {
    writer.write({
      likeId: counter++,
      listId:  Math.floor(Math.random() * 12000000 +1),
      placeId: Math.floor(Math.random() * 12000000 +1)
    });
  }
  writer.end();
  console.log('done');
};

var generateFiles = () => {
  dataGen('pgUserListsData1.csv', 1);
  dataGen('pgUserListsData2.csv', 11);
  dataGen('pgUserListsData3.csv', 21);
}

module.exports.generateFiles = generateFiles;
