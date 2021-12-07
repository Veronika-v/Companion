const express = require('express');
const notifController = require('../controllers/notifController');


const router = express.Router();
router.post('/addNotification', notifController.addNotification);
router.get('/getRespondedUsersForNote', notifController.getRespondedUsersForNote);
router.get('/getAllForNoteUser', notifController.getAllForNoteUser);
router.get('/getAllForRespondedUser', notifController.getAllForRespondedUser);

module.exports ={
    router : router
}