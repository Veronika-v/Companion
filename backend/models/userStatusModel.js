const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class UserStatus extends Model{};
function internalORM(sequelize) {
    const User = require('./userModel').ORM(sequelize).User;
    UserStatus.init(
        {
            id: {
                type: Sequelize.INTEGER,
                allowNULL: false,
                primaryKey: true,
                autoIncrement: true,
            },
            status: { type: Sequelize.STRING, allowNULL: false },
        },
        { sequelize, modelName: "UserStatus", tableName: "UserStatus", timestamps: false }
    );
    UserStatus.hasMany(User, {foreignKey : 'genderId'});

    sequelize.sync({force: true}).then(result=>{
        console.log(result);
    })
        .catch(err=> console.log(err));
};


exports.ORM =(s)=>{
    internalORM(s);
    return {UserStatus};
}