const express = require('express');
const app = express();    
let bodyParser = require('body-parser');

const db = require('./model/db');
// default route

const userRoutes = require('./routes/user');

const postRoutes = require('./routes/post');

 // parse requests of content-type - application/json
 app.use(bodyParser.json());

 // parse requests of content-type - application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: true }));
 

app.get('/',(req,res)=>{
    res.send('Wlecome to instagram');
});

// user route
app.use('/user', userRoutes);

// post route
app.use('/post', postRoutes);

// assigning the port
const PORT =process.env.PORT || 7000;
app.listen(PORT,()=>{
    console.log('Server is running on the port 7000');
});