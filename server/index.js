const express = require('express');
const newrelic = require('newrelic');
const path = require('path');
const axios = require('axios');
const compression = require('compression');
const port = 3003;
const PlaceController = require('./Controller/place.js');
const UserController = require('./Controller/user.js');
const parser = require('body-parser');
const cors = require('cors');
const app = express();

// setup Express Static files
app.use(express.static(path.join(__dirname,'..','client','dist')));
app.use(compression());

// init parser
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

// init cors
app.use(cors());

// routes
app.get('/places/:zip', PlaceController.get);
app.get('/users/:userid', UserController.get);
app.post('/users/lists', UserController.post);
app.delete('/users/lists', UserController.delete);
app.patch('/users/lists', UserController.patch);

app.listen(port, () => console.log(`App listening at port: ${port}`));