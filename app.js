const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

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
app.use(express.urlencoded({ extended: true }));
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

app.use('/blogs', blogRoutes)
 
//404 Page

app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});//works like the default case...it's put in last to be the one that is carried out if a match is not found

