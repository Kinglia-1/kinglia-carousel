const Place = require('../../database/Place.js')

module.exports = {
  get: (req,res)=>{
  Place.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) =>{
      console.log("error in get request: "+ err);
      res.status(400);
    })
  },
  delete: (req, res) => {
    Place.findByIdAndRemove(req.params.placeId)
    .then(() => res.sendStatus(200))
    .catch((e) => {
      console.log(e);
      res.sendStatus(400);
    });
  }
}