const mongoose = require('mongoose');

const tagModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('tag', tagModel);