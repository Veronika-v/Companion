const express = require('express');
const userController = require('../controllers/userController');
const {isAuth, isAdmin} = require("../utils");


const router = express.Router();
router.post('/register', userController.addUser);
router.put('/updateByAdmin', userController.updateUserByAdmin); //isAdmin!!!!!
router.get('/user/:id',isAuth, userController.findById); //isAdmin & isAuth- когда смотришь кто откликнулся!!!!!!
router.get('/', isAuth, isAdmin, userController.findAll); //isAdmin!!!!!
router.get('/user/:id/activate', isAuth, isAdmin, userController.toActivate);
router.get('/user/:id/block', isAuth, isAdmin, userController.toBlock);
router.post('/signIn', userController.signIn);

module.exports ={
    router : router
}