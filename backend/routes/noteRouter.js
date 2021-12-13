const express = require('express');
const noteController = require('../controllers/noteController');
const {isAuth} = require("../utils");


const router = express.Router();
router.post('/add', isAuth, noteController.addNote);
router.put('/update', isAuth, noteController.updateNote);
router.delete('/delete/:id', isAuth, noteController.deleteNote);
router.get('/', noteController.getAll);
router.get('/:id', noteController.findByNoteId);
router.get('/getAllByUserId/:id', isAuth, noteController.getAllByUserId);

module.exports ={
    router : router
}