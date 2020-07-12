const pg = require('./pg/trigger.js')
const cs = require('./cassandra/trigger.js')

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

console.log(pg);

pg.seedData();
cs.seedData();
