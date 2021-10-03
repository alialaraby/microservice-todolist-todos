const jwt = require('jsonwebtoken');
const config = require('config');
const unsecurePaths = Object.values(require('../enums/unsecure-paths'));

exports.authUser = (req, res, next) => {
    try {
        if(unsecurePaths.includes(req.originalUrl)) next();
        else{
            const token = req.headers.authorization.split(' ')[1] || req.query.token || req.headers["x-access-token"];
            if(!token) throw 'unauthorized';
            const decodedToken = jwt.verify(token, config.get('auth_key'));
            if(!decodedToken.userId) throw 'unauthorized';
            if(decodedToken.userId != req.body.userId) throw 'unauthorized';
            next();
        }
    } catch (error) {
        res.status(401).json({ message: 'authorization error, check your token or userId' });
    }
}