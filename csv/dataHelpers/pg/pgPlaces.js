const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

var generateTitle = () => {
  const adj = ['Spacious', 'Lovely', 'Quaint', 'Peaceful', 'Dreamy', 'Quiet'];
  const noun = ['Retreat', 'Cottage', 'Getaway', 'Home', 'Nook', 'Property', 'Retreat'];
  return adj[Math.floor(Math.random()* adj.length)] + ' ' + noun[Math.floor(Math.random()* noun.length)];
};

// OG

// const dataGen = (fileName, counterStart, numRecords, last) => {
//   const writer = csvWriter();
//   var counter = counterStart;
//   numRecords = last ? numRecords + 1 : numRecords;
//   writer.pipe(fs.createWriteStream(path.join(__dirname, '..', '..', 'data', 'pg', 'places', `${fileName}`)));
//   for (let i = 0; i < numRecords; i++) {

//     let numBeds = Math.floor(Math.random() * 4 + 1);
//     let bed = numBeds === 1 ? 'bed' : 'beds';

//     writer.write({
//       placeId: counter++,
//       title: generateTitle(),
//       pictureUrl: 'https://loremflickr.com/320/240/house',
//       zipCode: faker.address.zipCode(),
//       roomType: `${numBeds} ${bed}`,
//       numberBeds: numBeds,
//       rating: (Math.random() * (5.00 - 1.00) + 1.00).toFixed(2),
//       numberReviews: Math.floor(Math.random() * 100 + 1),
//       hostPlus: Math.round(Math.random() * 1),
//       superHost: Math.round(Math.random() * 1),
//       price: faker.commerce.price(),
//       placeUrl: faker.internet.url(),
//       streetAddress: faker.address.streetAddress(),
//       phoneNumber: faker.phone.phoneNumber(),
//       descr: faker.lorem.paragraph(),
//       userName: faker.internet.userName(),
//       firstName: faker.name.firstName(),
//       lastName: faker.name.lastName(),
//       email: faker.internet.email()
//     });
//   }
//   writer.end();
//   console.log(`${fileName}: done`);
// };


// var generateFiles = (records) => {
//   var recordsPerFile = Math.floor(records/3);
//   const file1Start = 1;
//   const file2Start = file1Start + recordsPerFile;
//   const file3Start = file2Start + recordsPerFile;

//   dataGen('pgPlacesData1.csv', file1Start, recordsPerFile);
//   dataGen('pgPlacesData2.csv', file2Start, recordsPerFile);
//   dataGen('pgPlacesData3.csv', file3Start, recordsPerFile, true);
// }



// ALT

// const writeUsers = fs.createWriteStream(path.join(__dirname, '..', '..', 'data', 'pg', 'places', 'pgPlacesData1.csv'));

// const dataGen = () => {
//   let i = 10000000;
//   let placeId = 1;

// };


// var generateFiles = (records) => {

// }



// OG refactor


const dataGen = (fileName, counterStart, numRecords, last) => {
  const writer = fs.createWriteStream(path.join(__dirname, '..', '..', 'data', 'pg', 'places', `${fileName}`));
  // numRecords + 1 adjusts for record lost to rounding down
  let i = last ? numRecords + 1 : numRecords;
  let placeId = counterStart - 1;
  const encoding = 'utf-8';

  function write() {
    let ok = true;
    do {
      i -= 1;
      placeId += 1;
      let numBeds = Math.floor(Math.random() * 4 + 1);
      let bed = numBeds === 1 ? 'bed' : 'beds';

      let title = generateTitle();
      let pictureUrl = 'https = /loremflickr.com/320/240/house';
      let zipCode = faker.address.zipCode();
      let roomType = `${numBeds} ${bed}`;
      let numberBeds = numBeds;
      let rating = (Math.random() * (5.00 - 1.00) + 1.00).toFixed(2);
      let numberReviews = Math.floor(Math.random() * 100 + 1);
      let hostPlus = Math.round(Math.random() * 1);
      let superHost = Math.round(Math.random() * 1);
      let price = faker.commerce.price();
      let placeUrl = faker.internet.url();
      let streetAddress = faker.address.streetAddress();
      let phoneNumber = faker.phone.phoneNumber();
      let descr = faker.lorem.paragraph();
      let userName = faker.internet.userName();
      let firstName = faker.name.firstName();
      let lastName = faker.name.lastName();
      let email = faker.internet.email()

      const record = `${placeId},${title},${pictureUrl},${zipCode},${roomType},${numberBeds},${rating},${numberReviews},${hostPlus},${superHost},${price},${placeUrl},${streetAddress},${phoneNumber},${descr},${userName},${firstName},${lastName},${email}\n`;

      if (i === 0) {
        writer.write(record, encoding, () => writer.end());
      } else {
        ok = writer.write(record, encoding);
      }
    }
    while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
};

var generateFiles = (records) => {
  var recordsPerFile = Math.floor(records/3);
  const file1Start = 1;
  const file2Start = file1Start + recordsPerFile;
  const file3Start = file2Start + recordsPerFile;

  dataGen('pgPlacesData1.csv', file1Start, recordsPerFile);
  dataGen('pgPlacesData2.csv', file2Start, recordsPerFile);
  dataGen('pgPlacesData3.csv', file3Start, recordsPerFile, true);
};

module.exports.generateFiles = generateFiles;