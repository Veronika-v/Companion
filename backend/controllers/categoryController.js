let db = require('../connectionDB'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;
const { Category } = require('../models/schemaDB').ORM(sequelize);


module.exports = {

    getAllCategories: async (req, res) =>{
        let categories = await Category.findAll();
        res.send(categories);
    },
    // getAllSubcategories: async (req, res) =>{
    //     let subcategories = await Subcategory.findAll();
    //     res.send(subcategories);
    // },
};