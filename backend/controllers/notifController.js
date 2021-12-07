const sequelize = require('../connectionDB');
const Sequelize = require("sequelize");
const { RespondedNote} = require('../models/schemaDB').ORM(sequelize);

let respondedNotes;

module.exports = {
    addNotification : async (req, res) =>{
        const respond = await RespondedNote.create(req.body);
        res.send(respond);
    },

    getRespondedUsersForNote: async (req, res) =>{
        const id = req.body.noteId;
        respondedNotes = await RespondedNote.sequelize.query(
            `select u.id, u.firstname, u.lastname from User u join RespondedNote r 
                    on u.id=r.userId where r.noteId = ${id};`,
            { type: Sequelize.QueryTypes.SELECT });
        res.send(respondedNotes);
    },

    getAllForNoteUser: async (req, res) =>{
        const id = req.body.userId;
        respondedNotes = await RespondedNote.sequelize.query(
            `select u.id, u.firstName, n.title, n.id from User u join RespondedNote r 
                    on u.id=r.userId join Note n 
                    on n.id=r.noteId where n.userId=${id};`,
            { type: Sequelize.QueryTypes.SELECT });
        res.send(respondedNotes);
    },

    getAllForRespondedUser: async (req, res) =>{
        const id = req.body.userId;
        respondedNotes = await RespondedNote.sequelize.query(
            `select n.title, n.description from Note n join RespondedNote r 
                    on n.id=r.noteId where r.userId=${id};`,
            { type: Sequelize.QueryTypes.SELECT });
        res.send(respondedNotes);
    }
};