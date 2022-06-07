const express = require('express');
//const variables cannot be reassigned to
const app = express();

//setup express to use hbs
const hbs = require('hbs');

//routes are defined before you start
app.set('view engine', 'hbs');

//setup express to define where to find static file
add.use(express.static('public'))

//routes are defined before you satrt the server
app.get('/', function(req,res){
    res.send('Hello world');
})

//start the server at port 3000
app.listen(3000, function(){
    console.log('server started');
})