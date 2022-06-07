const express = require('express');
const hbs = require('hbs');
const waxOn = require('wax-on');


let app=express();
app.set('view engine','hbs');
app.use(express.static('pubic'));

waxOn.on(hbs.handlebars);
waxOn.setLayoutPath('./views/layouts');

app.get('/', function(req,res){
    res.render('index.hbs')
})

app.get('/submit-fault', function(req,res){
    res.render('submit-fault.hbs')
})

app.get('/admin', function(req,res){
    res.render('admin.hbs')
})

app.get('/fruits', function(req,res){
    res.render('fruits',{
        'fruits':['appples','banana', 'mango']
    })
})



 app.get('/hello/:name',function(req,res){
    let name = req.params.name
    res.send('hi,'+ name);
 })



app.listen(3000, function (){
    console.log('server startedd')
})