const User = require('../../database/User.js');
const pg = require('../../updated-dbs/postgres/pgconnect.js');

module.exports = {
  get: (req,res) =>{
    let text = `SELECT ll.likeid, ll.listid, ul.listname, ll.placeid FROM list_likes ll JOIN user_lists ul ON ll.listid = ul.listid WHERE ul.userid = ${req.params.userid};`;

    pg.query(text)
    .then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((err) => {
      console.log('Error in Users GET: ' + err);
    });
  },
  post: (req,res) =>{
    let text1 = `INSERT INTO user_lists(listname, userid) VALUES('${req.body.listname}', ${req.body.userid}) RETURNING listid;`;

    pg.query(text1)
    .then((listid) => {
      let text2 = `INSERT INTO list_likes(listid, placeid) VALUES(${listid.rows[0].listid}, ${req.body.placeid});`;
      pg.query(text2)
      .then(() => res.sendStatus(200));
    })
    .catch((err) => console.log('Error in Users POST: ' + err));
  },
  delete: (req, res) => {
    let text = `DELETE FROM list_likes WHERE likeid = ${req.body.likeid}`;

    pg.query(text)
    .then(() => res.sendStatus(200))
    .catch((err) => console.log('Error in Users DELETE'));
  },
  patch: (req,res) => {
    let text = `INSERT INTO list_likes(listid, placeid) VALUES(${req.body.listid}, ${req.body.placeid});`;

    pg.query(text)
    .then(() => res.sendStatus(200))
    .catch(() => console.log('Error in Users PATCH: ' + err));
  }
}

