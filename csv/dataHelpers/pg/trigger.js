const places = require('./pgPlaces.js');
const users = require('./pgUsers.js');
const userLists = require('./pgUserLists.js');
const likes = require('./pgUserListsLikes.js');

const totalPlaces = 100;
const totalUsers = 10;
const totalLists = totalUsers * 2;
const totalLikes = totalLists * 5;

const seedData = () => {
  places.generateFiles(totalPlaces);
  users.generateFiles(totalUsers);
  userLists.generateFiles(totalLists, totalUsers);
  likes.generateFiles(totalLikes, totalLists, totalPlaces);
};

seedData();