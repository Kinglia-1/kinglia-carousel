const express = require('express')
const path = require('path')
const axios = require('axios')
const app = express()
const port = 3003

//setup Express Static files
app.use(express.static(path.join(__dirname,'..','client','dist')))

//init controller
const PlaceController = require('./Controller/place.js')
const UserController = require('./Controller/user.js')

//init parser
const parser = require('body-parser')
app.use(parser.json());

//init cors
var cors = require('cors')
app.use(cors());

//Places API Calls:
app.get('/api/places', PlaceController.get);
app.delete('/api/places/:placeId', PlaceController.delete);

//User - API Calls:
app.get('/api/users', UserController.get);
app.post('/api/users', UserController.post);
app.patch('/api/users/:placeId', UserController.update);


app.listen(port, () => console.log(`Example app listening at port:${port}`))