const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Subcategory extends Model{};
function internalORM(sequelize) {
    const Note = require('./noteModel').ORM(sequelize).Note;

    Subcategory.init(
        {
            id: {
                type: Sequelize.INTEGER,
                allowNULL: false,
                primaryKey: true,
                autoIncrement: true,
            },
            subcategory: { type: Sequelize.STRING, allowNULL: false, unique: true },
        },
        { sequelize, modelName: "Subcategory", tableName: "Subcategory", timestamps: false }
    );

    Subcategory.hasMany(Note, {foreignKey : 'subcategoryId'});

    sequelize.sync({force: true}).then(result=>{
        console.log(result);
    })
        .catch(err=> console.log(err));
};


exports.ORM =(s)=>{
    internalORM(s);
    return {Subcategory};
}