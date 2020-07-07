const db = require('./index.js');
const Place = require('./Place.js');
const User = require('./User.js');
const axios = require('axios');
const faker = require('faker');
const Promise = require('bluebird');

const sampleUser = () =>{
  return new Promise(function(resolve, reject){
    let users = [];
    for(var i=0;i<90;i++){
      let user = {};
      user.name = faker.name.findName()+ "";
      user.likeplace = [];
      users.push(user);
    }
    if( users != null){
      resolve(users)
    }else{
      reject(new Error('No data'))
    }
  })
}

const awsImgAdd = [
`https://d2gavsb72y0czz.cloudfront.net/bulksplash-albertoeger-PmstY5S5nKA.jpg`,
`https://d2gavsb72y0czz.cloudfront.net/bulksplash-chuttersnap-E_1HgzKm4Vw.jpg`,
`https://d2gavsb72y0czz.cloudfront.net/bulksplash-couriina-OsgLI_awdk0.jpg`,
`https://d2gavsb72y0czz.cloudfront.net/bulksplash-cowomen-t9ovV7r-FJU.jpg`,
`https://d2gavsb72y0czz.cloudfront.net/bulksplash-curology-6CJg-fOTYs4.jpg`,
`https://d2gavsb72y0czz.cloudfront.net/bulksplash-creatveight-zzMb7jacyBc.jpg`,
`https://d2gavsb72y0czz.cloudfront.net/bulksplash-devano23-DU8Z5djVJtg.jpg`,
`https://d2gavsb72y0czz.cloudfront.net/bulksplash-evphotocinema-7SY3pedipaA.jpg`,
`https://d2gavsb72y0czz.cloudfront.net/bulksplash-evphotocinema-E8Qyl8zj3XI.jpg`,
`https://d2gavsb72y0czz.cloudfront.net/bulksplash-evphotocinema-dTCNj6ptvG0.jpg`,
`https://d2gavsb72y0czz.cloudfront.net/bulksplash-evphotocinema-y0QpNoSx4eI.jpg`,
`https://d2gavsb72y0czz.cloudfront.net/bulksplash-filios_sazeides-oe6GzjEyHns.jpg`,
]


const samplePlaces = () => {
  return new Promise( (resolve, reject) =>{
    let result = [];
    for(let i=0;i<awsImgAdd.length;i++){
      let tempObj = {};
      tempObj.picture = awsImgAdd[i];
      tempObj.type = 'Private Room';
      tempObj.bed = '1 bed';
      tempObj.rating = parseFloat(Math.random() * (5-2)+2).toFixed(2);
      tempObj.totalReview = Math.ceil(Math.random() * 100 + 1);
      tempObj.hostplus = Math.round(Math.random() * 1);
      tempObj.superhost = Math.round(Math.random() * 1);
      tempObj.title = "Spacious Carmel Highland Retreat";
      tempObj.price = parseFloat(Math.random() * (300-100)+100).toFixed(0);
      tempObj.src = "http://youtube.com";
      result.push(tempObj);
    }
    console.log(result);
    if(result != null){
      resolve(result);
    }else{
      reject(new Error('no result return!'))
    }
  })
}
const insertSamplePlaces = () => {
  Place.deleteMany()
  .then( () => samplePlaces())
  .then( (data)=>Place.create(data))
  .catch( (err) => console.log("error: "+ err))
  .then( () => User.deleteMany())
  .then( () => sampleUser())
  .then( (data) => User.create(data))
  .catch( (err) => console.log("error: "+ err))
};

insertSamplePlaces()

