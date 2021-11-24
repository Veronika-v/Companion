const Sequelize = require('sequelize');
const Model = Sequelize.Model;


class Gender extends Model {};
class UserStatus extends Model {};
class Category extends Model {};
class Subcategory extends Model {};
class User extends Model {};
class Note extends Model {};
class FavoriteNote extends Model {};

function internalORM(sequelize) {
    Gender.init(
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            gender: { type: Sequelize.STRING, allowNull: false, unique: true },
        },
        { sequelize, modelName: "Gender", tableName: "Gender" , timestamps: false}
    );

    UserStatus.init(
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            status: { type: Sequelize.STRING, allowNull: false, unique: true },
        },
        { sequelize, modelName: "UserStatus", tableName: "UserStatus", timestamps: false }
    );

    Category.init(
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            category: { type: Sequelize.STRING, allowNull: false, unique: true },
        },
        { sequelize, modelName: "Category", tableName: "Category", timestamps: false }
    );

    Subcategory.init(
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            subcategory: { type: Sequelize.STRING, allowNull: false, unique: true },
        },
        { sequelize, modelName: "Subcategory", tableName: "Subcategory", timestamps: false }
    );

    User.init(
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            firstName: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
            lastName: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
            birthDate: { type: Sequelize.DATE, allowNull: true },
            email: { type: Sequelize.STRING, allowNull: false, defaultValue: '' },
            login: {type: Sequelize.STRING, allowNull: false},
            password: { type: Sequelize.STRING, allowNull: false },// hash
            role: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 0 },
            image: { type: Sequelize.STRING, allowNull: true },
            nativeTown: { type: Sequelize.STRING, allowNull: true },
            education: { type: Sequelize.STRING, allowNull: true },
            phoneNumber: { type: Sequelize.STRING, allowNull: true }, //validation in the future
            aboutUser: { type: Sequelize.STRING, allowNull: true },
        },
        { sequelize, modelName: "User", tableName: "User", timestamps: false }
    );

    Note.init(
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            title: { type: Sequelize.STRING, allowNull: false },
            description: { type: Sequelize.STRING, allowNull: false },
            countOfMembers: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1},
            geolocation: { type: Sequelize.STRING, allowNull: true }, //how to do?? what type??
            meetingDateTime: { type: Sequelize.DATE, allowNull: false },
            status: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 1 }, // is showed in the search or not
            money: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 0 }, // do the user need money for the event (yes/no, other info in description)?
            ageFrom: { type: Sequelize.INTEGER, allowNull: true },
            ageTo: { type: Sequelize.INTEGER, allowNull: true },
        },
        { sequelize, modelName: "Note", tableName: "Note", timestamps: false }
    );

    FavoriteNote.init(
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            }
        },
        { sequelize, modelName: "FavoriteNote", tableName: "FavoriteNote", timestamps: false }
    );

    Gender.hasOne(User, {foreignKey : 'genderId'});
    UserStatus.hasOne(User, {foreignKey : 'statusId'});
    User.hasMany(FavoriteNote, {foreignKey : 'userId'});
    User.hasMany(Note, {foreignKey : 'userId'});

    Category.hasOne(Note, {foreignKey : 'categoryId'});
    Gender.hasOne(Note, {foreignKey : 'genderId', allowNull: true});
    Subcategory.hasOne(Note, {foreignKey : 'subcategoryId',allowNull: true});

    Category.hasMany(Subcategory, {foreignKey : 'categoryId'});

    Note.hasOne(FavoriteNote, {foreignKey : 'noteId'});

    sequelize.sync(true).then(result=>{ //{force: true} - пересоздаст таблицы
        console.log(result);
    })
        .catch(err=> console.log(err));
};

exports.ORM = (s) => {
    internalORM(s);
    return {User, Gender, Note, UserStatus, Category, Subcategory, FavoriteNote};
}

