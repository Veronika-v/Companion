const express = require('express');
const noteController = require('../controllers/categoryController');


const router = express.Router();
router.get('/', noteController.getAllCategories);
router.get('/subcategories', noteController.getAllSubcategories);

module.exports ={
    router : router
}