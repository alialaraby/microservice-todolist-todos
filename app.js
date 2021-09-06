//imports
const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const config = require('config');
const debug = require('debug')('app:all'); // condotional log, choose to show these log or not from env
require('dotenv').config(); // to read vars from .env file

//app initial configs
debug('initializing app configs ...');
app.use(express.json()); // to read request body as json object
app.use(helmet()); // to provide more security of requests headers
if(app.get('env') === 'development'){
    app.use(morgan('short')); // to log the incomming requests
}
app.set('view engine', 'pug');
app.set('views', './views');

//app listening and home request
debug('listening on port ...');
app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port: ', process.env.PORT || 3000);
});

debug('setting home end point ...');
app.get('/', (req, res) => {
    res.render('index', { title: 'to do list', welcomeMessage: 'welcome to home page in: ', appName: config.get('name') })
    // res.send('Welcome to TODOList App');
});