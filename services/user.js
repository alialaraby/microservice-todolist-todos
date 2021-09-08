const UserModel = require('../models/user');
const bcrypt = require('bcrypt');

exports.insertUser = async (userData) => {
    let hash;
    try {
        hash = await bcrypt.hash(userData.password, 1);
    } catch (error) {
        return error;
    }
    try {
        return await UserModel.create({
            fullName: userData.fullName,
            username: userData.username,
            password: hash,
            email: userData.email,
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
    //first check if email exists in the db
    let user;
    try {
        user = await UserModel.findOne({ email: userCreds.email }); 
        if(!user)
            return null;
        
        let correctPassword;
        try {
            correctPassword = await bcrypt.compare(userCreds.password, user.password);
            if(!correctPassword)
                return 0;
        } catch (error) {
            throw error;
        }
        return { email: user.email, username: user.username, fullName: user.fullName };
    } catch (error) {
        return error;
    }
}