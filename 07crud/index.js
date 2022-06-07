const express = require('express');
const hbs = require('hbs');
const waxOn = require('wax-on');
const axios = require('axios');


let app = express(); //create the express application
app.set('view engine', 'hbs'); // inform express that we are using hbs as the view engine
waxOn.on(hbs.handlebars); // enable wax-on for handlebars (for template inheritance)
waxOn.setLayoutPath('./views/layouts') // inform wax-on where to find the layouts

app.use(express.urlencoded({
    'extended':false // for processing HTML forms usually it's false because
                     // HTML forms are usually quite simple
}))

let BASE_API_URL = 'https://ckx-restful-api.herokuapp.com/'
// routes
app.get('/', async function(req,res){
    let response = await axios.get(BASE_API_URL +"sightings")
    res.render('sightings',  {
        'foodsightings': respose.data
    })
})

//show the create food sighting form
app.get('/food_sighting/create', function(req,res){
    res.render('food_form')
})

app.post('food_sighting/create', async function(req,res){
    res.send(req.body);
    let data = {
        'description' : req.body.description,
        'food' : req.body.food.split(','),
        'datetime' : req.body.datetime
    }
    await axios.post(BASE_API_URL+'sighting');
    res.redirect('/')
})

app.get('/food_sighting/edit/:food_sighting_id', async function(req,res){
    let foodSightingId = req.params.food_sighting_id;
    res.send(foodSightingId)

    let response = await axios.get(BASE_API_URL + '/sighting/'+foodSightingId);
    res.send(response.data)

    res.render('edit_food_form',{
        'description' : foodSightingId.description,
        'food' : foodSighting.food,
        'datetime' : foodSighting.datetime
    })
})

app.post('/food_sighting/edit/:food_sighting_id', async function(req,res){
    let description = req.body.description;
    let food =  req.body.food.split(',');
    let datetime = req.body.datetime;

    let sightingId = req.params.food_sighting_id;

    let payLoad = {
        'description' : description,
        'food': food,
        'datetime': datetime
    }

    await axios.put(BASE_API_URL+'sighting/'+sightingId, payLoad);

    res.redirect('/')
})

app.get('/food_sightings/delete/:food_sighting_id', async function(req,res){
    //1. we need id of food sighting document we want to delete
    let foodSightingId = req.params.food_sighting_id;

    //2. we need the details of the food sighting that we are going to delete
    let response = await axios.get(BASE_API_URL + 'sighting/' + foodSightingId);
    let foodSighting = response.data;

    //3.render a form asking user if they really want to delete
    res.render('confirm_delete',{
        'description' : foodSighting.description
    })

})

app.post('/food_sighting/delete/:food_sighting_id', async function(req,res){
    let foodSightingId = req.params.food_sighting_id
    await axios.delete(BASE_API_URL+'sighting/'+foodSightingId)
    res.redirect('/')
})


app.listen(3000, function(){
    console.log("server started");
})