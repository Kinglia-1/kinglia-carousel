const totalPlaces = 100;
const totalUsers = 10;
const totalLists = totalUsers * 2;
const totalLikes = totalLists * 5;

module.exports = {
  totalPlaces: totalPlaces,
  totalUsers: totalUsers,
  totalLists: totalLists,
  totalLikes: totalLikes
};

const pg = require('./pg/trigger.js')
const cs = require('./cassandra/trigger.js')


pg.seedData();
cs.seedData();
