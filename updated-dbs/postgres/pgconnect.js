const { Client } = require('pg');
const pgConfig = require('../../psqlConfig.js');


const client = new Client({
  user: pgConfig.user,
  password: pgConfig.password,
  host: pgConfig.host,
  port: pgConfig.port,
  database: pgConfig.database
});

client.connect()
  .then(() => console.log('Connected to psql database'))
  .catch((err) => console.log(err))
  // .finally(() => client.end());

module.exports = client;