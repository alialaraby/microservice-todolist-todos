//imports
const express = require('express');
const app = express();
const debug = require('debug')('app:all'); // condotional log, choose to show these log or not from env
const cors = require('cors');

app.use(cors())
app.options('*' , cors());
app.use((req, res, next)=> {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
})

require('dotenv').config(); // to read vars from .env file
require('./startup/config')(app, debug);
require('./startup/db')(debug)
require('./startup/routes')(app, debug)

require('./startup/port')(app, debug);

module.exports = { app: app, debug: debug };