const express = require('express');
const hbs = require('hbs');
const waxOn = require('wax-on');

const app = express();
app.set('view engine', 'hbs');
app.use(express.static('public'));
waxOn.on(hbs.handlebars);
waxOn.setLayoutPath('views/layouts');

app.use(express.urlencoded({
    'extended': false //use extended true if you are processing object in objects in your form(most browser dont do this)
}))

//routes
app.get('/',function(req,res){
    res.send("Hello World");
})

app.get('/add-food',function(req,res){
    res.render('add')
})

app.post('/add-food',function(req,res){
    console.log(req.body);
    let fruit = req.body.foodName
    let calories = req.body.calories
    let meal = req.body.meal

    // let tags =req.body.tags;
    // if (!tags){ //tags will be undefined if the user never sslects any checkboxes
    //     tags=[]; 
    // }else if (Array.isArray(tags)==false){
    //         tags = [tags]
    //     }
    //tags = Array.isArray(tags) ? tags: tags?[tags]:[]
    //tags = tags \\ [];
    //tags=Array.isArray(tags) ? tags : [tags];

    let tags = processCheckbox(req.body.tags);
    console.log('tags=', tags);
    res.render('res')
        'foodName': foodName
        'meal' : meal
        
    

    res.send('form received');
})

//start server
app.listen(3000,function(){
    console.log('server start')
})