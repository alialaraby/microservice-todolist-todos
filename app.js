//imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const config = require('config');
const debug = require('debug')('app:all'); // condotional log, choose to show these log or not from env
require('dotenv').config(); // to read vars from .env file
const error = require('./middlewares/error');
//app initial configs
debug('initializing app configs ...');
app.use(express.json()); // to read request body as json object
app.use(helmet()); // to provide more security of requests headers
if(app.get('env') === 'development'){
    app.use(morgan('short')); // to log the incomming requests
}
app.set('view engine', 'pug');
app.set('views', './views');

//app listening, home request and establish db connection
debug('listening on port ...');
app.listen(process.env.PORT || 3000, () => {
    debug(`listening on port: ${process.env.PORT || 3000}`);
});
mongoose.connect(config.get('db_connectionString'), { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    debug('connected to db');
});
debug('setting home end point ...');
app.get('/', (req, res) => {
    res.render('index', { title: 'to do list', welcomeMessage: 'welcome to home page in: ', appName: config.get('name') })
});
// require('./routers/user')(app); // first way of using routing (easier way)
// this is the second (not easier) way
const userRouter = require('./routers/user');
app.use('/users', userRouter);
app.use(error);