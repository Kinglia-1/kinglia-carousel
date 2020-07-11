const places = require('./pgPlaces.js');
const users = require('./pgUsers.js');
const userLists = require('./pgUserLists.js');
const likes = require('./pgUserListsLikes.js');

const seedData = () => {
  places.generateFiles();
  users.generateFiles();
  userLists.generateFiles();
  likes.generateFiles();
};

seedData();