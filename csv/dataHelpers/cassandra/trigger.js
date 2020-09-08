const likes = require('./csLikes.js');
const ctrl = require('../control.js');

const {
  totalPlaces,
  totalUsers,
  totalLists,
  totalLikes,
} = ctrl;

const seedData = () => {
  likes.generateFiles(totalLikes, totalLists, totalPlaces, totalUsers);
};

module.exports.seedData = seedData;
