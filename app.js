//imports
const express = require('express');
const app = express();
const debug = require('debug')('app:all'); // condotional log, choose to show these log or not from env
process.on('unhandledRejection', (ex) => { throw ex });

require('dotenv').config(); // to read vars from .env file
require('./startup/cors')(app);
require('./startup/config')(app, debug);
require('./startup/db')(debug)
require('./startup/routes')(app, debug)
require('./startup/port')(app, debug);

module.exports = { app: app, debug: debug };