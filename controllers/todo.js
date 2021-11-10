const todoService = require('../services/todo');
const { IncorrectCredentials, EmailNotConfirmed, BcryptHashingError } = require('../app-errors/custom-errors');

exports.getAllTodos = (req, res, next) => {
    todoService.getAllTodos()
    .then(todos => {
        if(todos.length)
            res.status(200).json({data: todos, message: 'todos fetched'});
        else
            res.status(204).json({ message: 'no Todos found'});
    })
    .catch(error => { next(error) });
}