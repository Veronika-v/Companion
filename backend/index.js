const express =require('express');
const app =express();
const bcrypt = require('bcrypt');
const sequelize = require('./connectionDB');
const data = require('./data');
const bodyParser = require('body-parser')

app.use(bodyParser.json({ limit: '5mb' }))

app.use(express.json());
const noteController = require('./controllers/noteController');
const {User, Gender, Note, UserStatus, Category, Subcategory, FavoriteNote} = require('./models/schemaDB').ORM(sequelize);

app.get('/api/notes', (req,res) =>{
    //res.send(data.notes);
    noteController.getAll().then(notes =>{
        res.send(notes);
    });

    // noteController.getAll()
    //     .then(notes =>{
    //         for(let note in notes){
    //             Category.findOne({where: {id: note.categoryId}})
    //         }
    //     }
    //     res.send(notes);

    /*Note.findAll()
        .then(notes =>{
            res.send(notes);
        })*/

});

app.post('/api/note/add', (req,res) =>{
    //res.send(data.notes);
    console.log("bodddyyyy: "+ req.body);
    noteController.addNote(req, res).then(note =>{
        res.send(note);
    });
});

app.get('/', (req, res)=>{
    res.send('Server is ready');
});

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log( `server at http://localhost:${port}`);
});




// const {User, Gender, Note, UserStatus, Category, Subcategory, FavoriteNote} = require('./models/schemaDB').ORM(sequelize);
//
// const status1 ={
//     status: 'active'
// };
// const status2 ={
//     status: 'blocked'
// };
//
// const gender1 ={
//     gender: 'male'
// };
// const gender2 ={
//     gender: 'female'
// };
//
// const d = new Date();
// const datestring = d.getFullYear()  + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " +
//     d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
//
// const note ={
//     title: 'Going to the cinema',
//     description: 'Hi! I want to go to the Berestie cinema to Venom2 movie but it is so boring to alone. Maybe you want to go with me?:)',
//     geolocation: 'Belarus, Minsk',
//     meetingDateTime: datestring,
//     userId: 2,
//     categoryId:1,
//     subcategoryId:1,
//     genderId:1
// }
//
// const category ={
//     category: 'food'
// };
// const subcategory ={
//     subcategory: 'picnic',
//     categoryId: 1
// };
//
//
// const user2 ={
//     login: 'veronika',
//     password: bcrypt.hash('veronika', 10).toString(),
//     statusId: 2
// };
// const user1 ={
//     login: 'admin',
//     password: bcrypt.hash('admin', 10).toString(),
//     role:1,
//     statusId: 2
// };



    // UserStatus.create(status1).then(res=>{
    //     console.log("CCCCOOONNNSSSOLLEEEEE: "+ res);
    // }).catch(err=>console.log(err))
    // UserStatus.create(status2).then(res=>{
    //     console.log("CCCCOOONNNSSSOLLEEEEE: "+ res);
    // }).catch(err=>console.log(err));


    // Gender.create(gender1).then(res=>{
    //     console.log("CCCCOOONNNSSSOLLEEEEE: "+ res);
    // }).catch(err=>console.log(err));
    // Gender.create(gender2).then(res=>{
    //     console.log("CCCCOOONNNSSSOLLEEEEE: "+ res);
    // }).catch(err=>console.log(err));

    // User.create(user1).then(res=>{
    //     console.log("CCCCOOONNNSSSOLLEEEEE: "+ res);
    // }).catch(err=>console.log(err));
    // User.create(user2).then(res=>{
    //     console.log("CCCCOOONNNSSSOLLEEEEE: "+ res);
    // }).catch(err=>console.log(err));

    // Category.create(category).then(res=>{
    //     console.log("CCCCOOONNNSSSOLLEEEEE: "+ res);
    // }).catch(err=>console.log(err));
    // Subcategory.create(subcategory).then(res=>{
    //     console.log("CCCCOOONNNSSSOLLEEEEE: "+ res);
    // }).catch(err=>console.log(err));


    // Note.create(note).then(res=>{
    //     console.log("CCCCOOONNNSSSOLLEEEEE: "+ res);
    // }).catch(err=>console.log(err))




