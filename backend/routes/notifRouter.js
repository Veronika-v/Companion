const express = require('express');
const notifController = require('../controllers/notifController');
const {isAuth} = require("../utils");


const router = express.Router();
router.post('/addNotification', isAuth,  notifController.addNotification);
router.get('/getRespondedUsersForNote/:id', isAuth, notifController.getRespondedUsersForNote);
router.get('/getAllForNoteUser/:id', isAuth, notifController.getAllForNoteUser);
router.get('/getAllForRespondedUser/:id', isAuth, notifController.getAllForRespondedUser);

module.exports ={
    router : router
}