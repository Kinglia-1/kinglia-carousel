const places = require('./pgPlaces.js');
const users = require('./pgUsers.js');
const userLists = require('./pgUserLists.js');
const likes = require('./pgUserListsLikes.js');
const ctrl = require('../control.js');

const totalPlaces = ctrl.totalPlaces;
const totalUsers = ctrl.totalUsers;
const totalLists = ctrl.totalLists;
const totalLikes = ctrl.totalLikes;

const seedData = () => {
  places.generateFiles(totalPlaces);
  users.generateFiles(totalUsers);
  userLists.generateFiles(totalLists, totalUsers);
  likes.generateFiles(totalLikes, totalLists, totalPlaces);
};

module.exports.seedData = seedData;
