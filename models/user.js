const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
    fullName: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\S+@\S+\.\S+$/.test(v);
            },
            message: prop => prop.value + ' is not a valid email, ex: "example@someone.gmail"'
        }
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(v);
            },
            message: prop => prop.value + ' is week, use more complex password "exFR@#5648**Vv"'
        }
    },
    accountConfirmed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserModel);