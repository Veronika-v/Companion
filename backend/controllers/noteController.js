const sequelize = require('../connectionDB');
const Sequelize = require("sequelize");
const { Note} = require('../models/schemaDB').ORM(sequelize);

let notes;

module.exports = {
    addNote : async (req) =>{
        return await Note.create(req.body);
    },
    updateNote : async (req, res)=>{
        const updateNote = req.body;

        let note = await Note.findOne({where: {id: updateNote.id}});
        if(!note){
            res.status(500).send("That note doesn't exist");
        }
        else {
            await Note.update({title: updateNote.title,
                description: updateNote.description,
                countOfMembers: updateNote.countOfMembers,
                geolocation: updateNote.geolocation,
                meetingDateTime: updateNote.meetingDateTime,
                status: updateNote.status,
                money: updateNote.money,
                ageFrom: updateNote.ageFrom,
                ageTo: updateNote.ageTo,
                userId: updateNote.userId,
                categoryId: updateNote.categoryId,
                subcategoryId: updateNote.subcategoryId,
                genderId: updateNote.genderId,}, {where: {id: updateNote.id}});
            res.json(updateNote);
        }
    },

    deleteNote : async (req, res)=>{

        let note = await Note.findOne({where: {id: req.body.id}});
        if(!note){
            res.status(500).send("That note doesn't exist"+ req.body.id+"  "+note);
        }
        else {
            await Note.destroy({where: {id: req.body.id}});
            res.send('destroyed');
        }
    },
    getAll: async () => {
        notes = await Note.sequelize.query(`select n.id, n.title, n.description, n.countOfMembers, n.geolocation,
    n.image, n.meetingDateTime, n.status, n.money, n.ageFrom, n.ageTo, n.userId,
    c.category, s.subcategory, g.gender
    from Note n join Category c on n.categoryId=c.id 
    join Subcategory s on n.subcategoryId=s.id 
    join Gender g on n.genderId=g.id;`, { type: Sequelize.QueryTypes.SELECT });
        return notes;
    },
    findByNoteId: async (req, res) => {
        const id = req.params.id;
        let note = await Note.sequelize.query(`select n.id, n.title, n.description, n.countOfMembers, n.geolocation,
    n.image, n.meetingDateTime, n.status, n.money, n.ageFrom, n.ageTo, n.userId,
    c.category, s.subcategory, g.gender
    from Note n join Category c on n.categoryId=c.id 
    join Subcategory s on n.subcategoryId=s.id 
    join Gender g on n.genderId=g.id where n.id=${id};`, { type: Sequelize.QueryTypes.SELECT });
        //let note = await Note.findOne({where: {id: id}});

        if(!note){
            res.status(404).send("That note doesn't exist"+ req.body.id+"  "+note);
        }
        else {
            res.send(note);
        }
    },
    /*FindByNoteTitle: async (json) => {
        return await Users.findAll({
            where: { username: json["username"] },
            raw: true,
        });
    },
    GetAll: async () => {
        return await Users.findAll({ raw: true });
    },
    FindByID: async (json) => {
        return await Users.findAll({
            where: { id: json },
            raw: true,
        });
    },
    FindByIDOne: async (json) => {
        return await Users.findOne({
            where: { id: json },
            raw: true,
        });
    },*/
};