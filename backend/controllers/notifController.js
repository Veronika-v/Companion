let db = require('../connectionDB'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;
const { RespondedNote } = require('../models/schemaDB').ORM(sequelize);


module.exports = {
    addNotification : async (req, res) =>{ // откликнуться на запись
        const body = req.body;
        let respond = await RespondedNote.findOne({where: {userId:body.userId, noteId:body.noteId}});
        if(respond)
            res.status(500).send("You have already responded for that note");
        else{
            respond = await RespondedNote.create(body);
            res.send(respond);
        }
    },

    getRespondedUsersForNote: async (req, res) =>{ // получить все отклики для конкретной записи
        const id = req.params.id;
        let responds = await RespondedNote.sequelize.query(
            `select u.id as userId, u.firstname, u.lastname, n.id as noteId, n.title from User u join RespondedNote r 
                    on u.id=r.userId join Note n
                     on n.id=r.noteId where r.noteId = ${id};`,
            { type: Sequelize.QueryTypes.SELECT });
        res.send(responds);
    },

    getAllForNoteUser: async (req, res) =>{ // получить все отклики на все имеющиеся записи пользователя
        const id = req.params.id;
        let responds = await RespondedNote.sequelize.query(
            `select r.id, u.id as userId, u.firstName, u.lastName, n.title, n.id as noteId from User u join RespondedNote r 
                    on u.id=r.userId join Note n 
                    on n.id=r.noteId where n.userId=${id};`,
            { type: Sequelize.QueryTypes.SELECT });
        res.send(responds);
    },

    getAllForRespondedUser: async (req, res) =>{ // получить все записи, на которые откликнулся пользователь
        const id = req.params.id;
        let responds = await RespondedNote.sequelize.query(
            `select n.title, n.description, n.id as noteId from Note n join RespondedNote r 
                    on n.id=r.noteId where r.userId=${id};`,
            { type: Sequelize.QueryTypes.SELECT });
        res.send(responds);
    },
};