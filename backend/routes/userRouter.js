const express = require('express');
const userController = require('../controllers/userController');
const {isAuth} = require("../utils");


const router = express.Router();
router.post('/register', userController.addUser);
router.put('/update', isAuth, userController.updateUser);
router.put('/updateByAdmin', userController.updateUserByAdmin); //isAdmin!!!!!
router.get('/:id', userController.findById); //isAdmin & isAuth- когда смотришь кто откликнулся!!!!!!
router.get('/', userController.findAll); //isAdmin!!!!!
router.post('/signIn', userController.signIn);

module.exports ={
    router : router
}