// module.exports = function (app) {
//     const userController = require('../controllers/user');

//     app.post('/insrtUser', userController.insertUser)
// }

//here`s the second way to use routers just to state it (the above is much easier)

const userController = require('../controllers/user');
const express = require('express');
const userRouter = express.Router();

userRouter.use((req, res, next) => {
    console.log('req date: ', Date.now());
    next();
})

userRouter.post('/insertUser', userController.insertUser);
userRouter.post('/login', userController.login);
userRouter.get('/getAllUsers', userController.getAllUsers);
module.exports = userRouter;