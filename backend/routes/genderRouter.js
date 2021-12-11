const express = require('express');
const genderController = require('../controllers/genderController');


const router = express.Router();
router.get('/', genderController.getAllGenders);


module.exports ={
    router : router
}