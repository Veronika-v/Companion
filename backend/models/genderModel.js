const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Gender extends Model{};
function internalORM(sequelize) {
    const User = require('./userModel').ORM(sequelize).User;
    const Note = require('./noteModel').ORM(sequelize).Note;
    Gender.init(
        {
            id: {
                type: Sequelize.INTEGER,
                allowNULL: false,
                primaryKey: true,
                autoIncrement: true,
            },
            gender: { type: Sequelize.STRING, allowNULL: false, unique: true },
        },
        { sequelize, modelName: "Gender", tableName: "Gender" , timestamps: false}
    );

    Gender.hasMany(User, {foreignKey : 'genderId'});
    Gender.hasMany(Note, {foreignKey : 'statusId'});

    sequelize.sync({force: true}).then(result=>{
        console.log(result);
    })
        .catch(err=> console.log(err));
};


exports.ORM =(s)=>{
    internalORM(s);
    return {Gender};
}