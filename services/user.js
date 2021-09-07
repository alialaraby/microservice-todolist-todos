const UserModel = require('../models/user');

exports.insertUser = async (userData) => {
    try {
        return await UserModel.create({
            fullName: userData.fullName,
            username: userData.username,
            password: userData.password,
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