const redis = require('redis');

const pg = require('../../updated-dbs/postgres/pgconnect.js');
// const config = require('../../psqlConfig.js');

const client = redis.createClient(6379);
// const client = redis.createClient(6379, config.redisIP); --> for cloud
client.on('error', (err) => console.log('Error: ' + err));

module.exports = {
  get: (req, res) => {
    const { zip } = req.params;
    return client.get(zip, (err, data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        const text = `SELECT placeid, title, pictureurl, zipcode, roomtype, numberbeds, rating, numberreviews, hostplus, superhost, price, placeurl FROM places WHERE zipcode = '${req.params.zip}' LIMIT 12;`;

        pg.query(text)
          .then((data) => {
            client.setex(zip, 7200, JSON.stringify(data.rows));
            res.status(200).send(data.rows);
          })
          .catch((err) => {
            console.log('Error in Places GET: ' + err);
            res.sendStatus(400);
          });
      }
    });
  },
};
