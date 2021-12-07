let db = require('../connectionDB'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;
const { RespondedNote } = require('../models/schemaDB').ORM(sequelize);


module.exports = {
    addNotification : async (req, res) =>{ // откликнуться на запись
        const respond = await RespondedNote.create(req.body);
        res.send(respond);
    },

    getRespondedUsersForNote: async (req, res) =>{ // получить все отклики для конкретной записи
        const id = req.params.id;
        let responds = await RespondedNote.sequelize.query(
            `select u.id, u.firstname, u.lastname from User u join RespondedNote r 
                    on u.id=r.userId where r.noteId = ${id};`,
            { type: Sequelize.QueryTypes.SELECT });
        res.send(responds);
    },

    getAllForNoteUser: async (req, res) =>{ // получить все отклики на все имеющиеся записи пользователя
        const id = req.body.userId;
        let responds = await RespondedNote.sequelize.query(
            `select u.id as userId, u.firstName, n.title, n.id as noteId from User u join RespondedNote r 
                    on u.id=r.userId join Note n 
                    on n.id=r.noteId where n.userId=${id};`,
            { type: Sequelize.QueryTypes.SELECT });
        res.send(responds);
    },

    getAllForRespondedUser: async (req, res) =>{ // получить все записи, на которые откликнулся пользователь
        const id = req.params.id;
        let responds = await RespondedNote.sequelize.query(
            `select n.title, n.description from Note n join RespondedNote r 
                    on n.id=r.noteId where r.userId=${id};`,
            { type: Sequelize.QueryTypes.SELECT });
        res.send(responds);
    }
};