const express = require('express');
const app = express();         


// default route
app.get('/',(req,res)=>{
    res.send('Wlecome to instagram');
});

// assigning the port
const PORT =process.env.PORT || 7000;
app.listen(PORT,()=>{
    console.log('Server is running on the port 7000');
});