//imports
const express = require('express');
const app = express();
const debug = require('debug')('app:all'); // condotional log, choose to show these log or not from env

require('dotenv').config(); // to read vars from .env file
require('./startup/config')(app, debug);
require('./startup/db')(debug)
require('./startup/routes')(app, debug)


//app listening, home request and establish db connection
// debug('listening on port ...');
// app.listen(process.env.PORT || 3000, () => {
//     debug(`listening on port: ${process.env.PORT || 3000}`);
// });
require('./startup/port')(app, debug);

module.exports = { app: app, debug: debug };