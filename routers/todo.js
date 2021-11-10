
const todoController = require('../controllers/todo');
const express = require('express');
const todoRouter = express.Router();
const error = require('../middlewares/error');

todoRouter.post('/getAllTodos', todoController.getAllTodos);
todoRouter.use(error);
module.exports = todoRouter;