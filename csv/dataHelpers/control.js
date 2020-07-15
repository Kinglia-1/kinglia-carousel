const totalPlaces = 10000000;
const totalUsers = 1000000;
const totalLists = totalUsers * 1;
const totalLikes = totalLists * 4;

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
