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
// const LikeController = require('./Controller/like.js')

//init parser
const parser = require('body-parser')
app.use(parser.json());

//init cors
var cors = require('cors')
app.use(cors());

//Places API Calls:
app.get('/places/:zip', PlaceController.get);

// Likes / Users
// NEED TO REFLECT IN APP.JSX
app.get('/users/:userid', UserController.get);
app.post('/users/lists', UserController.post);
app.delete('/users/lists', UserController.delete);
app.patch('/users/lists', UserController.patch);

app.listen(port, () => console.log(`Example app listening at port:${port}`))