const express =require('express');
const app =express();
const bodyParser = require('body-parser');
const dotenv = require("dotenv");

const notifRouter = require('./routes/notifRouter');
const noteRouter = require('./routes/noteRouter');
const categoryRouter = require('./routes/categoryRouter');
const userRouter = require('./routes/userRouter');
const genderRouter = require('./routes/genderRouter');


app.use(bodyParser.json({ limit: '5mb' }));
app.use(express.json());

dotenv.config();

app.use('/notifications', notifRouter.router);
app.use('/notes', noteRouter.router);
app.use('/categories', categoryRouter.router);
app.use('/genders', genderRouter.router);
app.use('/users', userRouter.router);
app.get('/', (req, res)=>{
    res.send('Server is ready');
});

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log( `server at http://localhost:${port}`);
});
