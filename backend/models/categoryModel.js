const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Category extends Model{};
function internalORM(sequelize) {
    const Note = require('./noteModel').ORM(sequelize).Note;
    const Subcategory = require('./noteModel').ORM(sequelize).Subcategory;
    Category.init(
        {
            id: {
                type: Sequelize.INTEGER,
                allowNULL: false,
                primaryKey: true,
                autoIncrement: true,
            },
            category: { type: Sequelize.STRING, allowNULL: false, unique: true },
        },
        { sequelize, modelName: "Category", tableName: "Category", timestamps: false }
    );

    Category.hasMany(Note, {foreignKey : 'categoryId'});
    Category.hasMany(Subcategory, {foreignKey : 'categoryId'});

    sequelize.sync({force: true}).then(result=>{
        console.log(result);
    })
        .catch(err=> console.log(err));

};


exports.ORM =(s)=>{
    internalORM(s);
    return {Category};
}