const sequelize = require('../connectionDB');
const {Sequelize, Op} = require("sequelize");
const { Note} = require('../models/schemaDB').ORM(sequelize);

module.exports = {
    addNote : async (req,res) =>{
        let note = await Note.create(req.body);
        res.send(note);
    },
    updateNote : async (req, res)=>{
        const updateNote = req.body;

        let note = await Note.findOne({where: {id: updateNote.id}});
        if(!note){
            res.status(500).send("That note doesn't exist");
        }
        else {
            await Note.update(
                {title: updateNote.title,
                description: updateNote.description,
                countOfMembers: updateNote.countOfMembers,
                geolocation: updateNote.geolocation,
                meetingDateTime: updateNote.meetingDateTime,
                status: updateNote.status,
                money: updateNote.money,
                ageFrom: updateNote.ageFrom,
                ageTo: updateNote.ageTo,
                userId: updateNote.userId,
                image: updateNote.image,
                categoryId: updateNote.categoryId,
                subcategoryId: updateNote.subcategoryId,
                genderId: updateNote.genderId,
                }, {where: {id: updateNote.id}});
            res.send(updateNote);
        }
    },

    deleteNote : async (req, res)=>{
        let id = req.params.id;
        console.log('delete id: '+id);
        let note = await Note.findOne({where: {id: id}});
        if(!note){
            res.status(500).send("That note doesn't exist"+ id+"  "+note);
        }
        else {
            await Note.destroy({where: {id: id}});
            res.status(200).send('Deleted');
        }
    },
    getAll: async (req, res) => {
        let notes = await Note.sequelize.query(`select n.id, n.title, n.description, n.countOfMembers, n.geolocation,
    n.image, n.meetingDateTime, n.status, n.money, n.ageFrom, n.ageTo, n.userId,
    c.category, s.subcategory, g.gender
    from Note n join Category c on n.categoryId=c.id 
    join Subcategory s on n.subcategoryId=s.id 
    join Gender g on n.genderId=g.id;`, { type: Sequelize.QueryTypes.SELECT });
        res.json(notes);
    },
    findByNoteId: async (req, res) => {
        const id = req.params.id;
        let note = await Note.sequelize.query(`select n.id, n.title, n.description, n.countOfMembers, n.geolocation,
    n.image, n.meetingDateTime, n.status, n.money, n.ageFrom, n.ageTo, n.userId,
    c.category, s.subcategory, g.gender
    from Note n join Category c on n.categoryId=c.id 
    join Subcategory s on n.subcategoryId=s.id 
    join Gender g on n.genderId=g.id where n.id=${id};`, { type: Sequelize.QueryTypes.SELECT });

        if(!note){
            res.status(404).send("That note doesn't exist"+ req.body.id+"  "+note);
        }
        else {
            res.send(note);
        }
    },
    FindByNoteTitle: async (req, res) => {
        let title = req.params.title;
        let notes = await Note.sequelize.query(`select n.id, n.title, n.description, n.countOfMembers, n.geolocation,
    n.image, n.meetingDateTime, n.status, n.money, n.ageFrom, n.ageTo, n.userId,
    c.category, s.subcategory, g.gender
    from Note n join Category c on n.categoryId=c.id 
    join Subcategory s on n.subcategoryId=s.id 
    join Gender g on n.genderId=g.id where n.title=like'%${title}%';`, { type: Sequelize.QueryTypes.SELECT });
    /*    let notes =  await Note.findAll({
            where: { [Op.like]: `%${string}`, },
            raw: true,
        });*/
        res.send(notes);
    },
    // findByCategory: async (req, res) => {
    //     const id = req.params.id;
    //     let note = await Note.sequelize.query(`select n.id, n.title, n.description, n.countOfMembers, n.geolocation,
    // n.image, n.meetingDateTime, n.status, n.money, n.ageFrom, n.ageTo, n.userId,
    // c.category, s.subcategory, g.gender
    // from Note n join Category c on n.categoryId=c.id
    // join Subcategory s on n.subcategoryId=s.id
    // join Gender g on n.genderId=g.id where n.id=${id};`, { type: Sequelize.QueryTypes.SELECT });
    //     //let note = await Note.findOne({where: {id: id}});
    //
    //     if(!note){
    //         res.status(404).send("That note doesn't exist"+ req.body.id+"  "+note);
    //     }
    //     else {
    //         res.send(note);
    //     }
    // },
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