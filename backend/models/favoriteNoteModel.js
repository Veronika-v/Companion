const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class FavoriteNote extends Model{};
function internalORM(sequelize) {
    /*const User = require('./models/userModel').ORM(sequelize).User;
    const Note = require('./models/noteModel').ORM(sequelize).Note;*/
    FavoriteNote.init(
        {
            id: {
                type: Sequelize.INTEGER,
                allowNULL: false,
                primaryKey: true,
                autoIncrement: true,
            }
        },
        { sequelize, modelName: "FavoriteNote", tableName: "FavoriteNote", timestamps: false }
    );
    /*FavoriteNote.hasMany(User, {foreignKey : 'userId'});
    FavoriteNote.hasMany(Note, {foreignKey : 'noteId'});*/

    sequelize.sync({force: true}).then(result=>{
        console.log(result);
    })
        .catch(err=> console.log(err));
};


exports.ORM =(s)=>{
    internalORM(s);
    return {FavoriteNote};
}