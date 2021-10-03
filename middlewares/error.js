const debug = require('debug')('app:server_errors');
const logger = require('../middlewares/logger');
module.exports = (error, req, res, next) => {
    debug(error.message);
    logger.error(error.message, error);
    res.status(500).json({error: error.message, message: 'something went wrong'});
}