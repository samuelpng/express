const express = require('express');
const hbs = require('hbs');
const waxOn = require('wax-on');

const app = express();
app.set('view engine', 'hbs');
app.use(express.static('public'));
waxOn.on(hbs.handlebars);
waxOn.setLayoutPath('views/layout');

app.use(express.urlencoded({
    'extended': false //use extended true if you are processing object in objects in your form(most browser dont do this)
}))

//routes
app.get('/',function(req,res){
    res.send("Hello World");
})

app.get('/bmi',function(req,res){
    res.render('bmi')
})

app.post('/bmi',function(req,res){
    
    let weight = parseFloat(req.body.weight);
    let height = parseFloat(req.body.height);
    console.log(weight,height)
    let unit = req.body.unit || "si"
    let bmi = (weight / height**2);     
    console.log(req.body)
    if (unit == 'imperial'){
        bmi *= 703;
    }
    console.log(bmi)
    res.render('bmi-result', {
        'bmi':bmi
    })
})

//start server
app.listen(3000,function(){
    console.log('server start')
})