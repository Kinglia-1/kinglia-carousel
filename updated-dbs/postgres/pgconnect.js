const { Pool } = require('pg');
const pgConfig = require('../../psqlConfig.js');

const client = new Pool({
  user: pgConfig.user,
  password: pgConfig.password,
  host: pgConfig.host,
  // port: pgConfig.port, --> for cloud
  database: pgConfig.database,
});

client.connect()
  .then(() => console.log('Connected to psql database'))
  .catch((err) => console.log(err));

module.exports = client;
