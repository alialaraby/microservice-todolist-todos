const mongoose = require('mongoose');

const todoModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tag',
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('todo', todoModel);