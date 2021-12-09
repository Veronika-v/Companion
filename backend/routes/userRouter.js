const express = require('express');
const userController = require('../controllers/userController');


const router = express.Router();
router.post('/add', userController.addUser);
router.put('/updateNote', userController.updateUser);
router.put('/updateNote', userController.updateUserByAdmin);
router.get('/:id', userController.findById);
router.get('/', userController.findAll);
router.post('/signIn', userController.signIn);

module.exports ={
    router : router
}