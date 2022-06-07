const express = require('express');
const hbs = require('hbs');
const waxOn = require('wax-on');
const axios = require('axios')

// app.use(express.static('public'));

let app = express(); //create the express application
app.set('view engine', 'hbs'); // inform express that we are using hbs as the view engine
waxOn.on(hbs.handlebars); // enable wax-on for handlebars (for template inheritance)
waxOn.setLayoutPath('./views/layouts') // inform wax-on where to find the layouts

app.use(express.urlencoded({
    'extended':false // for processing HTML forms usually it's false because
                     // HTML forms are usually quite simple
}))

// routes
let BASE_API_URL ='https://ckx-movies-api.herokuapp.com/'

app.get('/', async function(req,res){
    let response = await axios.get(BASE_API_URL + 'movies')
    res.render('movies',{ //hbs file name
        'movies': response.data 
    })
})

//create
app.get('/create', async function(req,res){
    res.render('movies_form')
})

app.post('/create', async function(req,res){
    let movie = {
        'title' : req.body.title,
        'plot' : req.body.plot
    }
    await axios.post(BASE_API_URL + 'movie/create', movie);
    res.redirect('/')
})

app.get('/movie/edit/:movie_id',async function(req,res){
    let movieId = req.params.movie_id;

    let response = await axios.get(BASE_API_URL + 'movie/' + movieId);
    let movie = response.data;

    res.render('edit_movie_form',{
        'title' : movie.title,
        'plot' : movie.plot        
    })
})

app.post('/movie/edit/:movie_id',async function(req,res){

    let title = req.body.title;
    let plot = req.body.plot;

    let movieId = req.params.movie_id;

    let payload = {
        'title' : title,
        'plot' : plot
    }

    let url = BASE_API_URL + 'movie/'+ movieId;
    console.log("url=======================>", url)
    await axios.patch(url, payload);
    

    res.redirect('/')
})

app.get('/movie/delete/:movie_id', async function(req,res){

    let movieId = req.params.movie_id;
    let response = await axios.get(BASE_API_URL + 'movie/'+ movieId)
    let movie = response.data

    res.render('confirm_delete',{
        'movie': movie
    })
})

app.post('/movie/delete/:movie_id', async function(req,res){
    let movieId = req.params.movie_id;
    await axios.delete(BASE_API_URL + 'movie/' + movieId);
    res.redirect('/')
})

app.listen(3000, function(){
    console.log("server started");
})