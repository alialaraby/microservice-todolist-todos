const UserModel = require('../models/user');
const userService = require('../services/user.js');

exports.insertUser = (req, res) => {
    userService.insertUser(req.body)
    .then(user => {
        res.status(200).json({ data: user, message: 'Inserted' });
    })
    .catch(error => {
        res.status(500).json({ error: error });
    });
}

exports.getAllUsers = (req, res) => {
    userService.getAllUsers()
    .then(users => {
        if(users.length)
            res.status(200).json({data: users, message: 'users fetched'});
        else
            res.status(204).json({data: users, message: 'empty content'});
    })
    .catch(error => {
        res.status(500).json({error: error})
    });
}