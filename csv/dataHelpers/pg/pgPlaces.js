const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const faker = require('faker');

var generateTitle = () => {
  const adj = ['Spacious', 'Lovely', 'Quaint', 'Peaceful', 'Dreamy', 'Quiet'];
  const noun = ['Retreat', 'Cottage', 'Getaway', 'Home', 'Nook', 'Property', 'Retreat'];
  return adj[Math.floor(Math.random()* adj.length)] + ' ' + noun[Math.floor(Math.random()* noun.length)];
}

const dataGen = (fileName, counterStart) => {
  var counter = counterStart;
  writer.pipe(fs.createWriteStream(path.join(__dirname, '..', '..', 'data', 'pg', `${fileName}`)));
  for (var i = 0; i < 10; i++) {

    let numBeds = Math.floor(Math.random() * 4 + 1);
    let bed = numBeds === 1 ? 'bed' : 'beds';

    writer.write({
      placeId: counter++,
      title: generateTitle(),
      pictureUrl: faker.image.nature(),
      zipCode: faker.address.zipCode(),
      roomType: `${numBeds} ${bed}`,
      numberBeds: Math.floor(Math.random() * 10 + 1),
      rating: Math.floor(Math.random() * 5 + 1),
      numberReviews: Math.floor(Math.random() * 100 + 1),
      hostPlus: Math.round(Math.random() * 1),
      superHost: Math.round(Math.random() * 1),
      price: faker.commerce.price(),
      placeUrl: '#'
    });
  }
  writer.end();
  console.log('done');
};

dataGen('pgPlacesData1.csv', 1);
