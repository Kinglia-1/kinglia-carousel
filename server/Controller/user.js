const User = require('../../database/User.js');
const pg = require('../../updated-dbs/postgres/pgconnect.js');

module.exports = {
  get: (req,res) =>{
    let text = `SELECT ll.likeid, ll.listid, ul.listname, ll.placeid FROM list_likes ll JOIN user_lists ul ON ll.listid = ul.listid WHERE ul.userid = ${req.params.userid};`;

    pg.query(text)
    .then((data) => {
      let packet = {
        userid: req.params.userid,
        likes: data.rows
      }
      res.status(200).send(packet);
    })
    .catch((err) => {
      console.log('Error in Users GET: ' + err);
      res.sendStatus(400);
    });
  },
  post: (req,res) =>{
    let text1 = `INSERT INTO user_lists(listname, userid) VALUES('${req.body.listname}', ${req.body.userid}) RETURNING listid;`;

    pg.query(text1)
    .then((listid) => {
      let text2 = `INSERT INTO list_likes(listid, placeid) VALUES(${listid.rows[0].listid}, ${req.body.placeid});`;

      pg.query(text2)
      .then(() => res.sendStatus(201));
    })
    .catch((err) => {
      console.log('Error in Users POST: ' + err);
      res.sendStatus(400);
    });
  },
  delete: (req, res) => {
    let text = `DELETE FROM list_likes WHERE likeid = ${req.body.likeid}`;

    pg.query(text)
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.log('Error in Users DELETE: ' + err);
      res.sendStatus(400);
    });
  },
  patch: (req,res) => {
    // query to find listid for given user and listname
      // create index for this

    let text1 = `SELECT listid FROM user_lists WHERE listname='${req.body.listname}' AND userid=${req.body.userid};`

    pg.query(text1)
    .then((listid) => {
      let text2 = `INSERT INTO list_likes(listid, placeid) VALUES(${listid.rows[0].listid}, ${req.body.placeid});`;

      pg.query(text2)
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.log('Error in Users PATCH: ' + err);
        res.sendStatus(400);
      });
    })

  }
}

