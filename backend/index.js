const express =require('express');
const app =express();
const bcrypt = require('bcrypt');
const sequelize = require('./connectionDB');
const data = require('./data');

app.get('/api/notes', (req,res) =>{
    res.send(data.notes);
})
app.get('/', (req, res)=>{
    res.send('Server is ready');
});

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log( `server at http://localhost:${port}`);
});




/*
const {User, Gender, Note, UserStatus, Category, Subcategory, FavoriteNote} = require('./models/schemaDB').ORM(sequelize);

const status ={
    status: 'blocked'
};

const gender ={
    gender: 'female'
};


const d = new Date();
const datestring = d.getFullYear()  + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " +
    d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

const user ={
    login: 'admin',
    password: bcrypt.hash('admin', 10).toString(),
    role: 1
};

    User.create(user).then(res=>{
        console.log("CCCCOOONNNSSSOLLEEEEE: "+ res);
    }).catch(err=>console.log(err))

    UserStatus.create(status).then(res=>{
        console.log("CCCCOOONNNSSSOLLEEEEE: "+ res);
    }).catch(err=>console.log(err))

    Gender.create(gender).then(res=>{
        console.log("CCCCOOONNNSSSOLLEEEEE: "+ res);
    }).catch(err=>console.log(err))

*/

