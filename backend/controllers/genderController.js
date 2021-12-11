let db = require('../connectionDB'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;
const { Gender } = require('../models/schemaDB').ORM(sequelize);


module.exports = {

    getAllGenders: async (req, res) =>{
        let genders = await Gender.findAll();
        res.send(genders);
    },
};