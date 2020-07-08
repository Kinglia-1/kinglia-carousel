const Place = require('../../database/Place.js')

module.exports = {
  get: (req,res)=>{
  Place.find()
    .then((data) => {
      res.send(data);
    })
    .catch((e) =>{
      console.log("error in get request: "+ err)
    })
  },
  delete: (req, res) => {
    Place.findByIdAndRemove(req.params.placeId)
    .then(() => res.sendStatus(200))
    .catch((e) => {
      console.log(e);
      res.sendStatus(404);
    });
  }
}