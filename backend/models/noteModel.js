const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Note extends Model{};
function internalORM(sequelize) {
    /*const Category = require('./models/categoryModel').ORM(sequelize).Category;
    const Subcategory = require('./models/subcategoryModel').ORM(sequelize).Subcategory;
    const Gender = require('./models/genderModel').ORM(sequelize).Gender;*/
    const FavNote = require('./favoriteNoteModel').ORM(sequelize).FavoriteNote;
    Note.init(
        {
            id: {
                type: Sequelize.INTEGER,
                allowNULL: false,
                primaryKey: true,
                autoIncrement: true,
            },
            title: { type: Sequelize.STRING, allowNULL: false },
            description: { type: Sequelize.STRING, allowNULL: false },
            countOfMembers: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1},
            geolocation: { type: Sequelize.STRING, allowNULL: true }, //how to do?? what type??
            meetingDateTime: { type: Sequelize.DATE, allowNULL: false },
            status: { type: Sequelize.BOOLEAN, allowNULL: false }, // is showed in the search or not
            money: { type: Sequelize.BOOLEAN, allowNULL: false, defaultValue: 0 }, // do the user need money for the event (yes/no, other info in description)?
            ageFrom: { type: Sequelize.INTEGER, allowNULL: true },
            ageTo: { type: Sequelize.INTEGER, allowNULL: true },
        },
        { sequelize, modelName: "Note", tableName: "Note", timestamps: false }
    );
    /*Note.hasMany(Gender, {foreignKey : 'genderId'});
    Note.hasMany(Category, {foreignKey : 'categoryId'});
    Note.hasMany(Subcategory, {foreignKey : 'subcategoryId'}); + userId*/
    Note.hasMany(FavNote, {foreignKey : 'noteId'});

    sequelize.sync({force: true}).then(result=>{
        console.log(result);
    })
        .catch(err=> console.log(err));
};


exports.ORM =(s)=>{
    internalORM(s);
    return {Note};
}