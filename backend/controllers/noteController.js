let db = require('../connectionDB'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;
const { Note} = require('../models/schemaDB').ORM(sequelize);

module.exports = {
    addNote : async (req,res) =>{
        let note = await Note.create(req.body);
        res.send(note);
    },
    updateNote : async (req, res)=>{
        const updateNote = req.body;

        let note = await Note.findOne({where: {id: updateNote.noteId}});
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
                genderId: updateNote.genderId,
                }, {where: {id: updateNote.noteId}});
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
    n.image, n.meetingDateTime, n.status, n.money, n.ageFrom, n.ageTo, n.userId, n.categoryId,
    c.category, g.gender
    from Note n join Category c on n.categoryId=c.id 
    join Gender g on n.genderId=g.id;`, { type: Sequelize.QueryTypes.SELECT });
        res.json(notes);
    },

    getAllByUserId: async (req, res) => {
        const id = req.params.id;
        let notes = await Note.sequelize.query(`select n.id, n.title, n.description, n.countOfMembers, n.geolocation,
    n.image, n.meetingDateTime, n.status, n.money, n.ageFrom, n.ageTo, n.userId, n.categoryId,
    c.category, g.gender
    from Note n join Category c on n.categoryId=c.id 
    join Gender g on n.genderId=g.id where n.userId=${id};`, { type: Sequelize.QueryTypes.SELECT });
        res.json(notes);
    },

    findByNoteId: async (req, res) => {
        const id = req.params.id;
        let note = await Note.sequelize.query(`select n.id, n.title, n.description, n.countOfMembers, n.geolocation,
    n.image, n.meetingDateTime, n.status, n.money, n.ageFrom, n.ageTo, n.userId,
    c.category, g.gender
    from Note n join Category c on n.categoryId=c.id 
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
    c.category, g.gender
    from Note n join Category c on n.categoryId=c.id 
    join Gender g on n.genderId=g.id where n.title like'%${title}%';`, { type: Sequelize.QueryTypes.SELECT });
        res.send(notes);
    },
};