const express = require('express');
const notifController = require('../controllers/notifController');


const router = express.Router();
router.post('/addNotification', notifController.addNotification);
router.get('/getRespondedUsersForNote/:id', notifController.getRespondedUsersForNote);
router.get('/getAllForNoteUser', notifController.getAllForNoteUser);
router.get('/getAllForRespondedUser/:id', notifController.getAllForRespondedUser);

module.exports ={
    router : router
}