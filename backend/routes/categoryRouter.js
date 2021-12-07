const express = require('express');
const categoryController = require('../controllers/categoryController');


const router = express.Router();
router.get('/', categoryController.getAllCategories);
router.get('/subcategories', categoryController.getAllSubcategories);

module.exports ={
    router : router
}