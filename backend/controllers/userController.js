let db = require('../connectionDB'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;
const { User } = require('../models/schemaDB').ORM(sequelize);

module.exports = {
    addUser : async (req,res) =>{
        let user = await User.create(req.body);
        res.send(user);
    },
    updateUser : async (req, res)=>{
        const updateUser = req.body;

        let user = await User.findOne({where: {id: updateUser.id}});
        if(!user){
            res.status(500).send("That user doesn't exist");
        }
        else {
            await User.update(
                {firstName: updateUser.firstName,
                    lastName: updateUser.lastName,
                    birthDate: updateUser.birthDate,
                    login: updateUser.login,
                    email: updateUser.email,
                    image: updateUser.image,
                    nativeTown: updateUser.nativeTown,
                    education: updateUser.education,
                    phoneNumber: updateUser.phoneNumber,
                    aboutUser: updateUser.aboutUser,
                    genderId: updateUser.genderId,
                }, {where: {id: updateUser.id}});
            res.send(updateUser);
        }
    },

    updateUserByAdmin : async (req, res)=>{ // заблокировать/разблокировать пользователя
        const updateUser = req.body;

        let user = await User.findOne({where: {id: updateUser.id}});
        if(!user){
            res.status(500).send("That user doesn't exist");
        }
        else {
            await User.update(
                {
                    statusId:updateUser.statusId
                }, {where: {id: updateUser.id}});
            res.send(updateUser);
        }
    },

    findById: async (req, res) => {
        let id = req.body.id;
        let user = await User.findOne({ where : {id: id}});
        res.send(user);
    },

    findAll: async (req, res) => {
        let id = req.body.id;
        let user = await User.findAll({where : {role: 0}});
        res.send(user);
    },
};