// module.exports = function (app) {
//     const userController = require('../controllers/user');

//     app.post('/insrtUser', userController.insertUser)
// }

//here`s the second way to use routers just to state it (the above is much easier)

const userController = require('../controllers/user');
const express = require('express');
const userRouter = express.Router();
const auth = require('../middlewares/auth');
const error = require('../middlewares/error');

userRouter.use((req, res, next) => {
    console.log('req date: ', Date.now());
    next();
})

userRouter.post('/insertUser', auth.authUser, userController.insertUser);
userRouter.post('/login', userController.login);
userRouter.get('/getAllUsers', auth.authUser, userController.getAllUsers);
// userRouter.use(error);
module.exports = userRouter;