const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const faker = require('faker');

var generateListName = () => {
  const list = ['Interesting', 'Wishlist', 'Vacation', 'Nice Places', 'Someday!', 'My Places', 'Honeymoon', 'Summer', 'Winter Getaway'];
  return list[Math.floor(Math.random()* list.length)];
}

const dataGen = (fileName, counterStart) => {
  var counter = counterStart;
  writer.pipe(fs.createWriteStream(path.join(__dirname, 'pg', `${fileName}`)));
  for (var i = 0; i < 10; i++) {
    writer.write({
      listId: counter++,
      listName: generateListName(),
      userId: Math.floor(Math.random() * 12000000 +1)
    });
  }
  writer.end();
  console.log('done');
};

dataGen('pgUserListsData1.csv', 1);
