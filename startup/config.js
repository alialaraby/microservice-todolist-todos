const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');

module.exports = (app, debug) => {
    //app initial configs
    debug('initializing app configs ...');
    app.use(express.json()); // to read request body as json object
    app.use(helmet()); // to provide more security of requests headers
    if(app.get('env') === 'development'){
        app.use(morgan('short')); // to log the incomming requests
    }
    app.set('view engine', 'pug');
    app.set('views', '../views');
}