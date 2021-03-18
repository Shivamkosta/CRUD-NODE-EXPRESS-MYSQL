const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();
// const connection = require('./connection');


const app = express();
//use middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan());
//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'ejs');

//import route
const studentRoute = require('./router');
app.use('/api',studentRoute);






app.get('/',(req,res)=>{
    res.send('hello world');
});



const port = process.env.PORT || 5600

app.listen(port,()=>console.log(`Server is running on port ${port}`))
