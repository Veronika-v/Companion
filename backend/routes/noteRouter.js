const express = require('express');
const noteController = require('../controllers/noteController');


const router = express.Router();
router.post('/add', noteController.addNote);
router.put('/updateNote', noteController.updateNote);
router.delete('/delete/:id', noteController.deleteNote);
router.get('/', noteController.getAll);
router.get('/:id', noteController.findByNoteId);
// router.get('/:title', noteController.FindByNoteTitle);

module.exports ={
    router : router
}