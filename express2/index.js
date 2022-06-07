const express = require('express');
const hbs = require('hbs');
const waxOn = require('wax-on')//waxon provides template inheritance on hbs

const app = express();
app.set('view engine','hbs') //set view engine to hbs
app.use(express.static('public')) // public folder will hold static files

//setup wax-on
waxOn.on(hbs.handlebars);
//tell wax-on where too find the base layouts
wax.setLayoutPath('./views/layouts');


app.get('/', function(req,res){
    res.send('hello world')
})

app.listen(3000, function(){
    console.log('server started')
})