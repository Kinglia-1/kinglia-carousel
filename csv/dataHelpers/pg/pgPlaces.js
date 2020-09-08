const fs = require('fs');
const path = require('path');
const faker = require('faker');

const generateTitle = () => {
  const adj = ['Spacious', 'Lovely', 'Quaint', 'Peaceful', 'Dreamy', 'Quiet'];
  const noun = ['Retreat', 'Cottage', 'Getaway', 'Home', 'Nook', 'Property', 'Retreat'];
  return adj[Math.floor(Math.random() * adj.length)] + ' ' + noun[Math.floor(Math.random() * noun.length)];
};

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
      const numBeds = Math.floor(Math.random() * 4 + 1);
      const bed = numBeds === 1 ? 'bed' : 'beds';

      const title = generateTitle();
      const pictureUrl = 'https://loremflickr.com/320/240/house';
      const zipCode = faker.address.zipCode();
      const roomType = `${numBeds} ${bed}`;
      const numberBeds = numBeds;
      const rating = (Math.random() * (5.00 - 1.00) + 1.00).toFixed(2);
      const numberReviews = Math.floor(Math.random() * 100 + 1);
      const hostPlus = Math.round(Math.random() * 1);
      const superHost = Math.round(Math.random() * 1);
      const price = faker.commerce.price();
      const placeUrl = faker.internet.url();
      const streetAddress = faker.address.streetAddress();
      const phoneNumber = faker.phone.phoneNumber();
      const descr = faker.lorem.paragraph();
      const internalNotes = faker.lorem.paragraph();
      const hostNotes = faker.lorem.paragraph();
      const userName = faker.internet.userName();
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const email = faker.internet.email();

      const record = `${placeId},${title},${pictureUrl},${zipCode},${roomType},${numberBeds},${rating},${numberReviews},${hostPlus},${superHost},${price},${placeUrl},${streetAddress},${phoneNumber},${descr},${internalNotes},${hostNotes},${userName},${firstName},${lastName},${email}\n`;

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

const generateFiles = (records) => {
  const recordsPerFile = Math.floor(records / 3);
  const file1Start = 1;
  const file2Start = file1Start + recordsPerFile;
  const file3Start = file2Start + recordsPerFile;

  dataGen('pgPlacesData1.csv', file1Start, recordsPerFile);
  dataGen('pgPlacesData2.csv', file2Start, recordsPerFile);
  dataGen('pgPlacesData3.csv', file3Start, recordsPerFile, true);
};

module.exports.generateFiles = generateFiles;
