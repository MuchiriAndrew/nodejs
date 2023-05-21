const express = require('express');
const morgan = require('morgan');

//express app
const app = express();

//register view engine

app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

//middleware and static files

app.use(express.static('public'));//an inbuilt express middleware function to access static files 
app.use(morgan('dev'));


app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    // res.send('<p> About </p>');
    // res.sendFile('./views/about.html', { root:__dirname });
    res.render('about', { title: 'About'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create Blog'});
})
   

//404 Page

app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});//works like the default case...it's put in last to be the one that is carried out if a match is not found

