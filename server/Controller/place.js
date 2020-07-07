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
  }
}