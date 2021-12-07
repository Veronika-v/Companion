const express = require('express');
const userController = require('../controllers/userController');


const router = express.Router();
router.post('/add', userController.addUser);
router.put('/updateNote', userController.updateUser);
router.put('/updateNote', userController.updateUserByAdmin);
router.get('/:id', userController.findById);
router.get('/', userController.findAll);

module.exports ={
    router : router
}