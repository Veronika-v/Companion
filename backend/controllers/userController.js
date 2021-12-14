let db = require('../connectionDB'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;
const bcrypt = require("bcrypt");
const {User, Note} = require('../models/schemaDB').ORM(sequelize);
const {generateToken} = require('../utils');


module.exports = {
    addUser: async (req, res) => {
        const u = req.body;
        const ps = await bcrypt.hash(u.password, 10);
        u.password = ps.toString();
        u.login = u.login.toLowerCase();
        u.statusId = 1;// "active"
        let user = await User.create(u);
        res.send(res.send({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                birthDate: user.birthDate,
                role: user.role,
                login: user.login,
                email: user.email,
                image: user.image,
                nativeTown: user.nativeTown,
                education: user.education,
                phoneNumber: user.phoneNumber,
                aboutUser: user.aboutUser,
                genderId: user.genderId,
                statusId: user.statusId,
                token: generateToken(user)
            })
        );
    },
    updateUser: async (req, res) => {
        const updateUser = req.body;

        let user = await User.findOne({where: {id: updateUser.id}});
        if (!user) {
            res.status(500).send("That user doesn't exist");
        } else {
            await User.update(
                {
                    firstName: updateUser.firstName,
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

    updateUserByAdmin: async (req, res) => { // заблокировать/разблокировать пользователя
        const updateUser = req.body;

        let user = await User.findOne({where: {id: updateUser.id}});
        if (!user) {
            res.status(500).send("That user doesn't exist");
        } else {
            await User.update(
                {
                    statusId: updateUser.statusId
                }, {where: {id: updateUser.id}});
            res.send(updateUser);
        }
    },

    findById: async (req, res) => {
        let id = req.params.id;
        let user = await User.findOne({where: {id: id}});
        if (user)
            res.send(user)
        else
            res.status(404).send("Not found");
    },

    findAll: async (req, res) => {
        let user = await User.findAll({where: {role: 0}});
        if (user)
            res.send(user);
        else
            res.status(201).send("No users");
    },

    toBlock: async (req, res) => {
        const userId = req.params.id;
        let user = await User.findOne({where: {id: userId, statusId: 1}});
        if (!user)
            res.status(404).send("User not found");
        else {
            await User.update({statusId: 2}, {where: {id: user.id}});
            const notes = await Note.findAll( {where: {userId: user.id}});
            notes.map( note =>{
                Note.update({status:0}, {where: {id: note.id}});
            });
            res.status(200).send(`User "${user.firstName} ${user.lastName}" Blocked`);
        }
    },

    toActivate: async (req, res) => {
        const userId = req.params.id;
        let user = await User.findOne({where: {id: userId, statusId: 2}});
        if (!user)
            res.status(404).send("User not found");
        else {
            await User.update({statusId: 1}, {where: {id: user.id}});
            const notes = await Note.findAll( {where: {userId: user.id}});
            notes.map( note =>{
                Note.update({status:1}, {where: {id: note.id}});
            })
            res.status(200).send(`User "${user.firstName} ${user.lastName}" Activated`);
        }
    },

    signIn: async (req, res) => {
        const u = req.body;
        const login = u.login.toLowerCase();
        const user = await User.findOne({where: {login: login}});
        if (user) {
            if (bcrypt.compareSync(u.password, user.password)) {
                if (user.statusId == 1) {
                    res.send({
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        birthDate: user.birthDate,
                        role: user.role,
                        login: user.login,
                        email: user.email,
                        image: user.image,
                        nativeTown: user.nativeTown,
                        education: user.education,
                        phoneNumber: user.phoneNumber,
                        aboutUser: user.aboutUser,
                        genderId: user.genderId,
                        statusId: user.statusId,
                        token: generateToken(user)
                    });
                } else {
                    res.status(401).send({message: 'Your account is blocked'});
                }
            } else {
                res.status(401).send({message: 'Invalid password'});
            }
        } else {
            res.status(401).send({message: 'User with such login does not exist'});
        }
    }
};