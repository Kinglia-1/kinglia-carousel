const Place = require('../../database/Place.js');
const pg = require('../../updated-dbs/postgres/pgconnect.js');
const redis = require('redis');
const config = require('../../psqlConfig.js');

const client = redis.createClient(6379, config.redisIP); // just 6379 for local
client.on('error', err => console.log('Error: ' + err));

module.exports = {
  get: (req, res) => {
    const { zip } = req.params;
    return client.get(zip, (err, data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        let text = `SELECT placeid, title, pictureurl, zipcode, roomtype, numberbeds, rating, numberreviews, hostplus, superhost, price, placeurl FROM places WHERE zipcode = '${req.params.zip}' LIMIT 12;`;

        pg.query(text)
        .then((data) => {
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

// without redis
// get: (req, res) => {
//   let text = `SELECT placeid, title, pictureurl, zipcode, roomtype, numberbeds, rating, numberreviews, hostplus, superhost, price, placeurl FROM places WHERE zipcode = '${req.params.zip}' LIMIT 12;`;

//   pg.query(text)
//   .then((data) => {
//     res.status(200).send(data.rows);
//   })
//   .catch((err) => {
//     console.log('error in Places GET: ' + err);
//     res.sendStatus(400);
//   });
// }
