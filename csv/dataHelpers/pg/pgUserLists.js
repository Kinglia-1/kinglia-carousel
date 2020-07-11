const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-write-stream');
// const writer = csvWriter();
const faker = require('faker');
const Promise = require('bluebird');

var generateListName = () => {
  const list = ['Interesting', 'Wishlist', 'Vacation', 'Nice Places', 'Someday!', 'My Places', 'Honeymoon', 'Summer', 'Winter Getaway'];
  return list[Math.floor(Math.random()* list.length)];
}

// OG
const dataGen = (fileName, counterStart) => {
  const writer = csvWriter();
  var counter = counterStart;
  writer.pipe(fs.createWriteStream(path.join(__dirname, '..', '..', 'data', 'pg', 'userLists', `${fileName}`)));
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

var generateFiles = () => {
  dataGen('pgUserListsData1.csv', 1);
  dataGen('pgUserListsData2.csv', 11);
  dataGen('pgUserListsData3.csv', 21);
}

module.exports.generateFiles = generateFiles;


// PROMISE

// const dataGen = (fileName, counterStart) => {
//   // Initialize writer each time before creating file
//   const writer = csvWriter();
//   return new Promise((resolve, reject) => {
//     var counter = counterStart;
//     writer.pipe(fs.createWriteStream(path.join(__dirname, '..', '..', 'data', 'pg', `${fileName}`)));
//     for (var i = 0; i < 10; i++) {
//       writer.write({
//         listId: counter++,
//         listName: generateListName(),
//         userId: Math.floor(Math.random() * 12000000 +1)
//       });
//     }
//     writer.end();
//     console.log('done');
//     resolve();
//   });
// };

// const generateFiles = () => {
//   dataGen('pgUserListsData1.csv', 1)
//   .then(() => dataGen('pgUserListsData2.csv', 11))
//   .then(() => dataGen('pgUserListsData3.csv', 21))
//   .catch((err) => console.log('error: ' + err))
// };

// generateFiles();
