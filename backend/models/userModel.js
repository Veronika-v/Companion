const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class User extends Model{};
function internalORM(sequelize) {
    /*const Gender = require('./models/genderModel').ORM(sequelize).Gender;
    const Status = require('./models/userStatusModel').ORM(sequelize).UserStatus;*/
    const FavNote = require('./favoriteNoteModel').ORM(sequelize).FavoriteNote;
    const Note = require('./noteModel').ORM(sequelize).Note;
    User.init(
        {
            id: {
                type: Sequelize.INTEGER,
                allowNULL: false,
                primaryKey: true,
                autoIncrement: true,
            },
            firstName: { type: Sequelize.STRING, allowNULL: false },
            lastName: { type: Sequelize.STRING, allowNULL: false },
            birthDate: { type: Sequelize.DATE, allowNull: false},
            email: { type: Sequelize.STRING, allowNull: false },
            password: { type: Sequelize.STRING, allowNULL: false },
            role: { type: Sequelize.BOOLEAN, allowNULL: false },
            image: { type: Sequelize.STRING, allowNULL: true },
            nativeTown: { type: Sequelize.STRING, allowNULL: true },
            education: { type: Sequelize.STRING, allowNULL: true },
            phoneNumber: { type: Sequelize.STRING, allowNULL: true }, //validation in the future
            aboutUser: { type: Sequelize.STRING, allowNULL: true },
        },
        { sequelize, modelName: "User", tableName: "User", timestamps: false }
    );
    /*User.hasMany(Gender, {foreignKey : 'genderId'});
    User.hasMany(Status, {foreignKey : 'statusId'});*/
    User.hasMany(FavNote, {foreignKey : 'userId'});
    User.hasMany(Note, {foreignKey : 'userId'});

    sequelize.sync({force: true}).then(result=>{
        console.log(result);
    })
        .catch(err=> console.log(err));
};



exports.ORM =(s)=>{
    internalORM(s);
    return {User};
}