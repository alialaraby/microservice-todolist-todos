const UserModel = require('../models/user');

exports.insertUser = (req, res) => {
    UserModel.create({
        fullName: req.body.fullName,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    }, function (error, result) {
        if(error)
            res.status(500).json({error: error.message});
        else
            res.status(200).json({message: 'inserted', data: result});
    });
}

exports.getAllUsers = (req, res) => {
    UserModel.find({}, (error, result) =>{
        if(error)
            res.status(500).json({error: error})
        else 
            res.status(200).json({data: result});
    });
}