const Place = require('../../database/Place.js');
const pg = require('../../updated-dbs/postgres/pgconnect.js');

module.exports = {
  get: (req, res) => {
    let text = `SELECT placeid, title, pictureurl, zipcode, roomtype, numberbeds, rating, numberreviews, hostplus, superhost, price, placeurl FROM places WHERE zipcode like '${req.params.zip}%' LIMIT 50;`;

    pg.query(text)
    .then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((err) => {
      console.log('error in Places GET: ' + err);
      res.sendStatus(400);
    });
  }
};