const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const { IncorrectCredentials, EmailNotConfirmed, BcryptHashingError } = require('../app-errors/custom-errors');

exports.insertUser = async (userData) => {
    try {
        let hash;
        try {
            hash = await bcrypt.hash(userData.password, 1);
        } catch (error) {
            throw new BcryptHashingError('hashing failed');
        }
        return await UserModel.create({
            fullName: userData.fullName,
            username: userData.username,
            password: hash,
            email: userData.email
        });
    } catch (error) {
        return error;
    }
}

exports.getAllUsers = async () => {
    try {
        return await UserModel.find({});
    } catch (error) {
        return error;
    }
}

exports.login = async (userCreds) => {
    let user;
    try {
        user = await UserModel.findOne({ email: userCreds.email }); 
        if(!user) throw new IncorrectCredentials('Incorrect Username or Password');
        
        if(!user.accountConfirmed) throw new EmailNotConfirmed('Email not Confirmed');

        let correctPassword;
        try {
            correctPassword = await bcrypt.compare(userCreds.password, user.password);
            if(!correctPassword) throw new IncorrectCredentials('Incorrect Username or Password');
        } catch (error) { throw error; }

        const token = jwt.sign({ userId: user._id }, config.get('auth_key')/*, { expiresIn: '2h' }*/);
        
        return { result: { _id: user._id, email: user.email, username: user.username, fullName: user.fullName, token: token }, error: null };
    } catch (error) {
        return { result: null, error: error };
    }
}