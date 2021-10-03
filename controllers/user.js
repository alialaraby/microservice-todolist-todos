const userService = require('../services/user.js');
const { IncorrectCredentials, EmailNotConfirmed, BcryptHashingError } = require('../app-errors/custom-errors');

exports.registerUser = (req, res) => {
    userService.insertUser(req.body)
    .then(user => {
        res.status(200).json({ data: user, message: 'Inserted' });
    })
    .catch(error => { next(error) }); // pass pipeline to internal server error middleware
}

exports.getAllUsers = (req, res, next) => {
    userService.getAllUsers()
    .then(users => {
        if(users.length)
            res.status(200).json({data: users, message: 'users fetched'});
        else
            res.status(204).json({data: users, message: 'empty content'});
    })
    .catch(error => { next(error) }); // pass pipeline to internal server error middleware
}

exports.login = (req, res, next) => {
    userService.login(req.body)
    .then(result => {
        if(result.result) res.status(200).json({ data: result.result, message: 'logged in successfully' });
        else{
            let statusCode = result.error instanceof IncorrectCredentials ? 400 : result.error instanceof EmailNotConfirmed ? 401 : 500;
            res.status(statusCode).json({ message: result.error.message })
        }
    })
    .catch(error => { next(error) });
}