const Place = require('../../database/Place.js');
const pg = require('../../updated-dbs/postgres/pgconnect.js');
// const client = require('../index.js');
const redis = require('redis');

// create and connet redis client to local instance
const client = redis.createClient(6379);
client.on('error', err => console.log('Error: ' + err));

module.exports = {
  get: (req, res) => {
    const { zip } = req.params;
    return client.get(zip, (err, data) => {
      if (data) {
        res.status(200).send(data)
      } else {
        let text = `SELECT placeid, title, pictureurl, zipcode, roomtype, numberbeds, rating, numberreviews, hostplus, superhost, price, placeurl FROM places WHERE zipcode = '${req.params.zip}' LIMIT 12;`;

        pg.query(text)
        .then((data) => {
          // make sure data type works for Redis
          client.setex(zip, 7200, JSON.stringify(data.rows));
          res.status(200).send(data.rows);
        })
        .catch((err) => {
          console.log('error in Places GET: ' + err);
          res.sendStatus(400);
        });
      }
    })
  }
};
