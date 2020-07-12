const likes = require('./csLikes.js');
const ctrl = require('../control.js');

const totalPlaces = ctrl.totalPlaces;
const totalUsers = ctrl.totalUsers;
const totalLists = ctrl.totalLists;
const totalLikes = ctrl.totalLikes;

const seedData = () => {
  likes.generateFiles(totalLikes, totalLists, totalPlaces, totalUsers);
};

module.exports.seedData = seedData;