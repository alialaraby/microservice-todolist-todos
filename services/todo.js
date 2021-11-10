const TodoModel = require('../models/todo');

exports.getAllTodos = async () => {
    try {
        return await TodoModel.find({});
    } catch (error) {
        return error;
    }
}