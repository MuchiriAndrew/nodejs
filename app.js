const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')

//express app
const app = express();

// connect to MongoDB
const dbURL = "mongodb+srv://andrew:andrew123@nodetuts.lks6onb.mongodb.net/"
mongoose.connect(dbURL)
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

//register view engine

app.set('view engine', 'ejs');

//middleware and static files

app.use(express.static('public'));//an inbuilt express middleware function to access static files 
app.use(morgan('dev'));


//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    // res.send('<p> About </p>');
    // res.sendFile('./views/about.html', { root:__dirname });
    res.render('about', { title: 'About'});
});

//blog routes

app.get('/blogs', (req,res) => {
    Blog.find().sort({createdAt: -1})//sorted by descending order
    .then((result) => {
        res.render('index', {title: 'All Blogs', blogs: result })
    })
    .catch((err) => {
        console.log(err);
    })

})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create Blog'});
})
   

//404 Page

app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});//works like the default case...it's put in last to be the one that is carried out if a match is not found

