const express = require('express');
const hbs = require('hbs');
const waxOn = require('wax-on');

let app = express();
app.set('view engine','hbs');
waxOn.on(hbs.handlebars);
waxOn.setLayoutPath('./views/layouts');

app.use(express.urlencoded({ //query string
    'extended': false //for processing html forms, usually is false
}))

//routes

app.get('/', function(req,res){
    //req is request from client.
    //res is for us to send back to the client
    res.send('hello world') //only one res.send can be executed
})

app.get('/fruits', function(req,res){
    res.send('fruits-form')
})

app.post('/fruits',function(req,res){
    let fruits =[]
    
    //if req.body.items is already an array no further processing
    if (Array.isArray(req.body.items)){
        fruits = req.body.items;
    }else {
    //if req.body.items is a single item then convert it to an array consisting of just that item
        if(req.body.items){
            fruits = [req.body.items]
        } else {
            //if rew.body.items is undefined (or otherwise falsely) then the result is an empty array
            fruits = []; //redendant, can be removed as we already defaulted fruits to be empty array.
        }
    }
    let total = 0;
    for (let eachFruit of fruits){
        if(eachFruit ==  'apple'){
            total += 3;
        }
        if (eachFruit == 'durian'){
            total += 15
        }
        if (eachFruit == 'orange'){
            total += 6
        }
        if (eachFruit == 'banana'){
            total += 4
        }
    } 
        res.send("Total = " + total);
})

app.listen(3000,function(){
    console.log('server started')
})