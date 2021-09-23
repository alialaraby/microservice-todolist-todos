const error = require('../middlewares/error');
const config = require('config');
const userRouter = require('../routers/user');

module.exports = (app, debug) => {
    debug('setting home end point ...');
    app.get('/', (req, res) => {
        res.render('index', { title: 'to do list', welcomeMessage: 'welcome to home page in: ', appName: config.get('name') })
    });
    app.use('/users', userRouter);
    app.use(error);
}