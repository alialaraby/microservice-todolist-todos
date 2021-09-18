const userService = require('../services/user.js');

exports.insertUser = (req, res) => {
    userService.insertUser(req.body)
    .then(user => {
        res.status(200).json({ data: user, message: 'Inserted' });
    })
    .catch(error => { res.status(500).json({error: error, message: 'something went wrong'}); }); // pass pipeline to internal server error middleware
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
        // this is a way to get the falsy/truthy value with (!!) and the extra (!) is to check if it`s true or not
        //if result is truthy (value, object, ...) with the ! it`s false as it`s defined already
        //if result is falsy (0, null, ....) with the ! it`s true
        if (!!!result) { 
            res.status(404).json({ message: 'email or password is incorrect!' })
        } else {
            res.status(200).json({ data: result, message: 'logged in successfully' })
        }
    })
    .catch(error => { res.status(500).json({error: error, message: 'something went wrong'}); }); // pass pipeline to internal server error middleware
}